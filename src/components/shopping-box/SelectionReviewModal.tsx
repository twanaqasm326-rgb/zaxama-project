import React, { useState } from 'react'
import {
  FileText,
  Download,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  MessageCircle,
  User,
  Phone,
  MapPin,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useLanguage } from '../../context/LanguageContext'
import { BRAND_CONFIG } from '../../data/brand'
import { PDFDocumentData } from '../../types/pdf'
import { generateSpecificationPDF } from '../../lib/pdfGenerator'
import { loadArabicFont, needsArabicFont } from '../../lib/pdfFontLoader'
import { formatPrice } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'
import {
  sendPdfDocumentToWhatsApp,
  sharePdfFile,
  isWhatsAppGatewayConfigured,
  canSharePdfFile,
} from '../../lib/whatsappApi'

export const SelectionReviewModal: React.FC = () => {
  const {
    items,
    isReviewOpen,
    setIsReviewOpen,
    setIsOpen,
    clientInfo,
    setClientInfo,
    exportOptions,
    totalCount,
    totalValuation,
  } = useShoppingBox()
  const { t, language } = useLanguage()

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [generatedPdfBlobUrl, setGeneratedPdfBlobUrl] = useState<string | null>(null)
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null)
  const [generatedDocNumber, setGeneratedDocNumber] = useState<string | null>(null)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const [shareFeedbackError, setShareFeedbackError] = useState(false)
  const [isSendingToWhatsApp, setIsSendingToWhatsApp] = useState(false)

  if (!isReviewOpen) return null

  const handleBackToDrawer = () => {
    setIsReviewOpen(false)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsReviewOpen(false)
    setGenerationError(null)
    setPhoneError(null)
    setGeneratedPdfBlobUrl(null)
    setGeneratedPdfBlob(null)
    setGeneratedDocNumber(null)
    setShareFeedback(null)
    setShareFeedbackError(false)
    setIsSendingToWhatsApp(false)
  }

  const handleGeneratePDF = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (items.length === 0) return

    // Validate phone number: must be 10 or 11 digits
    const digitsOnly = (clientInfo.phone || '').replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      setPhoneError(t('review.phoneError'))
      return
    }
    setPhoneError(null)

    setIsGenerating(true)
    setGenerationError(null)
    setShareFeedback(null)
    try {
      // Pre-load Arabic font if needed (cached after first load)
      if (needsArabicFont(language)) {
        await loadArabicFont()
      }

      const docNum = `SPEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      const now = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      // Localize items for the invoice PDF document
      const localizedItems = items.map(item => ({
        ...item,
        product: getLocalizedProduct(item.product, language),
      }))

      const documentData: PDFDocumentData = {
        documentNumber: docNum,
        generatedAt: now,
        branding: {
          companyName: t('brand.name'),
          tagline: t('brand.tagline'),
          address: BRAND_CONFIG.showroomAddress,
          contactEmail: BRAND_CONFIG.contact.email,
          contactPhone: BRAND_CONFIG.contact.phone,
        },
        client: clientInfo,
        items: localizedItems,
        totalItems: totalCount,
        estimatedTotal: totalValuation,
        currency: 'IQD',
        options: exportOptions,
      }

      const doc = await generateSpecificationPDF(documentData, language)
      const blob = doc.output('blob')
      const blobUrl = URL.createObjectURL(blob)

      setGeneratedPdfBlob(blob)
      setGeneratedPdfBlobUrl(blobUrl)
      setGeneratedDocNumber(docNum)
    } catch (err) {
      console.error('Error generating invoice:', err)
      setGenerationError(t('review.generationError'))
    } finally {
      setIsGenerating(false)
    }
  }

  // Combined action: Downloads the invoice AND opens it in the browser simultaneously
  const handleDownloadAndOpenInvoice = () => {
    if (!generatedDocNumber || !generatedPdfBlobUrl) return

    // 1. Download file to user's device
    const a = document.createElement('a')
    a.href = generatedPdfBlobUrl
    a.download = `order-invoice-${generatedDocNumber.toLowerCase()}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // 2. Open invoice preview in a new tab simultaneously
    window.open(generatedPdfBlobUrl, '_blank')
  }

  // Downloads the PDF blob to the user's device
  const downloadPdfToDevice = (fileName: string) => {
    if (!generatedPdfBlob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(generatedPdfBlob)
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Opens a WhatsApp chat with the showroom owner (07517447522 -> 9647517447522)
  const openShowroomWhatsAppChat = (message?: string) => {
    const rawPhone = BRAND_CONFIG.contact.whatsapp || BRAND_CONFIG.contact.phone || '07517447522'
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
    const formattedShowroomPhone = cleanPhone.startsWith('0')
      ? '964' + cleanPhone.slice(1)
      : cleanPhone.startsWith('964')
      ? cleanPhone
      : '964' + cleanPhone

    const waUrl = message
      ? `https://wa.me/${formattedShowroomPhone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${formattedShowroomPhone}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  /**
   * 3-tier PDF delivery to WhatsApp (07517447522):
   * 1. WhatsApp Gateway API (UltraMsg/Green-API) — fully automatic native PDF, desktop + mobile.
   * 2. Web Share API — share sheet opens with the PDF attached, user picks WhatsApp + contact.
   * 3. Fallback — download the PDF + open wa.me chat, user attaches manually.
   */
  const handleSendPDFToWhatsApp = async () => {
    if (!generatedDocNumber || !generatedPdfBlob || isSendingToWhatsApp) return

    setIsSendingToWhatsApp(true)
    setShareFeedback(null)
    setShareFeedbackError(false)

    const fileName = `order-invoice-${generatedDocNumber.toLowerCase()}.pdf`
    const caption = t('review.waMessageCaption')
      .replace('{docNumber}', generatedDocNumber)
      .replace('{clientName}', clientInfo.clientName || '')
      .replace('{total}', formatPrice(totalValuation))

    // Tier 1: WhatsApp Gateway API — sends the actual PDF file automatically
    if (isWhatsAppGatewayConfigured()) {
      try {
        const result = await sendPdfDocumentToWhatsApp({
          pdfBlob: generatedPdfBlob,
          fileName,
          docNumber: generatedDocNumber,
          clientName: clientInfo.clientName,
          clientPhone: clientInfo.phone,
          caption,
        })
        if (result.success) {
          setShareFeedback(t('review.waGatewaySuccess'))
          setIsSendingToWhatsApp(false)
          return
        }
        console.warn('WhatsApp gateway failed, falling back:', result.error)
      } catch (err) {
        console.warn('WhatsApp gateway error, falling back:', err)
      }
    }

    // Tier 2: Web Share API — PDF file attached in the native share sheet
    if (canSharePdfFile()) {
      const shared = await sharePdfFile(generatedPdfBlob, fileName, caption)
      if (shared) {
        setShareFeedback(t('review.waShareSuccess'))
        setIsSendingToWhatsApp(false)
        return
      }
    }

    // Tier 3: Fallback — download PDF + open WhatsApp chat for manual attach
    downloadPdfToDevice(fileName)
    openShowroomWhatsAppChat(caption)
    setShareFeedback(t('review.waDesktopNote'))
    setShareFeedbackError(false)
    setIsSendingToWhatsApp(false)
  }

  return (
    <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl w-full sm:w-[92vw] p-0 sm:p-7 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f141e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl">
        
        {/* Document Ready Success View */}
        {generatedPdfBlobUrl && generatedDocNumber ? (
          <div className="space-y-4 sm:space-y-5 py-2 sm:py-3 animate-fade-in text-center px-4 sm:px-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t('review.docReadyTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Ref: <strong className="text-sky-600 dark:text-sky-400 font-mono">{generatedDocNumber}</strong> • Total: <strong className="text-slate-900 dark:text-white">{formatPrice(totalValuation)}</strong>
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400/90 font-medium">
                {t('review.directWhatsAppConfigured')} <span className="text-slate-900 dark:text-white font-bold">{BRAND_CONFIG.contact.phone}</span>
              </p>
            </div>

            {/* Action Buttons Grid */}
            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* 1. Combined Download & Open Invoice */}
                <button
                  onClick={handleDownloadAndOpenInvoice}
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white py-3 sm:py-3.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer active:scale-98 hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                  title={t('review.downloadAndOpen')}
                >
                  <Download className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  <span>{t('review.downloadAndOpen')}</span>
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-75" />
                </button>

                {/* 2. Send Invoice to WhatsApp */}
                <button
                  onClick={handleSendPDFToWhatsApp}
                  disabled={isSendingToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 sm:py-3.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer active:scale-98 border border-emerald-400/40 hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] disabled:opacity-60 disabled:cursor-wait"
                  title={t('review.sendToWhatsApp')}
                >
                  {isSendingToWhatsApp ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 animate-spin" />
                      <span>{t('review.sendingToWhatsApp')}</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-white/20" />
                      <span>{t('review.sendToWhatsApp')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Share feedback alert if any */}
            {shareFeedback && (
              <p className={`text-xs py-1.5 px-3 rounded-lg max-w-md mx-auto border ${
                shareFeedbackError
                  ? 'text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20'
                  : 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {shareFeedback}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={handleClose}
                className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t('review.returnToShowroom')}
              </button>
            </div>
          </div>
        ) : (
          /* User Information Form */
          <form onSubmit={handleGeneratePDF} className="space-y-3.5 sm:space-y-4 animate-fade-in text-left px-4 sm:px-0 pb-2 sm:pb-0">
            
            {/* Header */}
            <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-3.5">
              <button
                type="button"
                onClick={handleBackToDrawer}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer mb-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('review.backToShoppingBox')}</span>
              </button>

              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {t('review.title')}
                </DialogTitle>
              </DialogHeader>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t('review.subtitle')}
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-3.5 pt-1">
              
              {/* Row 1: Full Name (REQUIRED) & Phone Number (REQUIRED - min 10 digits) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 items-start">
                {/* Full Name */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <User className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{t('review.fullName')} {t('common.required')}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('review.namePlaceholder')}
                    value={clientInfo.clientName || ''}
                    onChange={(e) =>
                      setClientInfo(prev => ({ ...prev, clientName: e.target.value }))
                    }
                    className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
                  />
                </div>

                {/* Phone Number with 10 or 11 digits enforcement */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{t('review.phone')} {t('common.required')}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      minLength={10}
                      pattern="[0-9]{10,11}"
                      placeholder={t('review.phonePlaceholder')}
                      value={clientInfo.phone || ''}
                      onChange={(e) => {
                        // Filter strictly to numbers and cap at 11 digits
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
                        setClientInfo(prev => ({ ...prev, phone: digits }))
                        if (digits.length >= 10 && digits.length <= 11 && phoneError) {
                          setPhoneError(null)
                        }
                      }}
                      className={`w-full bg-slate-50 dark:bg-[#141a26] border rounded-xl pl-3.5 pr-14 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                        phoneError
                          ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                          : 'border-slate-200 dark:border-slate-800 focus:border-sky-500'
                      }`}
                    />
                    <span
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-[11px] font-mono pointer-events-none transition-colors select-none ${
                        (clientInfo.phone || '').length >= 10 && (clientInfo.phone || '').length <= 11
                          ? 'text-emerald-500 font-bold'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {(clientInfo.phone || '').length}/11
                    </span>
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: City / Address (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>{t('review.cityAddress')}</span>
                </label>
                <input
                  type="text"
                  placeholder={t('review.addressPlaceholder')}
                  value={clientInfo.address || clientInfo.city || ''}
                  onChange={(e) =>
                    setClientInfo(prev => ({ ...prev, address: e.target.value, city: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
                />
              </div>

              {/* Row 3: Special Notes (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('review.specialNotes')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('review.notesPlaceholder')}
                  value={clientInfo.notes || ''}
                  onChange={(e) =>
                    setClientInfo(prev => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none"
                />
              </div>

            </div>

            {/* Total Summary Box */}
            <div className="bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block uppercase font-medium">
                  {totalCount} {totalCount === 1 ? t('review.productOrdered') : t('review.productsOrdered')}
                </span>
                <span className="text-xs sm:text-sm text-sky-600 dark:text-sky-300">
                  {t('review.readyToSend')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase block font-medium">{t('review.totalInDinar')}</span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">{formatPrice(totalValuation)}</span>
              </div>
            </div>

            {/* Error Message */}
            {generationError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('review.generating')}</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    <span>{t('review.generateAndReady')}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </DialogContent>
    </Dialog>
  )
}

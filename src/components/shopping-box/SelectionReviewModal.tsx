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
  }

  const handleGeneratePDF = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (items.length === 0) return

    // Validate phone number: minimum 10 digits
    const digitsOnly = (clientInfo.phone || '').replace(/\D/g, '')
    if (digitsOnly.length < 10) {
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

  const handleSendPDFToWhatsApp = async () => {
    if (!generatedDocNumber || !generatedPdfBlob) return

    const rawPhone = clientInfo.phone || ''
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
    const formattedPhone = cleanPhone.startsWith('0')
      ? '964' + cleanPhone.slice(1)
      : cleanPhone.startsWith('964')
      ? cleanPhone
      : cleanPhone.length > 6
      ? '964' + cleanPhone
      : (BRAND_CONFIG.contact.phone?.replace(/[^0-9]/g, '') || '9647500000000')

    const fileName = `order-invoice-${generatedDocNumber.toLowerCase()}.pdf`
    const pdfFile = new File([generatedPdfBlob], fileName, { type: 'application/pdf' })

    const shareText = `📋 *${t('review.docReadyTitle')}*\n• Ref: *${generatedDocNumber}*\n• Customer: *${clientInfo.clientName || 'Customer'}*\n• Phone: ${clientInfo.phone || 'N/A'}${clientInfo.address ? `\n• Address: ${clientInfo.address}` : ''}\n• Items: ${totalCount}\n• *${t('review.totalInDinar')}:* ${formatPrice(totalValuation)}\n\n${t('brand.name')}`

    // 1. Mobile: Web Share API can attach the PDF file directly to WhatsApp
    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: `Order Invoice - ${generatedDocNumber}`,
          text: shareText,
        })
        setShareFeedback(t('review.waShareSuccess'))
        return
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          return // User dismissed share dialog
        }
        console.warn('Web Share failed, falling back to direct link:', err)
      }
    }

    // 2. Desktop fallback: Auto-download the PDF first, then open WhatsApp direct chat
    try {
      const downloadUrl = URL.createObjectURL(generatedPdfBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = downloadUrl
      downloadLink.download = fileName
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(downloadUrl)
    } catch (e) {
      console.warn('Auto-download before WhatsApp failed:', e)
    }

    // Open WhatsApp direct chat with the customer's number
    const messageWithAttachNote = `${shareText}\n\n📎 _${t('review.waDesktopNote')}_`
    const waUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(messageWithAttachNote)}`
    window.open(waUrl, '_blank')
    setShareFeedback(t('review.waShareSuccess'))
  }

  return (
    <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl w-[94vw] p-5 sm:p-7 max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f141e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl">
        
        {/* Document Ready Success View */}
        {generatedPdfBlobUrl && generatedDocNumber ? (
          <div className="space-y-5 py-3 animate-fade-in text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t('review.docReadyTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Ref: <strong className="text-sky-600 dark:text-sky-400 font-mono">{generatedDocNumber}</strong> • Total: <strong className="text-slate-900 dark:text-white">{formatPrice(totalValuation)}</strong>
              </p>
              {clientInfo.phone && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400/90 font-medium">
                  {t('review.directWhatsAppConfigured')} <span className="text-slate-900 dark:text-white font-bold">{clientInfo.phone}</span>
                </p>
              )}
            </div>

            {/* Action Buttons Grid */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* 1. Combined Download & Open Invoice */}
                <button
                  onClick={handleDownloadAndOpenInvoice}
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer active:scale-98 hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                  title={t('review.downloadAndOpen')}
                >
                  <Download className="h-4.5 w-4.5" />
                  <span>{t('review.downloadAndOpen')}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-75" />
                </button>

                {/* 2. Send Invoice to WhatsApp */}
                <button
                  onClick={handleSendPDFToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer active:scale-98 border border-emerald-400/40 hover:shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                  title={t('review.sendToWhatsApp')}
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-white/20" />
                  <span>{t('review.sendToWhatsApp')}</span>
                </button>
              </div>
            </div>

            {/* Share feedback alert if any */}
            {shareFeedback && (
              <p className="text-xs text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 py-1.5 px-3 rounded-lg max-w-md mx-auto">
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
          <form onSubmit={handleGeneratePDF} className="space-y-4 animate-fade-in text-left">
            
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
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

                {/* Phone Number with 10+ digits enforcement */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>{t('review.phone')} {t('common.required')}</span>
                    </label>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {t('review.phoneMinDigits')}
                    </span>
                  </div>
                  <input
                    type="tel"
                    required
                    minLength={10}
                    placeholder={t('review.phonePlaceholder')}
                    value={clientInfo.phone || ''}
                    onChange={(e) => {
                      const val = e.target.value
                      setClientInfo(prev => ({ ...prev, phone: val }))
                      const digits = val.replace(/\D/g, '')
                      if (digits.length >= 10 && phoneError) {
                        setPhoneError(null)
                      }
                    }}
                    className={`w-full bg-slate-50 dark:bg-[#141a26] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all ${
                      phoneError
                        ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                        : 'border-slate-200 dark:border-slate-800 focus:border-sky-500'
                    }`}
                  />
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

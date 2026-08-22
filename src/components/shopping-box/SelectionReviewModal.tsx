import React, { useState } from 'react'
import {
  FileText,
  Download,
  ExternalLink,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { BRAND_CONFIG } from '../../data/brand'
import { PDFDocumentData } from '../../types/pdf'
import { generateSpecificationPDF } from '../../lib/pdfGenerator'
import { cn } from '../../lib/utils'

export const SelectionReviewModal: React.FC = () => {
  const {
    items,
    isReviewOpen,
    setIsReviewOpen,
    setIsOpen,
    clientInfo,
    setClientInfo,
    exportOptions,
    setExportOptions,
    totalCount,
    totalValuation,
  } = useShoppingBox()

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPdfBlobUrl, setGeneratedPdfBlobUrl] = useState<string | null>(null)
  const [generatedDocNumber, setGeneratedDocNumber] = useState<string | null>(null)

  if (!isReviewOpen) return null

  const handleBackToDrawer = () => {
    setIsReviewOpen(false)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsReviewOpen(false)
    setGeneratedPdfBlobUrl(null)
    setGeneratedDocNumber(null)
  }

  const handleGeneratePDF = async () => {
    if (items.length === 0) return

    setIsGenerating(true)
    try {
      const docNum = `SPEC-2026-${Math.floor(1000 + Math.random() * 9000)}`
      const now = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      const documentData: PDFDocumentData = {
        documentNumber: docNum,
        generatedAt: now,
        branding: {
          companyName: BRAND_CONFIG.name,
          tagline: BRAND_CONFIG.tagline,
          address: BRAND_CONFIG.showroomAddress,
          contactEmail: BRAND_CONFIG.contact.email,
          contactPhone: BRAND_CONFIG.contact.phone,
        },
        client: clientInfo,
        items,
        totalItems: totalCount,
        estimatedTotal: totalValuation,
        currency: 'IQD',
        options: exportOptions,
      }

      const doc = await generateSpecificationPDF(documentData)
      const blob = doc.output('blob')
      const blobUrl = URL.createObjectURL(blob)

      setGeneratedPdfBlobUrl(blobUrl)
      setGeneratedDocNumber(docNum)
    } catch (err) {
      console.error('Error generating PDF:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadAgain = () => {
    if (!generatedDocNumber) return
    const a = document.createElement('a')
    a.href = generatedPdfBlobUrl || ''
    a.download = `product-specifications-${generatedDocNumber.toLowerCase()}.pdf`
    a.click()
  }

  return (
    <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl w-[94vw] sm:w-full p-4 sm:p-7 max-h-[92vh] overflow-y-auto bg-[#0f141e] border-slate-800 text-slate-100 shadow-2xl rounded-3xl">
        
        {/* Document Ready Success View */}
        {generatedPdfBlobUrl && generatedDocNumber ? (
          <div className="space-y-6 py-2 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-xs">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase tracking-widest">
                  Document Generated
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Your Specification Sheet is Ready
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  A high-resolution PDF with technical specifications and estimated pricing has been created.
                </p>
              </div>
            </div>

            {/* Document Card Preview */}
            <div className="bg-[#141a26] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1b2333] border border-slate-700 flex items-center justify-center text-sky-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {clientInfo.projectTitle || 'Product Selection & Specifications'}
                    </h4>
                    <span className="font-mono text-xs text-slate-400">
                      Ref: <strong className="text-sky-300">{generatedDocNumber}</strong> • {totalCount} Items
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase text-slate-400 block font-medium">
                    Total Estimated Amount
                  </span>
                  <span className="font-bold text-base text-white">
                    {totalValuation.toLocaleString()} IQD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleDownloadAgain}
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white py-3 px-5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Document</span>
                </button>

                <a
                  href={generatedPdfBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1b2333] hover:bg-[#222c40] text-slate-200 border border-slate-700 py-3 px-5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-[#141a26] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-white block">
                  Have questions about this selection?
                </span>
                <span className="text-xs text-slate-400">
                  Send this specification directly to our support team for consultation.
                </span>
              </div>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}?subject=Specification%20Inquiry%20Ref%20${generatedDocNumber}`}
                className="inline-flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer shrink-0"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Team</span>
              </a>
            </div>

            {/* Return CTA */}
            <div className="text-center pt-1">
              <button
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Selection Review & Metadata Input Form */
          <div className="space-y-6 animate-fade-in">
            
            {/* Header */}
            <div className="space-y-1.5 border-b border-slate-800 pb-3.5">
              <button
                onClick={handleBackToDrawer}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Cart</span>
              </button>

              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                  Export Specification Document
                </DialogTitle>
              </DialogHeader>

              <p className="text-xs text-slate-400">
                Optionally add project metadata to brand your PDF document.
              </p>
            </div>

            {/* Main 2-Column Review Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Form */}
              <div className="md:col-span-7 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Project &amp; Client Details (Optional)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Recipient / Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gaming Setup / Studio"
                      value={clientInfo.clientName || ''}
                      onChange={(e) =>
                        setClientInfo(prev => ({ ...prev, clientName: e.target.value }))
                      }
                      className="w-full bg-[#141a26] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Esports Arena"
                        value={clientInfo.companyName || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, companyName: e.target.value }))
                        }
                        className="w-full bg-[#141a26] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Project Tag
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Season 2026 Refresh"
                        value={clientInfo.projectTitle || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, projectTitle: e.target.value }))
                        }
                        className="w-full bg-[#141a26] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Special Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Priority delivery and test on site."
                      value={clientInfo.notes || ''}
                      onChange={(e) =>
                        setClientInfo(prev => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full bg-[#141a26] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none"
                    />
                  </div>

                  {/* Document Options */}
                  <div className="pt-2 space-y-2 border-t border-slate-800">
                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.includePricing !== false}
                        onChange={(e) =>
                          setExportOptions(prev => ({ ...prev, includePricing: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Include Pricing Breakdown (IQD)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.includeSpecifications !== false}
                        onChange={(e) =>
                          setExportOptions(prev => ({ ...prev, includeSpecifications: e.target.checked }))
                        }
                        className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Include Technical Specifications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="md:col-span-5 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                  <span>Items Overview</span>
                </div>

                <div className="bg-[#141a26] border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-sm">
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800 last:border-0 last:pb-0">
                        <div className="truncate max-w-[170px]">
                          <span className="text-white block truncate font-medium">
                            {item.product.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-white shrink-0">
                          {(item.product.price * item.quantity).toLocaleString()} IQD
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className="flex items-baseline justify-between text-xs text-slate-400">
                      <span>Total Count</span>
                      <span className="font-semibold text-white">{totalCount} items</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase text-slate-400 font-medium">
                        Total Amount
                      </span>
                      <span className="text-base font-bold text-white">
                        {totalValuation.toLocaleString()} IQD
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleGeneratePDF}
                      disabled={isGenerating}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-60"
                      )}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating PDF...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4" />
                          <span>Generate Specification PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}


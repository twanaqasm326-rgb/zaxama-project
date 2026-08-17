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
      const docNum = `FD-SPEC-2026-${Math.floor(1000 + Math.random() * 9000)}`
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
        currency: 'USD',
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
    a.download = `fakhama-decor-specifications-${generatedDocNumber.toLowerCase()}.pdf`
    a.click()
  }

  return (
    <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl w-[94vw] sm:w-full p-4 sm:p-8 max-h-[92vh] overflow-y-auto bg-card border-border/90 shadow-modal">
        
        {/* If PDF is generated, show the Document Ready Success View */}
        {generatedPdfBlobUrl && generatedDocNumber ? (
          <div className="space-y-8 py-2 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-500/20 shadow-xs">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-widest">
                  Architectural Document Prepared
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Your Specification Sheet is Ready
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-md mx-auto">
                  A product selection and specification sheet with materials, dimensions, and estimated pricing has been prepared.
                </p>
              </div>
            </div>

            {/* Document Card Preview */}
            <div className="bg-stone-50/80 border border-border rounded-2xl p-6 space-y-4 shadow-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-normal text-foreground">
                      {clientInfo.projectTitle || 'Architectural Selection & Specifications'}
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground">
                      Ref: <strong className="text-foreground">{generatedDocNumber}</strong> • {totalCount} Objects
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                    Estimated Selection Value
                  </span>
                  <span className="font-mono text-base font-semibold text-foreground">
                    ${totalValuation.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownloadAgain}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-stone-800 py-3.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-subtle cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Download className="h-4 w-4 text-primary" />
                  <span>Download PDF Document</span>
                </button>

                <a
                  href={generatedPdfBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-card hover:bg-secondary text-foreground border border-border py-3.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <span>Open / Print Document</span>
                </a>
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="bg-secondary/60 border border-border/70 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-foreground block">
                  Would you like to discuss this selection with our team?
                </span>
                <span className="text-xs text-muted-foreground font-light">
                  Email this reference for finish samples, availability, and project consultation.
                </span>
              </div>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}?subject=Selection%20Inquiry%20Ref%20${generatedDocNumber}&body=Hello%20Fakhama%20Decor%20Team,%0D%0A%0D%0AI%20have%20prepared%20a%20product%20selection%20document%20(${generatedDocNumber})%20for%20project:%20${clientInfo.projectTitle || 'Architectural Project'}.%0D%0A%0D%0APlease%20advise%20on%20availability%20and%20material%20samples.`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary hover:text-primary/80 font-semibold cursor-pointer shrink-0"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Us</span>
              </a>
            </div>

            {/* Return CTA */}
            <div className="text-center pt-2">
              <button
                onClick={handleClose}
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ← Return to Showroom
              </button>
            </div>
          </div>
        ) : (
          /* Selection Review & Metadata Input Form */
          <div className="space-y-8 animate-fade-in">
            
            {/* Header */}
            <div className="space-y-2 border-b border-border/80 pb-4">
              <button
                onClick={handleBackToDrawer}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Selection Box</span>
              </button>

              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
                  Review & Generate Specification Document
                </DialogTitle>
              </DialogHeader>

              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                Add optional project notes and client details to personalize your official architectural specification PDF.
              </p>
            </div>

            {/* Main 2-Column Review Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Client & Project Information Form */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>Project & Client Details (Optional)</span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Client / Architect Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arch. Sara Al-Husseini"
                      value={clientInfo.clientName || ''}
                      onChange={(e) =>
                        setClientInfo(prev => ({ ...prev, clientName: e.target.value }))
                      }
                      className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Design Studio / Firm
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Noor Interiors"
                        value={clientInfo.companyName || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, companyName: e.target.value }))
                        }
                        className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Nakheel Villa Suite"
                        value={clientInfo.projectTitle || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, projectTitle: e.target.value }))
                        }
                        className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        placeholder="client@studio.com"
                        value={clientInfo.email || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+966 55 123 4567"
                        value={clientInfo.phone || ''}
                        onChange={(e) =>
                          setClientInfo(prev => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Project Notes / Custom Proportions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Master dining room requires custom length (320 cm) and honed travertine samples delivered to site."
                      value={clientInfo.notes || ''}
                      onChange={(e) =>
                        setClientInfo(prev => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full bg-card border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Document Options Toggles */}
                  <div className="pt-2 space-y-2 border-t border-border/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Document Preferences:
                    </span>
                    <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.includePricing !== false}
                        onChange={(e) =>
                          setExportOptions(prev => ({ ...prev, includePricing: e.target.checked }))
                        }
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span>Include Estimated Catalog Pricing</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.includeSpecifications !== false}
                        onChange={(e) =>
                          setExportOptions(prev => ({ ...prev, includeSpecifications: e.target.checked }))
                        }
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span>Include Technical Dimensions & Material Specifications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Selection Summary Box */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>Curated Summary</span>
                </div>

                <div className="bg-stone-50/80 border border-border rounded-2xl p-5 space-y-4 shadow-subtle">
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs pb-2 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="truncate max-w-[170px]">
                          <span className="font-serif font-normal text-foreground block truncate">
                            {item.product.name}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            Qty: {item.quantity} {item.selectedOption ? `• ${item.selectedOption.name}` : ''}
                          </span>
                        </div>
                        <span className="font-mono font-medium text-foreground shrink-0">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border/80 space-y-1.5">
                    <div className="flex items-baseline justify-between text-xs text-muted-foreground">
                      <span>Total Objects</span>
                      <span className="font-mono font-medium text-foreground">{totalCount} Pieces</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Estimated Selection Value
                      </span>
                      <span className="font-mono text-lg font-bold text-foreground">
                        ${totalValuation.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleGeneratePDF}
                      disabled={isGenerating}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-foreground text-background hover:bg-stone-800 text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all shadow-card active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                      )}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span>Generating Document...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 text-primary" />
                          <span>Generate Specification PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-secondary/60 border border-border/70 rounded-xl p-3.5 text-[11px] text-muted-foreground font-light leading-relaxed">
                  <span className="font-medium text-foreground block mb-0.5">
                    Architectural Specification Standard
                  </span>
                  Generates an architectural specification PDF with photography, dimensions, materials, and reference information.
                </div>
              </div>

            </div>

          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}

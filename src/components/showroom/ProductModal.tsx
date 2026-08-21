import React, { useState, useEffect, useCallback } from 'react'
import {
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { ProductOption } from '../../types/product'
import { cn } from '../../lib/utils'

export const ProductModal: React.FC = () => {
  const { inspectedProduct, setInspectedProduct, products } = useShowroom()
  const {
    setProductQuantity,
    removeItem,
    getItemForProduct,
    setIsOpen: setIsShoppingBoxOpen,
  } = useShoppingBox()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)
  const [modalQuantity, setModalQuantity] = useState<number>(1)

  useEffect(() => {
    setActiveImageIndex(0)
    if (inspectedProduct?.options && inspectedProduct.options.length > 0) {
      const existing = getItemForProduct(inspectedProduct.id)
      if (existing?.selectedOption) {
        setSelectedOption(existing.selectedOption)
        setModalQuantity(existing.quantity || 1)
      } else {
        setSelectedOption(inspectedProduct.options[0])
        setModalQuantity(1)
      }
    } else {
      setSelectedOption(null)
      const existing = inspectedProduct ? getItemForProduct(inspectedProduct.id) : undefined
      setModalQuantity(existing ? existing.quantity : 1)
    }
  }, [inspectedProduct, getItemForProduct])

  const allImages = inspectedProduct
    ? [
        inspectedProduct.mainImage,
        ...(inspectedProduct.galleryImages || []).filter(
          img => img !== inspectedProduct.mainImage
        ),
      ]
    : []

  const activeImage = allImages[activeImageIndex] || inspectedProduct?.mainImage || ''

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!inspectedProduct || allImages.length <= 1) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))
      }
    },
    [inspectedProduct, allImages.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!inspectedProduct) return null

  const currentBoxItem = getItemForProduct(inspectedProduct.id, selectedOption?.id)
  const isSelected = Boolean(currentBoxItem)

  const handleApplySelection = () => {
    setProductQuantity(inspectedProduct, modalQuantity, selectedOption || undefined)
  }

  const handleRemoveSelection = () => {
    if (!currentBoxItem) return
    removeItem(currentBoxItem.id)
    setModalQuantity(1)
  }

  // Related complementary products
  const complementaryProducts = products
    .filter(p => p.id !== inspectedProduct.id && (p.category === inspectedProduct.category || p.isFeatured))
    .slice(0, 2)

  return (
    <Dialog
      open={!!inspectedProduct}
      onOpenChange={open => {
        if (!open) setInspectedProduct(null)
      }}
    >
      <DialogContent className="max-w-4xl p-6 sm:p-9 max-h-[92vh] overflow-y-auto bg-card/95 backdrop-blur-2xl border border-white/80 dark:border-stone-800 shadow-modal rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{inspectedProduct.name} - Blueprint &amp; Material Inspection</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          
          {/* Main Grid: Gallery (Left) + Specifications (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Gallery Column (7 Cols) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Active Image Canvas */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200/50 border border-border/70 shadow-inner group">
                <img
                  src={activeImage}
                  alt={`${inspectedProduct.name} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                />

                {/* SKU Code Overlay */}
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md text-foreground text-[10px] font-mono px-3 py-1 rounded-md border border-border shadow-xs">
                  {inspectedProduct.code} • Chamber View
                </div>

                {/* Arrow Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/85 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-card border border-border shadow-sm transition-all cursor-pointer opacity-80 hover:opacity-100"
                      aria-label="Previous angle"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/85 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-card border border-border shadow-sm transition-all cursor-pointer opacity-80 hover:opacity-100"
                      aria-label="Next angle"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Product angles">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      role="tab"
                      aria-selected={activeImageIndex === idx}
                      className={cn(
                        "relative w-16 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 shadow-2xs",
                        activeImageIndex === idx
                          ? "ring-2 ring-primary border-primary scale-102 shadow-xs"
                          : "border-border opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Atelier Provenance Guarantee Badge */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/60 border border-primary/20 text-xs text-muted-foreground font-mono shadow-2xs">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[11px] text-foreground font-medium">Numbered Atelier Certificate &amp; Lifetime Structural Integrity</span>
              </div>

            </div>

            {/* Specifications Column (5 Cols) */}
            <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-primary">
                    <span className="font-semibold">{inspectedProduct.origin || 'Italian Atelier'}</span>
                    <span>{inspectedProduct.category ? inspectedProduct.category.toUpperCase() : 'ATELIER'}</span>
                  </div>
                  <h2 className="font-serif text-3xl font-normal text-foreground leading-tight">
                    {inspectedProduct.name}
                  </h2>
                  <p className="font-mono text-2xl font-semibold text-foreground pt-1">
                    ${inspectedProduct.price.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-muted-foreground">USD</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                  {inspectedProduct.fullDescription || inspectedProduct.shortDescription}
                </p>

                {/* Finish Selector */}
                {inspectedProduct.options && inspectedProduct.options.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border/70">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Material Finish:</span>
                      <span className="text-foreground font-semibold">{selectedOption?.name}</span>
                    </div>
                    <div className="flex items-center gap-2" role="radiogroup" aria-label="Finish options">
                      {inspectedProduct.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5",
                            selectedOption?.id === opt.id
                              ? "bg-secondary border-primary text-foreground font-semibold shadow-xs ring-1 ring-primary/30"
                              : "border-border text-muted-foreground hover:text-foreground hover:bg-stone-100"
                          )}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-stone-300"
                            style={{ backgroundColor: opt.colorHex || '#ccc' }}
                          />
                          <span>{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Architectural Specifications Matrix */}
                <div className="space-y-2 pt-3 border-t border-border/70 text-xs font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-primary font-semibold flex items-center justify-between">
                    <span>Architectural Specifications</span>
                    <span className="text-muted-foreground font-normal">Metric Blueprint</span>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3.5 space-y-2 border border-border/80 shadow-2xs">
                    {inspectedProduct.dimensions && (
                      <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="text-foreground text-right font-medium">
                          {inspectedProduct.dimensions.width} × {inspectedProduct.dimensions.depth} × {inspectedProduct.dimensions.height}
                        </span>
                      </div>
                    )}
                    {inspectedProduct.dimensions?.weight && (
                      <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                        <span className="text-muted-foreground">Net Mass:</span>
                        <span className="text-foreground font-medium">{inspectedProduct.dimensions.weight}</span>
                      </div>
                    )}
                    {inspectedProduct.materials && (
                      <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                        <span className="text-muted-foreground">Living Materials:</span>
                        <span className="text-foreground text-right font-medium">
                          {inspectedProduct.materials.join(', ')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-2 pt-0.5">
                      <span className="text-muted-foreground">Atelier Lead Time:</span>
                      <span className="text-foreground font-semibold text-primary">{inspectedProduct.leadTime || 'Immediate Dispatch'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Quantity Chooser */}
              <div className="pt-4 border-t border-showroom-hairline space-y-3">
                {/* Quantity Chooser & Valuation Preview */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/50 border border-border/80">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block font-medium">
                      Specify Quantity
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      ${(inspectedProduct.price * modalQuantity).toLocaleString()} USD
                      {modalQuantity > 1 && (
                        <span className="text-[10px] text-muted-foreground font-normal ml-1">
                          (${inspectedProduct.price.toLocaleString()} ea)
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-2.5 py-1 shadow-2xs">
                    <button
                      onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                      disabled={modalQuantity <= 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-40 p-1 cursor-pointer disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-mono font-bold min-w-[1.75rem] text-center text-foreground select-none">
                      {modalQuantity}
                    </span>
                    <button
                      onClick={() => setModalQuantity(prev => Math.min(99, prev + 1))}
                      className="text-muted-foreground hover:text-foreground p-1 cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleApplySelection}
                  className="w-full py-4 rounded-xl text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98 bg-foreground text-background hover:bg-stone-800"
                >
                  {isSelected && currentBoxItem?.quantity === modalQuantity ? (
                    <>
                      <Check className="h-4 w-4 text-primary" />
                      <span>In Selection Box ({modalQuantity} {modalQuantity === 1 ? 'Piece' : 'Pieces'})</span>
                    </>
                  ) : isSelected ? (
                    <>
                      <Check className="h-4 w-4 text-primary" />
                      <span>Update Selection ({modalQuantity} {modalQuantity === 1 ? 'Piece' : 'Pieces'})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 text-primary" />
                      <span>Add {modalQuantity > 1 ? `${modalQuantity} Pieces` : 'Piece'} to Project Box</span>
                    </>
                  )}
                </button>

                {/* Secondary Actions */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  {isSelected ? (
                    <button
                      onClick={handleRemoveSelection}
                      className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove from Box</span>
                    </button>
                  ) : <div />}

                  <button
                    onClick={() => {
                      setInspectedProduct(null)
                      setIsShoppingBoxOpen(true)
                    }}
                    className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-1 ml-auto"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>View Box &amp; Spec Sheet →</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Complementary Pieces Exploration */}
          {complementaryProducts.length > 0 && (
            <div className="pt-6 border-t border-showroom-hairline space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Complementary Curated Pieces
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {complementaryProducts.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => setInspectedProduct(comp)}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-secondary/40 hover:bg-secondary border border-border/80 cursor-pointer transition-colors group"
                  >
                    <img
                      src={comp.mainImage}
                      alt={comp.name}
                      className="w-16 h-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-base font-normal text-foreground group-hover:text-primary truncate">
                        {comp.name}
                      </h4>
                      <p className="font-mono text-xs font-semibold text-foreground">
                        ${comp.price.toLocaleString()} USD
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}

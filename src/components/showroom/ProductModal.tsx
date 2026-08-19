import React, { useState, useEffect, useCallback } from 'react'
import {
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
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
    toggleItem,
    getItemForProduct,
    isProductSelected,
    setIsOpen: setIsShoppingBoxOpen,
  } = useShoppingBox()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)

  useEffect(() => {
    setActiveImageIndex(0)
    if (inspectedProduct?.options && inspectedProduct.options.length > 0) {
      const existing = getItemForProduct(inspectedProduct.id)
      if (existing?.selectedOption) {
        setSelectedOption(existing.selectedOption)
      } else {
        setSelectedOption(inspectedProduct.options[0])
      }
    } else {
      setSelectedOption(null)
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

  const isSelected = isProductSelected(inspectedProduct.id)

  const handleBoxToggle = () => {
    toggleItem(inspectedProduct, selectedOption || undefined)
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
      <DialogContent className="max-w-4xl p-6 sm:p-9 max-h-[92vh] overflow-y-auto bg-card border border-border shadow-modal rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{inspectedProduct.name} - Blueprint &amp; Material Inspection</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          
          {/* Main Grid: Gallery (Left) + Specifications (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Gallery Column (7 Cols) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Active Image Canvas */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200/60 border border-showroom-hairline shadow-subtle group">
                <img
                  src={activeImage}
                  alt={`${inspectedProduct.name} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                />

                {/* SKU Code Overlay */}
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md text-foreground text-[10px] font-mono px-3 py-1 rounded-md border border-border shadow-xs">
                  {inspectedProduct.code}
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
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product angles">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      role="tab"
                      aria-selected={activeImageIndex === idx}
                      className={cn(
                        "relative w-16 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0",
                        activeImageIndex === idx
                          ? "ring-2 ring-primary border-primary scale-102"
                          : "border-border opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Atelier Provenance Guarantee */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50 border border-border/80 text-xs text-muted-foreground font-mono">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Numbered Atelier Certificate &amp; Lifetime Structural Integrity</span>
              </div>

            </div>

            {/* Specifications Column (5 Cols) */}
            <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-primary">
                    <span>{inspectedProduct.origin || 'Italian Atelier'}</span>
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
                  <div className="space-y-2 pt-2 border-t border-showroom-hairline">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground uppercase text-[11px]">Material Finish:</span>
                      <span className="text-foreground font-medium">{selectedOption?.name}</span>
                    </div>
                    <div className="flex items-center gap-2" role="radiogroup" aria-label="Finish options">
                      {inspectedProduct.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5",
                            selectedOption?.id === opt.id
                              ? "bg-stone-200 border-primary text-foreground font-semibold shadow-2xs"
                              : "border-border text-muted-foreground hover:text-foreground"
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

                {/* Technical Specifications Matrix */}
                <div className="space-y-2 pt-3 border-t border-showroom-hairline text-xs font-mono">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Architectural Specifications
                  </div>
                  <div className="bg-secondary/40 rounded-xl p-3 space-y-2 border border-border/70">
                    {inspectedProduct.dimensions && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="text-foreground text-right font-medium">
                          {inspectedProduct.dimensions.width} × {inspectedProduct.dimensions.depth} × {inspectedProduct.dimensions.height}
                        </span>
                      </div>
                    )}
                    {inspectedProduct.dimensions?.weight && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Net Weight:</span>
                        <span className="text-foreground font-medium">{inspectedProduct.dimensions.weight}</span>
                      </div>
                    )}
                    {inspectedProduct.materials && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Materials:</span>
                        <span className="text-foreground text-right font-medium">
                          {inspectedProduct.materials.join(', ')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span className="text-foreground font-medium">{inspectedProduct.leadTime || 'Immediate Dispatch'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-showroom-hairline space-y-3">
                <button
                  onClick={handleBoxToggle}
                  className={cn(
                    "w-full py-4 rounded-xl text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98",
                    isSelected
                      ? "bg-stone-200 text-foreground border border-primary/50"
                      : "bg-foreground text-background hover:bg-stone-800"
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4 text-primary" />
                      <span>Curated in Selection Box</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 text-primary" />
                      <span>Add to Project Selection</span>
                    </>
                  )}
                </button>

                {isSelected && (
                  <button
                    onClick={() => {
                      setInspectedProduct(null)
                      setIsShoppingBoxOpen(true)
                    }}
                    className="w-full py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>View Curated Box &amp; Generate PDF →</span>
                  </button>
                )}
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

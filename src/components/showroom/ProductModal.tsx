import React, { useState, useEffect, useCallback } from 'react'
import {
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
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
  const { inspectedProduct, setInspectedProduct } = useShowroom()
  const {
    toggleItem,
    updateItemOption,
    getItemForProduct,
    isProductSelected,
    setIsOpen: setIsShoppingBoxOpen,
  } = useShoppingBox()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  // Reset states whenever inspected product changes
  useEffect(() => {
    setActiveImageIndex(0)
    setJustAdded(false)
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

  // Aggregate all photos for the product
  const allImages = inspectedProduct
    ? [
        inspectedProduct.mainImage,
        ...(inspectedProduct.galleryImages || []).filter(
          img => img !== inspectedProduct.mainImage
        ),
      ]
    : []

  const activeImage = allImages[activeImageIndex] || inspectedProduct?.mainImage || ''

  // Keyboard navigation for gallery images (Left / Right Arrow keys)
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
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 3000)
  }

  return (
    <Dialog
      open={!!inspectedProduct}
      onOpenChange={open => {
        if (!open) setInspectedProduct(null)
      }}
    >
      <DialogContent className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto bg-card border border-border shadow-modal rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* ============================================================
              LEFT: Multi-Photo Gallery (Same Product Views)
              ============================================================ */}
          <div className="space-y-3">
            {/* Main Active Photo */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/40 border border-border/80 group">
              <img
                src={activeImage}
                alt={`${inspectedProduct.name} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Counter Pill */}
              {allImages.length > 1 && (
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md text-foreground text-xs font-mono px-3 py-1 rounded-full border border-border/80 shadow-xs">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Prev / Next Controls */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setActiveImageIndex(prev =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                      )
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 backdrop-blur-md text-foreground border border-border hover:bg-secondary shadow-sm transition-opacity cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setActiveImageIndex(prev =>
                        prev === allImages.length - 1 ? 0 : prev + 1
                      )
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 backdrop-blur-md text-foreground border border-border hover:bg-secondary shadow-sm transition-opacity cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (Multi-angle photos) */}
            {allImages.length > 1 && (
              <div
                className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar"
                role="tablist"
                aria-label="Product photos"
              >
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={activeImageIndex === idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0",
                      activeImageIndex === idx
                        ? "border-primary ring-2 ring-primary/30 scale-105"
                        : "border-border/70 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img
                      src={imgUrl}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================
              RIGHT: Product Details, Description, Price & Actions
              ============================================================ */}
          <div className="space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              
              {/* Category & Title */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  {inspectedProduct.category}
                </span>
                <DialogHeader className="p-0 text-left">
                  <DialogTitle className="text-2xl sm:text-3xl font-serif font-normal text-foreground leading-tight">
                    {inspectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
              </div>

              {/* Price */}
              <div className="py-1">
                <span className="font-mono text-3xl font-semibold text-foreground">
                  ${inspectedProduct.price.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-muted-foreground">
                    {inspectedProduct.currency || 'USD'}
                  </span>
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {inspectedProduct.shortDescription || inspectedProduct.fullDescription || inspectedProduct.tagline}
              </p>

              {/* Finish / Material Selection (if available) */}
              {inspectedProduct.options && inspectedProduct.options.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-border/70">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase tracking-wider text-foreground font-medium">
                      Finish / Material:
                    </span>
                    {selectedOption && (
                      <span className="text-primary font-medium">{selectedOption.name}</span>
                    )}
                  </div>
                  <div
                    className="flex flex-wrap gap-2"
                    role="radiogroup"
                    aria-label="Finish options"
                  >
                    {inspectedProduct.options.map(opt => {
                      const isOptSelected = selectedOption?.id === opt.id
                      return (
                        <button
                          key={opt.id}
                          role="radio"
                          aria-checked={isOptSelected}
                          onClick={() => {
                            setSelectedOption(opt)
                            const existing = getItemForProduct(inspectedProduct.id)
                            if (existing) {
                              updateItemOption(existing.id, opt)
                            }
                          }}
                          className={cn(
                            "flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs transition-all cursor-pointer",
                            isOptSelected
                              ? "bg-secondary text-foreground border-primary shadow-xs font-medium"
                              : "bg-card text-foreground border-border hover:bg-secondary/70"
                          )}
                        >
                          {opt.colorHex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-border shrink-0"
                              style={{ backgroundColor: opt.colorHex }}
                            />
                          )}
                          <span>{opt.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Add to Shopping Box */}
            <div className="pt-6 border-t border-border/70 space-y-3">
              <button
                onClick={handleBoxToggle}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer",
                  isSelected
                    ? "bg-secondary text-foreground border border-primary/50 hover:bg-secondary/80"
                    : "bg-primary text-primary-foreground hover:brightness-110"
                )}
              >
                {isSelected ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span>In Shopping Box</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add to Shopping Box</span>
                  </>
                )}
              </button>

              {/* Quick feedback message */}
              {justAdded && isSelected && (
                <div className="flex items-center justify-between text-xs font-mono text-primary animate-fade-in px-1">
                  <span>Added to your selection box</span>
                  <button
                    onClick={() => {
                      setInspectedProduct(null)
                      setIsShoppingBoxOpen(true)
                    }}
                    className="inline-flex items-center gap-1 text-foreground hover:text-primary underline font-medium cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>View Box</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

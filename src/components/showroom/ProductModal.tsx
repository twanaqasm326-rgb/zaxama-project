import React, { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useLanguage } from '../../context/LanguageContext'
import { BRAND_CONFIG } from '../../data/brand'
import { formatPrice, productImage, clampQuantity, getDefaultOption } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'
import { cn } from '../../lib/utils'
import { QuantityStepper } from '../ui/QuantityStepper'

export const ProductModal: React.FC = () => {
  const {
    inspectedProduct: rawProduct,
    setInspectedProduct,
  } = useShowroom()

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    getItemForProduct,
  } = useShoppingBox()
  const { t, language } = useLanguage()

  const inspectedProduct = rawProduct ? getLocalizedProduct(rawProduct, language) : null

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [modalQuantity, setModalQuantity] = useState<number>(1)

  const currentBoxItem = rawProduct ? getItemForProduct(rawProduct.id) : undefined
  const isSelected = Boolean(currentBoxItem)

  useEffect(() => {
    setActiveImageIndex(0)
    if (!rawProduct) return

    const existing = items.find(item => item.product.id === rawProduct.id)
    setModalQuantity(existing ? clampQuantity(existing.quantity) : 1)
  }, [rawProduct, items])

  const handleStepperChange = (newQty: number) => {
    const clamped = clampQuantity(newQty)
    setModalQuantity(clamped)
    if (currentBoxItem) {
      updateQuantity(currentBoxItem.id, clamped)
    }
  }

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

  const handleToggleSelection = () => {
    if (isSelected && currentBoxItem) {
      removeItem(currentBoxItem.id)
    } else if (rawProduct) {
      addItem(rawProduct, getDefaultOption(rawProduct), modalQuantity)
    }
  }

  return (
    <Dialog
      open={!!inspectedProduct}
      onOpenChange={open => {
        if (!open) setInspectedProduct(null)
      }}
    >
      <DialogContent className="max-w-5xl w-full sm:w-[92vw] p-0 sm:p-8 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0d121a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{inspectedProduct.name}</DialogTitle>
        </DialogHeader>

        {/* 2-Column Showcase — stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-8 items-start">
          
          {/* Left Column: Image Showcase & Gallery (6 Cols) */}
          <div className="md:col-span-6 space-y-2 sm:space-y-3">
            
            {/* Active Image Canvas */}
            <div className="relative aspect-[4/3] sm:aspect-[4/3] md:aspect-square w-full sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#070a0f] border-b sm:border border-slate-200 dark:border-slate-800 flex items-center justify-center group shadow-inner">
              <img
                src={activeImage}
                alt={`${inspectedProduct.name} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 dark:from-[#0c1017]/50 via-transparent to-transparent pointer-events-none" />

              {/* Arrow Controls */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-[#131822]/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-300 dark:border-slate-700/80 shadow-md transition-all cursor-pointer hover:scale-110"
                    aria-label={t('modal.previousAngle')}
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-[#131822]/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-300 dark:border-slate-700/80 shadow-md transition-all cursor-pointer hover:scale-110"
                    aria-label={t('modal.nextAngle')}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/75 dark:bg-black/80 backdrop-blur-md text-white dark:text-slate-300 text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-white/15">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 no-scrollbar px-3 sm:px-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-12 h-12 sm:w-18 sm:h-18 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0",
                      activeImageIndex === idx
                        ? "ring-2 ring-sky-500 border-sky-500 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={productImage(img, 200)} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & CTA (6 Cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4 text-left px-4 sm:px-0 pt-3 sm:pt-0 pb-2 sm:pb-0">
            
            <div className="space-y-2 sm:space-y-3">
              {/* Brand Name */}
              <p className="text-[11px] sm:text-xs font-bold text-sky-600 dark:text-sky-400 tracking-widest uppercase">
                {inspectedProduct.brand || BRAND_CONFIG.name}
              </p>

              {/* Product Title */}
              <h2 className="text-lg sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                {inspectedProduct.name}
              </h2>

              {/* Price */}
              <div>
                <span className="text-lg sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {formatPrice(inspectedProduct.price, inspectedProduct.currency)}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {inspectedProduct.fullDescription || inspectedProduct.shortDescription}
              </p>

              {/* Specifications: Clean List Layout */}
              {inspectedProduct.specifications && inspectedProduct.specifications.length > 0 && (
                <div className="pt-1 sm:pt-2 space-y-1.5 sm:space-y-2">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('modal.specifications')}:
                  </span>
                  <div className="bg-slate-50 dark:bg-[#131822] rounded-xl p-2.5 sm:p-3.5 border border-slate-200 dark:border-slate-800/90 divide-y divide-slate-200 dark:divide-slate-800/80">
                    {inspectedProduct.specifications.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 sm:py-2 first:pt-0 last:pb-0 gap-2 sm:gap-3 text-[11px] sm:text-sm">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                        <span className="text-slate-900 dark:text-slate-100 font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar — sticky on mobile */}
            <div className="pt-3 sm:pt-5 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-[#0d121a] sm:static sm:bg-transparent dark:sm:bg-transparent pb-1 sm:pb-0">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Quantity Stepper */}
                <QuantityStepper
                  quantity={modalQuantity}
                  onIncrement={() => handleStepperChange(modalQuantity + 1)}
                  onDecrement={() => handleStepperChange(modalQuantity - 1)}
                  onChangeQuantity={(qty) => handleStepperChange(qty)}
                  showTrashAtOne={false}
                />

                {/* Add / Cancel Toggle Button */}
                <button
                  onClick={handleToggleSelection}
                  className={cn(
                    "flex-1 py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 sm:gap-2 active:scale-98 text-center",
                    isSelected
                      ? "bg-rose-500/15 hover:bg-rose-500/25 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 border border-rose-500/50 hover:border-rose-400"
                      : "bg-sky-500 hover:bg-sky-400 text-white border border-sky-400/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  )}
                >
                  {isSelected ? (
                    <>
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                      <span>{t('modal.cancelSelection')}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" />
                      <span>{t('modal.addToShoppingBox')} {modalQuantity > 1 ? `(${modalQuantity})` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

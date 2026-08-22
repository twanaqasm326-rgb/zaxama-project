import React, { useState, useEffect, useCallback } from 'react'
import {
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
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
import { BRAND_CONFIG } from '../../data/brand'
import { cn } from '../../lib/utils'

export const ProductModal: React.FC = () => {
  const {
    inspectedProduct,
    setInspectedProduct,
    products,
  } = useShowroom()

  const {
    addItem,
    removeItem,
    getItemForProduct,
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
    } else if (inspectedProduct) {
      const existing = getItemForProduct(inspectedProduct.id)
      setModalQuantity(existing?.quantity || 1)
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

  const currentBoxItem = getItemForProduct(inspectedProduct.id, selectedOption?.id)
  const isSelected = Boolean(currentBoxItem)

  const handleToggleSelection = () => {
    if (isSelected && currentBoxItem) {
      // If already added, clicking again cancels / removes the piece
      removeItem(currentBoxItem.id)
    } else {
      // First click adds piece to shopping box
      addItem(inspectedProduct, selectedOption || undefined, modalQuantity)
    }
  }


  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.name}! I would like to order:\n• ${inspectedProduct.name} (${inspectedProduct.code})\n• Quantity: ${modalQuantity}\n• Total: ${(inspectedProduct.price * modalQuantity).toLocaleString()} IQD\n\nPlease confirm availability!`
    )
    const phone = BRAND_CONFIG.contact.phone || '07517447522'
    const formattedPhone = phone.startsWith('0') ? '964' + phone.slice(1) : phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, '_blank')
  }

  // Related products
  const complementaryProducts = products
    .filter(p => p.id !== inspectedProduct.id && (p.category === inspectedProduct.category || p.brand === inspectedProduct.brand))
    .slice(0, 2)

  return (
    <Dialog
      open={!!inspectedProduct}
      onOpenChange={open => {
        if (!open) setInspectedProduct(null)
      }}
    >
      <DialogContent className="max-w-4xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto bg-[#0f141d] border border-slate-800 text-slate-100 shadow-2xl rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{inspectedProduct.name} - Product Specifications</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          
          {/* Main Grid: Gallery (Left) + Details (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Gallery Column (6 Cols) */}
            <div className="md:col-span-6 space-y-3">
              
              {/* Active Image Canvas */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#070a0f] border border-slate-800/80 shadow-inner flex items-center justify-center p-4 group">
                <img
                  src={activeImage}
                  alt={`${inspectedProduct.name} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain object-center transition-transform duration-500"
                />

                {/* SKU Code Overlay */}
                <div className="absolute top-3 left-3 bg-[#151b26]/90 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-xs">
                  {inspectedProduct.code}
                </div>

                {/* Arrow Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#151b26]/90 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white border border-slate-700 shadow-sm transition-all cursor-pointer"
                      aria-label="Previous angle"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#151b26]/90 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white border border-slate-700 shadow-sm transition-all cursor-pointer"
                      aria-label="Next angle"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative w-14 h-14 rounded-xl overflow-hidden border p-1 bg-[#0b0e14] transition-all cursor-pointer shrink-0",
                        activeImageIndex === idx
                          ? "ring-2 ring-sky-400 border-sky-400"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Genuine Warranty Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#141a26] border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Official Warranty &amp; Fast Local Delivery</span>
              </div>

            </div>

            {/* Specifications Column (6 Cols) */}
            <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3.5">
                {/* Brand & Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    {inspectedProduct.brand || 'SteelSeries'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {inspectedProduct.discountAmount && (
                      <span className="px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold">
                        {inspectedProduct.discountAmount}
                      </span>
                    )}
                    {inspectedProduct.stockBadge && (
                      <span className="px-2 py-0.5 rounded-md bg-[#c97510] text-white text-[10px] font-bold">
                        {inspectedProduct.stockBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-white leading-snug">
                  {inspectedProduct.name}
                </h2>

                {/* Pricing */}
                <div className="flex items-baseline gap-2.5 pt-0.5">
                  <span className="font-sans text-2xl font-bold text-white tracking-tight">
                    {inspectedProduct.price.toLocaleString()} IQD
                  </span>
                  {inspectedProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {inspectedProduct.originalPrice.toLocaleString()} IQD
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectedProduct.fullDescription || inspectedProduct.shortDescription}
                </p>

                {/* Finish / Edition Selector */}
                {inspectedProduct.options && inspectedProduct.options.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">Edition:</span>
                    <div className="flex flex-wrap gap-2">
                      {inspectedProduct.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer flex items-center gap-1.5",
                            selectedOption?.id === opt.id
                              ? "bg-sky-500/20 border-sky-500 text-white font-semibold"
                              : "border-slate-800 text-slate-400 hover:text-white bg-[#151b26]"
                          )}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-slate-600"
                            style={{ backgroundColor: opt.colorHex || '#ccc' }}
                          />
                          <span>{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specifications Matrix */}
                {inspectedProduct.specifications && inspectedProduct.specifications.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">Key Specifications:</span>
                    <div className="bg-[#141a26] rounded-xl p-3 space-y-1.5 border border-slate-800/80">
                      {inspectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between gap-2 border-b border-slate-800/60 pb-1 last:border-0 last:pb-0">
                          <span className="text-slate-400">{spec.label}:</span>
                          <span className="text-slate-200 font-medium text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Quantity Chooser */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                {/* Quantity Chooser & Valuation */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141a26] border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Total ({modalQuantity} {modalQuantity === 1 ? 'item' : 'items'}):
                    </span>
                    <span className="font-bold text-sm text-white block">
                      {(inspectedProduct.price * modalQuantity).toLocaleString()} IQD
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#1b2333] border border-slate-700 rounded-lg px-2 py-1">
                    <button
                      onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                      disabled={modalQuantity <= 1}
                      className="text-slate-400 hover:text-white disabled:opacity-40 p-0.5 cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs font-bold min-w-[1.5rem] text-center text-white select-none">
                      {modalQuantity}
                    </span>
                    <button
                      onClick={() => setModalQuantity(prev => Math.min(99, prev + 1))}
                      className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Button (Toggle Add / Cancel) */}
                <button
                  onClick={handleToggleSelection}
                  className={cn(
                    "w-full py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98",
                    isSelected
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40"
                      : "bg-sky-500 hover:bg-sky-400 text-white"
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>ADDED TO BOX (CLICK TO CANCEL)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 stroke-[3]" />
                      <span>ADD TO SHOPPING BOX ({modalQuantity})</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Direct Buy */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

          {/* Complementary Products */}
          {complementaryProducts.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Related Items
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complementaryProducts.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => setInspectedProduct(comp)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#141a26] hover:bg-[#192233] border border-slate-800 cursor-pointer transition-colors group"
                  >
                    <img
                      src={comp.mainImage}
                      alt={comp.name}
                      className="w-12 h-12 rounded-lg object-contain bg-[#0b0e14] p-1 border border-slate-800"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 truncate">
                        {comp.name}
                      </h4>
                      <p className="text-xs font-bold text-white pt-0.5">
                        {comp.price.toLocaleString()} IQD
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


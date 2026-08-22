import React from 'react'
import {
  Plus,
  Minus,
  Trash2,
  FileText,
  ShoppingBag,
  ArrowRight,
  MessageCircle
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useShowroom } from '../../context/ShowroomContext'
import { BRAND_CONFIG } from '../../data/brand'

export const ShoppingBoxDrawer: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    items,
    totalCount,
    totalValuation,
    updateQuantity,
    removeItem,
    clearBox,
    setIsReviewOpen,
  } = useShoppingBox()

  const { setInspectedProduct } = useShowroom()

  const handleOpenReview = () => {
    setIsOpen(false)
    setIsReviewOpen(true)
  }

  const handleWhatsAppCheckout = () => {
    const itemListText = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (Qty: ${it.quantity}) - ${(it.product.price * it.quantity).toLocaleString()} IQD`
      )
      .join('\n')

    const message = encodeURIComponent(
      `🛒 *New Order from ${BRAND_CONFIG.name}*\n\n${itemListText}\n\n*Total Estimate:* ${totalValuation.toLocaleString()} IQD\n\nPlease confirm availability & delivery!`
    )

    const phone = BRAND_CONFIG.contact.phone || '07517447522'
    const formattedPhone = phone.startsWith('0') ? '964' + phone.slice(1) : phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl w-[94vw] sm:w-full p-5 sm:p-7 max-h-[90vh] overflow-y-auto bg-[#0f141d] border border-slate-800 text-slate-100 shadow-2xl rounded-3xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-xs">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-lg sm:text-xl font-bold text-white leading-none">
                  Shopping Box
                </DialogTitle>
              </DialogHeader>
              <p className="text-xs text-slate-400 mt-1">
                {totalCount} {totalCount === 1 ? 'Item selected' : 'Items selected'}
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearBox}
              className="text-xs font-semibold text-slate-400 hover:text-red-400 px-2 py-1 transition-colors cursor-pointer"
              title="Clear all items"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 no-scrollbar py-2">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#141a26] border border-slate-800 flex gap-3.5 items-center group shadow-xs hover:border-slate-700 transition-all"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    setIsOpen(false)
                    setInspectedProduct(item.product)
                  }}
                  className="w-16 h-16 rounded-xl bg-[#0b0e14] p-1 border border-slate-800 cursor-pointer shrink-0 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">
                      {item.product.brand || item.product.code}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h4
                    onClick={() => {
                      setIsOpen(false)
                      setInspectedProduct(item.product)
                    }}
                    className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors truncate cursor-pointer"
                  >
                    {item.product.name}
                  </h4>

                  {item.selectedOption && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span
                        className="w-2 h-2 rounded-full border border-slate-600 inline-block"
                        style={{ backgroundColor: item.selectedOption.colorHex || '#ccc' }}
                      />
                      <span>{item.selectedOption.name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {(item.product.price * item.quantity).toLocaleString()} IQD
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-[#1b2333] border border-slate-700 rounded-lg px-2 py-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold min-w-[1rem] text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#141a26] border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-xs mx-auto">
                <h3 className="text-base font-semibold text-white">
                  Your Shopping Box is Empty
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Browse our home decor collection and click on any piece to add it to your box.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex justify-between items-baseline px-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Total Amount:
              </span>
              <span className="text-xl sm:text-2xl font-bold text-white">
                {totalValuation.toLocaleString()} IQD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order via WhatsApp</span>
              </button>

              {/* PDF Spec Action */}
              <button
                onClick={handleOpenReview}
                className="w-full py-3 bg-[#1a2232] hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4 text-sky-400" />
                <span>Specification Sheet</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}



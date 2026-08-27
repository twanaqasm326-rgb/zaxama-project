import React from 'react'
import {
  Plus,
  Minus,
  Trash2,
  FileText,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useShowroom } from '../../context/ShowroomContext'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, productImage } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'

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
  const { t, language } = useLanguage()

  const handleOpenReview = () => {
    setIsOpen(false)
    setIsReviewOpen(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl w-[94vw] p-5 sm:p-7 max-h-[88vh] overflow-y-auto bg-white dark:bg-[#0d121a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-none">
                  {t('drawer.title')}
                </DialogTitle>
              </DialogHeader>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {totalCount} {totalCount === 1 ? t('drawer.pieceSelected') : t('drawer.piecesSelected')}
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearBox}
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-red-500/10 transition-all cursor-pointer"
            >
              {t('drawer.clearAll')}
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 no-scrollbar py-2">
          {items.length > 0 ? (
            items.map((item) => {
              const localizedProduct = getLocalizedProduct(item.product, language)
              return (
                <div
                  key={item.id}
                  className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#131822] border border-slate-200 dark:border-slate-800 flex gap-3 sm:gap-4 items-center group shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsOpen(false)
                      setInspectedProduct(localizedProduct)
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 dark:bg-[#070a0f] border border-slate-200 dark:border-slate-800 cursor-pointer shrink-0 flex items-center justify-center overflow-hidden hover:border-sky-500/40 transition-colors"
                  >
                    <img
                      src={productImage(localizedProduct.mainImage, 200)}
                      alt={localizedProduct.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider truncate">
                        {localizedProduct.brand || localizedProduct.code}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                        title={t('drawer.removeItem')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setIsOpen(false)
                        setInspectedProduct(localizedProduct)
                      }}
                      className="text-xs sm:text-[15px] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors truncate cursor-pointer"
                    >
                      {localizedProduct.name}
                    </h4>

                    <div className="flex items-center justify-between pt-1 gap-2">
                      <span className="text-xs sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-[#1b2333] border border-slate-300 dark:border-slate-700/80 rounded-xl px-2 sm:px-2.5 py-1 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer transition-colors"
                          aria-label={t('card.decrease')}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs sm:text-sm font-bold min-w-[1.25rem] text-center text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer transition-colors"
                          aria-label={t('card.increase')}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            /* Empty State */
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#131822] border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingCart className="h-7 w-7 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="space-y-1.5 max-w-xs mx-auto">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {t('drawer.emptyTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t('drawer.emptySubtitle')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3.5">
            <div className="flex justify-between items-baseline px-1">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                {t('drawer.totalInDinar')}
              </span>
              <span className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {formatPrice(totalValuation)}
              </span>
            </div>

            <div className="pt-1">
              {/* Single Consolidated Action Button */}
              <button
                onClick={handleOpenReview}
                className="w-full py-3.5 px-4 sm:px-5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 active:scale-98"
              >
                <FileText className="h-4.5 w-4.5" />
                <span>{t('drawer.sendInvoiceSheet')}</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}

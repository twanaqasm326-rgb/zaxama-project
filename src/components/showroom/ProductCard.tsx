import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { Product } from '../../types/product'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, productImage } from '../../lib/helpers'
import { getLocalizedProduct } from '../../lib/localizeProduct'
import { cn } from '../../lib/utils'

interface ProductCardProps {
  product: Product
  priority?: boolean
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product: rawProduct,
  priority = false,
  className,
}) => {
  const { setInspectedProduct } = useShowroom()
  const {
    addItem,
    updateQuantity,
    incrementProductQuantity,
    decrementProductQuantity,
    getItemForProduct,
  } = useShoppingBox()
  const { t, language } = useLanguage()

  const product = getLocalizedProduct(rawProduct, language)

  const [imageError, setImageError] = useState(false)

  const cartItem = getItemForProduct(rawProduct.id)
  const isInCart = Boolean(cartItem)
  const currentQuantity = cartItem?.quantity || 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(rawProduct, rawProduct.options?.[0], 1)
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1)
    } else {
      incrementProductQuantity(rawProduct, rawProduct.options?.[0])
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity - 1)
    } else {
      decrementProductQuantity(rawProduct, rawProduct.options?.[0])
    }
  }

  const imageUrl = imageError
    ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    : productImage(product.mainImage, priority ? 800 : 500)

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => setInspectedProduct(rawProduct)}
      className={cn(
        "group relative rounded-2xl overflow-hidden p-3 sm:p-4.5 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015]",
        "bg-white dark:bg-[#131823] hover:bg-slate-50/95 dark:hover:bg-[#161e2e]",
        "border transition-all",
        isInCart
          ? "border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-400/60 dark:ring-emerald-400/70 shadow-[0_6px_22px_rgba(0,0,0,0.08),0_0_26px_rgba(16,185,129,0.36),0_0_40px_rgba(52,211,153,0.18)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.7),0_0_30px_rgba(52,211,153,0.42),0_0_50px_rgba(16,185,129,0.2)]"
          : "border-slate-200/90 dark:border-slate-800/90 hover:border-sky-400 dark:hover:border-sky-400 shadow-[0_4px_16px_rgba(0,0,0,0.05),0_0_16px_rgba(56,189,248,0.12)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.18)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_0_30px_rgba(56,189,248,0.42),0_0_55px_rgba(56,189,248,0.18)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_35px_rgba(56,189,248,0.52),0_0_65px_rgba(56,189,248,0.24)]",
        className
      )}
    >
      {/* Dynamic ambient radial lighting aura */}
      <div
        className={cn(
          "absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500",
          isInCart
            ? "bg-emerald-400/25 dark:bg-emerald-400/30 opacity-90 scale-110"
            : "bg-sky-400/20 dark:bg-sky-400/25 opacity-40 group-hover:opacity-100 group-hover:scale-125"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-xl pointer-events-none transition-opacity duration-500",
          isInCart
            ? "bg-emerald-500/15 dark:bg-emerald-600/20 opacity-80"
            : "bg-sky-500/10 dark:bg-sky-600/15 opacity-0 group-hover:opacity-100"
        )}
      />

      {/* 1. Rich Photo Frame (Cover Fill with Subtle Glow) */}
      <div
        className={cn(
          "relative aspect-square w-full rounded-xl bg-slate-100 dark:bg-[#080b10] overflow-hidden flex items-center justify-center border mb-2.5 sm:mb-3.5 transition-colors shadow-inner",
          isInCart
            ? "border-emerald-400/50 dark:border-emerald-400/40"
            : "border-slate-200 dark:border-slate-800/70 group-hover:border-sky-400/40 dark:group-hover:border-sky-400/30"
        )}
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Soft bottom vignette for photo depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-[#0c1017]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Product Meta & Pricing */}
      <div className="space-y-1.5 text-left flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Title with 2-line clamp */}
          <h3
            className={cn(
              "font-sans font-semibold text-xs sm:text-[15px] transition-colors leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.6rem]",
              isInCart
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300"
            )}
          >
            {product.name}
          </h3>

          {/* Brand Name */}
          <p className="text-[11px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium truncate">
            {product.brand || t('brand.name')}
          </p>
        </div>

        {/* Price Display and Bottom-Right Spinbutton / Action Button */}
        <div className="pt-2 flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-baseline min-w-0">
            <span className="font-sans font-bold text-xs sm:text-[16px] text-slate-900 dark:text-white tracking-tight">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          {/* Spinbutton / Stepper or Add Button */}
          {isInCart ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-0.5 sm:gap-1 bg-slate-100 dark:bg-[#0b0e14] border border-emerald-500/70 rounded-xl p-0.5 sm:p-1 shadow-[0_0_14px_rgba(16,185,129,0.35)] shrink-0 animate-fade-in"
            >
              {/* Decrement / Remove button */}
              <button
                onClick={handleDecrement}
                className={cn(
                  "w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg border transition-all cursor-pointer active:scale-90",
                  currentQuantity === 1
                    ? "bg-rose-500/15 hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 border-rose-500/40 hover:border-rose-400"
                    : "bg-white dark:bg-[#141a26] hover:bg-slate-200 dark:hover:bg-[#1f293d] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-slate-700/60 shadow-xs"
                )}
                title={currentQuantity === 1 ? t('card.removeFromBox') : t('card.decrease')}
                aria-label={currentQuantity === 1 ? `${t('card.removeFromBox')}: ${product.name}` : `${t('card.decrease')}: ${product.name}`}
              >
                {currentQuantity === 1 ? (
                  <Trash2 className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-rose-500 dark:text-rose-400" />
                ) : (
                  <Minus className="h-3 sm:h-3.5 w-3 sm:w-3.5 stroke-[2.5]" />
                )}
              </button>

              {/* Stepper Value Display */}
              <span
                role="spinbutton"
                aria-valuenow={currentQuantity}
                aria-valuemin={1}
                aria-valuemax={99}
                aria-label={`Quantity: ${currentQuantity}`}
                className="text-xs sm:text-sm font-bold min-w-[1.4rem] sm:min-w-[1.6rem] text-center text-emerald-600 dark:text-emerald-400 select-none px-0.5"
              >
                {currentQuantity}
              </span>

              {/* Increment button */}
              <button
                onClick={handleIncrement}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-400/50 shadow-xs transition-all cursor-pointer active:scale-90 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                title={t('card.increase')}
                aria-label={`${t('card.increase')}: ${product.name}`}
              >
                <Plus className="h-3 sm:h-3.5 w-3 sm:w-3.5 stroke-[3]" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-[13px] tracking-wider uppercase bg-sky-500 hover:bg-sky-400 text-white border border-sky-400/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.45)] transition-all duration-200 cursor-pointer shadow-sm active:scale-95 shrink-0"
              title={t('card.add')}
              aria-label={`${t('card.add')} ${product.name}`}
            >
              <Plus className="h-3 sm:h-3.5 w-3 sm:w-3.5 stroke-[3]" />
              <span>{t('card.add')}</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

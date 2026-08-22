import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import { Product } from '../../types/product'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { cn } from '../../lib/utils'

interface ProductCardProps {
  product: Product
  priority?: boolean
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
  className,
}) => {
  const { setInspectedProduct } = useShowroom()
  const { addItem, removeItem, getItemForProduct } = useShoppingBox()

  const cartItem = getItemForProduct(product.id)
  const isInCart = Boolean(cartItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInCart && cartItem) {
      // If already in cart, second click cancels/removes it
      removeItem(cartItem.id)
    } else {
      // First click adds 1 to shopping box
      addItem(product, product.options?.[0], 1)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => setInspectedProduct(product)}
      className={cn(
        "group relative bg-[#131823] hover:bg-[#161c2b] border border-slate-800/90 hover:border-slate-700/90 rounded-2xl overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md",
        className
      )}
    >
      {/* 1. Dark Image Frame with Floating Overlays */}
      <div className="relative aspect-square w-full rounded-xl bg-[#0b0e14] overflow-hidden flex items-center justify-center p-3 border border-slate-800/60 mb-3.5">
        
        {/* Centered High-Res Product Image */}
        <img
          src={product.mainImage}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top-Left: Stock & Discount Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 pointer-events-none z-10">
          {/* Discount Pill Badge (e.g. -150,000 IQD) */}
          {(product.discountAmount || product.hasDiscount) && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs">
              {product.discountAmount || `-${product.discountPercent}%`}
            </span>
          )}

          {/* Stock Low Warning Badge (e.g. Only 1 left, Only 2 left) */}
          {product.stockBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#c97510] text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs">
              {product.stockBadge}
            </span>
          )}
        </div>
      </div>

      {/* 2. Product Meta & Pricing */}
      <div className="space-y-1 text-left flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Title with 2-line clamp */}
          <h3 className="font-sans font-semibold text-[13px] sm:text-sm text-slate-100 group-hover:text-sky-300 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Brand Name */}
          <p className="text-xs text-slate-400 font-medium">
            {product.brand || 'FAKHAMA DECOR'}
          </p>
        </div>

        {/* Price Display and Bottom-Right ADD Button */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="font-sans font-bold text-base sm:text-[17px] text-white tracking-tight">
              {product.price.toLocaleString()} {product.currency || 'IQD'}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {product.originalPrice.toLocaleString()} {product.currency || 'IQD'}
              </span>
            )}
          </div>

          {/* ADD Button in Bottom-Right Corner */}
          <button
            onClick={handleQuickAdd}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md active:scale-95 shrink-0",
              isInCart
                ? "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40"
                : "bg-sky-500 hover:bg-sky-400 text-white border border-sky-400/40"
            )}
            title={isInCart ? `In Box (${cartItem?.quantity})` : "Add to Shopping Box"}
            aria-label={`Add ${product.name} to shopping box`}
          >
            {isInCart ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 stroke-[3]" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}



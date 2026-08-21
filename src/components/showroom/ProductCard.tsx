import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Eye } from 'lucide-react'
import { Product, ProductOption } from '../../types/product'
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
  const {
    getItemForProduct,
    addItem,
    incrementProductQuantity,
    decrementProductQuantity,
  } = useShoppingBox()

  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    product.options?.[0]
  )
  const [isHovered, setIsHovered] = useState(false)

  const selectedItem = getItemForProduct(product.id)
  const isSelected = Boolean(selectedItem)
  const quantity = selectedItem?.quantity || 0

  // Use finish image if available, otherwise main image
  const displayImage = selectedOption?.image || product.mainImage
  const secondaryImage = product.galleryImages && product.galleryImages.length > 1
    ? product.galleryImages.find(img => img !== displayImage) || product.galleryImages[1]
    : null

  const handleSelectFirst = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, selectedOption, 1)
  }

  const handleOptionSelect = (e: React.MouseEvent, opt: ProductOption) => {
    e.stopPropagation()
    setSelectedOption(opt)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setInspectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-card/75 backdrop-blur-md border border-white/70 dark:border-stone-800/80 rounded-3xl overflow-hidden shadow-subtle hover:shadow-pedestal-glow hover:border-primary/50 transition-all duration-500 flex flex-col justify-between cursor-pointer p-4 sm:p-5 space-y-4",
        className
      )}
    >
      {/* Ambient Inner Vitrine Hover Spotlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 1. Hero Product Image Frame with Dual Angle Crossfade */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-radial from-stone-100/80 via-stone-200/40 to-stone-300/30 border border-border/40 shadow-inner">
        {/* Primary View */}
        <img
          src={displayImage}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover object-center transition-all duration-700 ease-out",
            secondaryImage && isHovered ? "opacity-0 scale-[1.04]" : "opacity-100 group-hover:scale-105"
          )}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Secondary Detail View on Hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
            loading="lazy"
          />
        )}

        {/* Translucent SKU & Specimen Code Tag */}
        <div className="absolute top-2.5 left-2.5 bg-card/90 backdrop-blur-md text-foreground text-[10px] font-mono px-2.5 py-1 rounded-lg border border-border/80 shadow-2xs">
          {product.code}
        </div>

        {/* Frosted Archival Specimen Stamp (Replacing generic yellow badge) */}
        {product.isNew && (
          <div className="absolute top-2.5 right-2.5 bg-card/90 backdrop-blur-md text-primary text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-semibold border border-primary/40 shadow-xs">
            Archive 2026
          </div>
        )}

        {/* Hover Inspect Indicator Sheen */}
        <div className="absolute inset-0 bg-stone-950/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-card/95 text-foreground text-xs font-mono font-medium px-4 py-2 rounded-full shadow-modal border border-border/80 backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>Inspect Specimen</span>
          </span>
        </div>
      </div>

      {/* 2. Product Name & Subtle Origin with 2-Line Natural Wrap (No Truncation) */}
      <div className="space-y-1.5 px-0.5 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>{product.origin || 'Italian Atelier'}</span>
          {product.dimensions && (
            <span>{product.dimensions.width}</span>
          )}
        </div>

        {/* 2-Line Wrapped Title (Zero Ellipsis Cuts) */}
        <h3 className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors leading-snug min-h-[2.75rem] line-clamp-2">
          {product.name}
        </h3>

        {/* Dynamic Finish Selector with Tactile 16px Swatches */}
        {product.options && product.options.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center gap-1.5">
              {product.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={(e) => handleOptionSelect(e, opt)}
                  className={cn(
                    "w-4 h-4 rounded-full border transition-all cursor-pointer",
                    selectedOption?.id === opt.id
                      ? "ring-2 ring-primary ring-offset-2 scale-110 border-primary shadow-xs"
                      : "border-stone-300 hover:scale-105"
                  )}
                  style={{ backgroundColor: opt.colorHex || '#ccc' }}
                  title={opt.name}
                  aria-label={`Select finish ${opt.name}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-muted-foreground ml-1.5 truncate max-w-[170px]">
              {selectedOption?.name}
            </span>
          </div>
        )}
      </div>

      {/* 3. Valuation & Stabilized Selection Pill (Fixed Geometry) */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3 px-0.5 relative z-10">
        <div>
          <span className="font-mono text-base sm:text-lg font-semibold text-foreground">
            ${(product.price * (quantity > 1 ? quantity : 1)).toLocaleString()}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-1">
            USD {quantity > 1 ? `(${quantity}x)` : ''}
          </span>
        </div>

        {/* Stabilized Fixed-Dimension Selection Button */}
        <div className="w-[110px] h-[38px] flex items-center justify-end">
          {isSelected ? (
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full inline-flex items-center justify-between bg-secondary/90 border border-primary/50 rounded-full px-1.5 shadow-2xs"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.stopPropagation()
                  decrementProductQuantity(product, selectedOption)
                }}
                className="w-6 h-6 rounded-full bg-card hover:bg-stone-300 flex items-center justify-center text-foreground transition-colors cursor-pointer border border-border/80 shadow-xs"
                aria-label={`Decrease ${product.name} quantity`}
              >
                <Minus className="h-3 w-3 text-foreground" />
              </motion.button>

              <motion.span
                key={quantity}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="font-mono text-xs font-bold text-foreground min-w-[1.25rem] text-center select-none"
              >
                {quantity}
              </motion.span>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.stopPropagation()
                  incrementProductQuantity(product, selectedOption)
                }}
                className="w-6 h-6 rounded-full bg-foreground hover:bg-stone-800 flex items-center justify-center text-primary transition-colors cursor-pointer shadow-xs"
                aria-label={`Increase ${product.name} quantity`}
              >
                <Plus className="h-3 w-3 text-primary" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleSelectFirst}
              aria-label={`Add ${product.name} to selection`}
              className="w-full h-full inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs bg-foreground text-background hover:bg-stone-800 border border-primary/30 hover:border-primary hover:shadow-md"
            >
              <Plus className="h-3.5 w-3.5 text-primary" />
              <span>Select</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

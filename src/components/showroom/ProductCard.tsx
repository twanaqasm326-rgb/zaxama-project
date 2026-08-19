import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus, Eye } from 'lucide-react'
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
  const { toggleItem, getItemForProduct } = useShoppingBox()

  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    product.options?.[0]
  )

  const selectedItem = getItemForProduct(product.id)
  const isSelected = Boolean(selectedItem)

  // Use finish image if available, otherwise main image
  const displayImage = selectedOption?.image || product.mainImage

  const handleBoxToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleItem(product, selectedOption)
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
      className={cn(
        "group relative bg-card/70 backdrop-blur-md border border-border/70 rounded-3xl overflow-hidden shadow-subtle hover:shadow-[0_22px_45px_-12px_rgba(197,160,89,0.18)] hover:border-primary/50 transition-all duration-500 flex flex-col justify-between cursor-pointer p-4 sm:p-5 space-y-4",
        className
      )}
    >
      {/* Ambient Inner Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 1. Hero Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-200/40">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Minimal SKU & New Badge */}
        <div className="absolute top-2.5 left-2.5 bg-card/90 backdrop-blur-md text-foreground text-[10px] font-mono px-2.5 py-1 rounded-lg border border-border/80 shadow-2xs">
          {product.code}
        </div>

        {product.isNew && (
          <div className="absolute top-2.5 right-2.5 bg-primary text-primary-foreground text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md font-semibold shadow-2xs">
            New
          </div>
        )}

        {/* Hover Inspect Indicator Sheen */}
        <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-card/95 text-foreground text-xs font-mono font-medium px-4 py-2 rounded-full shadow-modal border border-border/80 backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>Inspect Specimen</span>
          </span>
        </div>
      </div>

      {/* 2. Product Name & Subtle Origin */}
      <div className="space-y-1.5 px-0.5 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>{product.origin || 'Handcrafted'}</span>
          {product.dimensions && (
            <span>{product.dimensions.width}</span>
          )}
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Dynamic Finish Selector */}
        {product.options && product.options.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center gap-1">
              {product.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={(e) => handleOptionSelect(e, opt)}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all cursor-pointer",
                    selectedOption?.id === opt.id
                      ? "ring-2 ring-primary ring-offset-1 scale-110 border-primary"
                      : "border-stone-300 hover:scale-105"
                  )}
                  style={{ backgroundColor: opt.colorHex || '#ccc' }}
                  title={opt.name}
                  aria-label={`Select finish ${opt.name}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground ml-1.5 truncate max-w-[130px]">
              {selectedOption?.name}
            </span>
          </div>
        )}
      </div>

      {/* 3. Valuation & Add to Selection Box Button */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3 px-0.5 relative z-10">
        <div>
          <span className="font-mono text-base sm:text-lg font-semibold text-foreground">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-1">
            USD
          </span>
        </div>

        {/* Curate Button */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleBoxToggle}
          aria-label={isSelected ? `Remove ${product.name} from selection` : `Add ${product.name} to selection`}
          className={cn(
            "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs",
            isSelected
              ? "bg-stone-200 text-foreground border border-primary/50 shadow-2xs"
              : "bg-foreground text-background hover:bg-stone-800 hover:shadow-md"
          )}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span>In Box</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 text-primary" />
              <span>Select</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  )
}

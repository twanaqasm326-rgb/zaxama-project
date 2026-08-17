import React from 'react'
import { Check, Plus, Eye } from 'lucide-react'
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
  const { toggleItem, isProductSelected } = useShoppingBox()

  const isSelected = isProductSelected(product.id)

  const handleBoxToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleItem(product)
  }

  return (
    <article
      onClick={() => setInspectedProduct(product)}
      className={cn(
        "group relative bg-card border border-border/80 rounded-2xl overflow-hidden shadow-card hover:border-primary/60 hover:shadow-glow transition-all duration-300 flex flex-col justify-between cursor-pointer",
        className
      )}
    >
      {/* 1. Hero Product Image (Single pristine photo) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/30">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Quick View Hint on Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-card/95 text-foreground text-xs font-mono font-medium px-4 py-2 rounded-full shadow-lg border border-primary/30 backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>Inspect Piece</span>
          </span>
        </div>
      </div>

      {/* 2. Product Name, Price & Add to Box Action */}
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
          <p className="font-mono text-sm sm:text-base font-semibold text-foreground">
            ${product.price.toLocaleString()}{' '}
            <span className="text-xs font-normal text-muted-foreground">USD</span>
          </p>
        </div>

        {/* Add to Box Button */}
        <button
          onClick={handleBoxToggle}
          aria-label={isSelected ? `Remove ${product.name} from selection` : `Add ${product.name} to selection`}
          className={cn(
            "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95",
            isSelected
              ? "bg-secondary text-foreground border border-primary/50 hover:bg-secondary/80 shadow-xs"
              : "bg-primary text-primary-foreground hover:brightness-110 shadow-sm"
          )}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span>In Box</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </article>
  )
}

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CategoryNav } from './CategoryNav'
import { ProductCard } from './ProductCard'
import { useShowroom } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { cn } from '../../lib/utils'
import { SearchX, RotateCcw } from 'lucide-react'

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    setSearchQuery,
    viewLayout,
  } = useShowroom()

  const shouldReduceMotion = useReducedMotion()
  const currentCategoryDef = SHOWROOM_CATEGORIES.find(c => c.id === selectedCategory)

  return (
    <section
      id="catalog-section"
      className="relative overflow-hidden bg-background py-16 sm:py-24 border-b border-border/80"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. Clean Luxury Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
          className="space-y-3 pb-6 border-b border-border/70 text-center sm:text-left"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-medium">
            Permanent Collection
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-foreground tracking-tight">
            {currentCategoryDef?.label === 'All Objects' || !currentCategoryDef
              ? 'The Permanent Collection'
              : currentCategoryDef.label}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl font-sans leading-relaxed">
            {currentCategoryDef?.description ||
              'Explore our curated collection of architectural furniture and living objects. Click any piece to inspect multi-angle photos and details.'}
          </p>
        </motion.div>

        {/* 2. Category Navigation & Search */}
        <div>
          <CategoryNav />
        </div>

        {/* 3. Product Gallery Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
            className={cn(
              "grid gap-6 sm:gap-8",
              viewLayout === 'editorial'
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </motion.div>
        ) : (
          /* Clean Empty Search State */
          <div className="py-16 px-6 text-center bg-card border border-border rounded-3xl max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-primary">
              <SearchX className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-normal text-foreground">No Products Found</h3>
              <p className="text-xs text-muted-foreground font-light">
                Try adjusting your search query or reset your category filter.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-stone-800 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-xl cursor-pointer transition-all shadow-xs active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

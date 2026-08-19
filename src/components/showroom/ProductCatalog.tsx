import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CategoryNav } from './CategoryNav'
import { ProductCard } from './ProductCard'
import { useShowroom } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { RotateCcw } from 'lucide-react'

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
  } = useShowroom()

  const shouldReduceMotion = useReducedMotion()
  const currentCategoryDef = SHOWROOM_CATEGORIES.find(c => c.id === selectedCategory)

  return (
    <section
      id="catalog-section"
      className="relative overflow-hidden pt-4 pb-8 sm:pb-12"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }}
          className="pb-1"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
            {currentCategoryDef?.label === 'All Objects' || !currentCategoryDef
              ? 'Permanent Collection'
              : currentCategoryDef.label}
          </h2>
        </motion.div>

        {/* Category Navigation */}
        <div>
          <CategoryNav />
        </div>

        {/* Product Gallery Grid: Locked to 3-Column Editorial Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 6}
              />
            ))}
          </motion.div>
        ) : (
          /* Clean Empty State */
          <div className="py-16 px-6 text-center bg-card/80 border border-border/80 rounded-3xl max-w-md mx-auto space-y-4 shadow-card">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-normal text-foreground">No pieces in this category</h3>
            </div>

            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-stone-800 text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-xs active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
              <span>Show All Pieces</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

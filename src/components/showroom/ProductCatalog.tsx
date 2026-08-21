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
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-t border-border/50"
    >
      {/* Soft Top Ambient Gradient Veil to Blend Seamlessly from Chamber 01 */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-primary/10 blur-2xl pointer-events-none" />

      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-8 sm:space-y-10">
        
        {/* Chamber 02 Entrance Marquee Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }}
          className="relative pb-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border/80 text-[10px] font-mono uppercase tracking-[0.22em] text-primary">
                <span>Chamber 02 • Permanent Archive Volume IV</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
                {currentCategoryDef?.label === 'All Objects' || !currentCategoryDef
                  ? 'The Curated Exhibition'
                  : currentCategoryDef.label}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                Explore catalog specimens, review architectural metric specifications, and curate pieces for your project specification sheet.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span>{filteredProducts.length} Specimens Available</span>
              <span className="text-primary/60">•</span>
              <span className="text-primary font-semibold">Live Selection Active</span>
            </div>
          </div>

          {/* Soft Center-Lit Hairline */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        </motion.div>

        {/* Category Navigation */}
        <div>
          <CategoryNav />
        </div>

        {/* Product Gallery Grid: Spacious 4-Column Vitrine Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 8}
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

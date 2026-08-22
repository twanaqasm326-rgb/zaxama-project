import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { useShowroom } from '../../context/ShowroomContext'
import { RotateCcw, PackageOpen } from 'lucide-react'
import { cn } from '../../lib/utils'

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    gridDensity,
    resetAllFilters,
  } = useShowroom()

  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="catalog-section" className="w-full relative min-h-screen bg-[#0c1017]">
      {/* Product Vitrine Grid Area */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            className={cn(
              "grid gap-3.5 sm:gap-4 lg:gap-4.5",
              gridDensity === '5-col'
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
            )}
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 10}
              />
            ))}
          </motion.div>
        ) : (
          /* Clean Empty State */
          <div className="py-20 px-6 text-center bg-[#131823] border border-slate-800 rounded-3xl max-w-md mx-auto space-y-4 shadow-lg my-12">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
              <PackageOpen className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">No products found</h3>
              <p className="text-xs text-slate-400">
                Try adjusting your search query, clear active filters, or pick another category.
              </p>
            </div>

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}


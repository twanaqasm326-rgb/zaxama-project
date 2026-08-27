import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { useShowroom } from '../../context/ShowroomContext'
import { useLanguage } from '../../context/LanguageContext'
import { RotateCcw, PackageOpen } from 'lucide-react'
import { cn } from '../../lib/utils'

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    gridDensity,
    resetAllFilters,
  } = useShowroom()
  const { t } = useLanguage()

  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="catalog-section" className="w-full relative min-h-screen bg-transparent">
      {/* Product Vitrine Grid Area */}
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-8">
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            className={cn(
              "grid gap-3 sm:gap-5 lg:gap-6",
              gridDensity === '5-col'
                ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
            )}
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 12}
              />
            ))}
          </motion.div>
        ) : (
          /* Clean Empty State */
          <div className="py-16 px-6 text-center bg-white dark:bg-[#131823] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm mx-auto space-y-3.5 shadow-lg my-10">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
              <PackageOpen className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('catalog.noProducts')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('catalog.adjustSearch')}
              </p>
            </div>

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{t('catalog.resetAll')}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

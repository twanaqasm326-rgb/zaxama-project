import React from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Armchair, Sparkles, Layers, Gem, SunMedium } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { SHOWROOM_PRODUCTS } from '../../data/products'
import { cn } from '../../lib/utils'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <LayoutGrid className="h-3.5 w-3.5" />,
  living: <Armchair className="h-3.5 w-3.5" />,
  lighting: <Sparkles className="h-3.5 w-3.5" />,
  dining: <Layers className="h-3.5 w-3.5" />,
  decor: <Gem className="h-3.5 w-3.5" />,
  outdoor: <SunMedium className="h-3.5 w-3.5" />,
}

export const CategoryNav: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
  } = useShowroom()

  const shouldReduceMotion = useReducedMotion()

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return SHOWROOM_PRODUCTS.length
    return SHOWROOM_PRODUCTS.filter(p => p.category === categoryId).length
  }

  const currentCategory = SHOWROOM_CATEGORIES.find(c => c.id === selectedCategory) || SHOWROOM_CATEGORIES[0]
  const currentCount = getCategoryCount(selectedCategory)

  return (
    <div className="space-y-4">
      {/* Centered Atelier Category Dock - Guaranteed no cutoff or overflow */}
      <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-1 px-1">
        <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-card/95 backdrop-blur-md border border-border/80 shadow-card">
          {SHOWROOM_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id
            const count = getCategoryCount(category.id)
            const formattedCount = count < 10 ? `0${count}` : `${count}`
            const icon = CATEGORY_ICONS[category.id] || <LayoutGrid className="h-3.5 w-3.5" />
            const displayLabel = category.shortLabel || category.label

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                role="tab"
                aria-selected={isSelected}
                className={cn(
                  "relative px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer flex items-center gap-2 select-none z-10 whitespace-nowrap",
                  isSelected
                    ? "text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground font-medium hover:bg-stone-200/50"
                )}
              >
                {/* Active Sliding Satin Pill */}
                {isSelected && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "activeCategoryDockIndicator"}
                    className="absolute inset-0 bg-foreground rounded-full shadow-md -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                {/* Category Icon */}
                <span className={cn(
                  "transition-colors shrink-0",
                  isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {icon}
                </span>

                {/* Concise Category Name */}
                <span>{displayLabel}</span>

                {/* Counter Badge */}
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-all leading-none shrink-0",
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-secondary text-muted-foreground font-semibold"
                  )}
                >
                  {formattedCount}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Editorial Category Info Sub-Banner with Full Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 px-4 sm:px-6 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs text-xs text-muted-foreground"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-serif text-sm font-medium text-foreground tracking-wide">
              {currentCategory.label}
            </span>
            {currentCategory.badgeText && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 font-mono text-[10px] uppercase tracking-wider font-semibold">
                {currentCategory.badgeText}
              </span>
            )}
            <span className="hidden md:inline text-border">•</span>
            <p className="font-sans font-light text-muted-foreground text-xs sm:text-sm">
              {currentCategory.description}
            </p>
          </div>

          <div className="font-mono text-[11px] text-muted-foreground shrink-0 uppercase tracking-widest">
            <span className="text-foreground font-semibold">{currentCount}</span> {currentCount === 1 ? 'Piece' : 'Pieces'}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

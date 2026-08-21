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

  return (
    <div className="space-y-4">
      {/* Centered Atelier Category Dock - Glassmorphism Vitrine Design */}
      <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-1 px-1">
        <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-card/85 backdrop-blur-2xl border border-white/70 dark:border-stone-800 shadow-dock">
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
                  "relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer flex items-center gap-2 select-none z-10 whitespace-nowrap",
                  isSelected
                    ? "text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground font-medium hover:bg-stone-200/50"
                )}
              >
                {/* Active Sliding Satin Pill with Champagne Underglow */}
                {isSelected && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "activeCategoryDockIndicator"}
                    className="absolute inset-0 bg-foreground rounded-full shadow-[0_4px_20px_-2px_rgba(197,160,89,0.35)] -z-10"
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

                {/* Zero-Padded Metallic Counter Badge */}
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-all leading-none shrink-0",
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold shadow-xs ring-1 ring-primary-foreground/30"
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

      {/* Sleek Minimalist Chamber Focus Pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
          className="flex items-center justify-center text-center py-1 text-xs text-muted-foreground font-sans"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card/60 border border-border/50 backdrop-blur-xs text-[11px]">
            <span className="font-serif text-foreground font-medium">{currentCategory.label}</span>
            <span className="text-primary">•</span>
            <span className="font-light text-muted-foreground">{currentCategory.description}</span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

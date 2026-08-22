import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react'
import { useShowroom, SortOption } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { cn } from '../../lib/utils'

export const FilterDrawer: React.FC = () => {
  const {
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    quickFilters,
    toggleDiscountsOnly,
    toggleNewArrivalsOnly,
    toggleInStockOnly,
    availableBrands,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    resetAllFilters,
    filteredProducts,
  } = useShowroom()


  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'default', label: 'Featured & Popular' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Customer Rating' },
    { id: 'newest', label: 'New Arrivals' },
  ]

  return (
    <AnimatePresence>
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0f141d] border-l border-slate-800 text-slate-100 shadow-2xl h-full flex flex-col z-10"
          >
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-[#131824]">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="h-4 w-4 text-sky-400" />
                <h2 className="text-base font-semibold text-white">Filter & Sort Gear</h2>
              </div>

              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar">
              
              {/* 1. Category Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Categories
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left",
                      selectedCategory === 'all'
                        ? "bg-sky-500/15 border border-sky-500/50 text-sky-300 font-semibold"
                        : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                    )}
                  >
                    <span>All Collections</span>
                    {selectedCategory === 'all' && <Check className="h-3.5 w-3.5 text-sky-400" />}
                  </button>

                  {SHOWROOM_CATEGORIES.map(cat => {
                    const isSelected = selectedCategory === cat.id

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left truncate",
                          isSelected
                            ? "bg-sky-500/15 border border-sky-500/50 text-sky-300 font-semibold"
                            : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                        )}
                      >
                        <span className="truncate">{cat.shortLabel || cat.label}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Sort By */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Sort Items
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSortBy(opt.id)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left",
                        sortBy === opt.id
                          ? "bg-sky-500/15 border border-sky-500/50 text-sky-300 font-semibold"
                          : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                      )}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.id && <Check className="h-4 w-4 text-sky-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Quick Switches */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Quick Toggles
                </label>
                <div className="space-y-2">
                  <button
                    onClick={toggleDiscountsOnly}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer",
                      quickFilters.discountsOnly
                        ? "bg-red-500/15 border border-red-500/50 text-red-400 font-semibold"
                        : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                    )}
                  >
                    <span>Discounted Items Only</span>
                    <span className={cn(
                      "w-4 h-4 rounded-md flex items-center justify-center border text-[10px]",
                      quickFilters.discountsOnly
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-slate-600 bg-slate-800"
                    )}>
                      {quickFilters.discountsOnly && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                  </button>

                  <button
                    onClick={toggleInStockOnly}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer",
                      quickFilters.inStockOnly
                        ? "bg-emerald-500/15 border border-emerald-500/50 text-emerald-400 font-semibold"
                        : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                    )}
                  >
                    <span>In Stock Only</span>
                    <span className={cn(
                      "w-4 h-4 rounded-md flex items-center justify-center border text-[10px]",
                      quickFilters.inStockOnly
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-600 bg-slate-800"
                    )}>
                      {quickFilters.inStockOnly && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                  </button>

                  <button
                    onClick={toggleNewArrivalsOnly}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer",
                      quickFilters.newArrivalsOnly
                        ? "bg-amber-500/15 border border-amber-500/50 text-amber-400 font-semibold"
                        : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                    )}
                  >
                    <span>New Arrivals Only</span>
                    <span className={cn(
                      "w-4 h-4 rounded-md flex items-center justify-center border text-[10px]",
                      quickFilters.newArrivalsOnly
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "border-slate-600 bg-slate-800"
                    )}>
                      {quickFilters.newArrivalsOnly && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                  </button>
                </div>
              </div>

              {/* 3. Brands Multi-Select */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Brands ({availableBrands.length})
                  </label>
                  {selectedBrands.length > 0 && (
                    <button
                      onClick={() => selectedBrands.forEach(b => toggleBrand(b))}
                      className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {availableBrands.map(brand => {
                    const isSelected = selectedBrands.includes(brand)

                    return (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer",
                          isSelected
                            ? "bg-[#182335] border border-sky-500 text-sky-300 font-semibold"
                            : "bg-[#161c28] hover:bg-[#1b2333] text-slate-300 border border-slate-800"
                        )}
                      >
                        <span className="truncate">{brand}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Price Filter */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Max Price
                  </label>
                  <span className="font-bold text-sky-400">
                    {priceRange[1].toLocaleString()} IQD
                  </span>
                </div>

                <input
                  type="range"
                  min={100000}
                  max={3000000}
                  step={50000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100,000 IQD</span>
                  <span>3,000,000 IQD</span>
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-800/80 bg-[#131824] flex items-center gap-3">
              <button
                onClick={resetAllFilters}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1a2130] hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Show {filteredProducts.length} Items</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

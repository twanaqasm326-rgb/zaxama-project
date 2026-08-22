import React from 'react'
import {
  ChevronLeft,
  SlidersHorizontal,
  Percent,
  Sparkles,
  PackageCheck,
  Box,
  LayoutGrid,
  Grid2X2,
  X
} from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { cn } from '../../lib/utils'

export const CatalogToolbar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    quickFilters,
    toggleDiscountsOnly,
    toggleNewArrivalsOnly,
    toggleInStockOnly,
    selectedBrands,
    toggleBrand,
    setIsFilterDrawerOpen,
    gridDensity,
    setGridDensity,
    filteredProducts,
    totalCatalogCount,
  } = useShowroom()

  const currentCategory = SHOWROOM_CATEGORIES.find(c => c.id === selectedCategory)

  // Count active filter conditions
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (quickFilters.discountsOnly ? 1 : 0) +
    (quickFilters.newArrivalsOnly ? 1 : 0) +
    (quickFilters.inStockOnly ? 1 : 0)

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-slate-800/60 bg-[#0c1017]">
      
      {/* Left Toolbar Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        
        {/* Back / Reset Button */}
        <button
          onClick={() => setSelectedCategory('all')}
          className="p-2 rounded-xl bg-[#151b26] hover:bg-[#1c2433] text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
          title="Reset to all products"
          aria-label="Reset to all products"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Filters Button */}
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
            activeFiltersCount > 0
              ? "bg-[#182234] border-sky-500/50 text-sky-400"
              : "bg-[#151b26] hover:bg-[#1c2433] text-slate-300 hover:text-white border-slate-800"
          )}
          aria-label="Open filter drawer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Active Category Tag Chip (e.g., Vases & Vessels [x]) */}
        {selectedCategory !== 'all' && currentCategory && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-semibold shadow-xs">
            <span>{currentCategory.label}</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className="p-0.5 hover:bg-sky-600 rounded-md transition-colors cursor-pointer"
              aria-label={`Remove ${currentCategory.label} filter`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Active Brand Chips */}
        {selectedBrands.map(brand => (
          <div
            key={brand}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-sky-300 border border-slate-700 text-xs font-semibold"
          >
            <span>{brand}</span>
            <button
              onClick={() => toggleBrand(brand)}
              className="p-0.5 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
              aria-label={`Remove ${brand} filter`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {/* Quick Filter: Discounts */}
        <button
          onClick={toggleDiscountsOnly}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none",
            quickFilters.discountsOnly
              ? "bg-red-500/15 border-red-500/50 text-red-400 font-semibold"
              : "bg-[#151b26] hover:bg-[#1c2433] text-slate-300 hover:text-white border-slate-800"
          )}
        >
          <Percent className="h-3.5 w-3.5 text-red-400" />
          <span>Discounts</span>
        </button>

        {/* Quick Filter: New Arrivals */}
        <button
          onClick={toggleNewArrivalsOnly}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none",
            quickFilters.newArrivalsOnly
              ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-semibold"
              : "bg-[#151b26] hover:bg-[#1c2433] text-slate-300 hover:text-white border-slate-800"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>New Arrivals</span>
        </button>

        {/* Quick Filter: In Stock Only */}
        <button
          onClick={toggleInStockOnly}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none",
            quickFilters.inStockOnly
              ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-semibold"
              : "bg-[#151b26] hover:bg-[#1c2433] text-slate-300 hover:text-white border-slate-800"
          )}
        >
          <PackageCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>In Stock Only</span>
        </button>
      </div>

      {/* Right Product Counter & Density Switcher */}
      <div className="flex items-center gap-3 ml-auto">
        
        {/* Product Count indicator (e.g. Showing X products 20 / 433) */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151b26] border border-slate-800 text-xs text-slate-300">
          <Box className="h-3.5 w-3.5 text-sky-400 shrink-0" />
          <span className="font-semibold text-slate-200">
            Showing {filteredProducts.length} products
          </span>
          <span className="text-slate-500 text-[11px]">
            {filteredProducts.length} / {totalCatalogCount}
          </span>
        </div>

        {/* Grid Density Toggle */}
        <button
          onClick={() => setGridDensity(gridDensity === '5-col' ? '4-col' : '5-col')}
          className="p-2 rounded-xl bg-[#151b26] hover:bg-[#1c2433] text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
          title={`Switch to ${gridDensity === '5-col' ? '4-column' : '5-column'} grid`}
          aria-label="Toggle grid layout"
        >
          {gridDensity === '5-col' ? (
            <LayoutGrid className="h-4 w-4 text-sky-400" />
          ) : (
            <Grid2X2 className="h-4 w-4 text-sky-400" />
          )}
        </button>

      </div>
    </div>
  )
}

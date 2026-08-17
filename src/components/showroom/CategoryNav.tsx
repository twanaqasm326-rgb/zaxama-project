import React, { useRef, useState, useEffect } from 'react'
import { LayoutGrid, Columns2, ArrowUpDown, X, Search } from 'lucide-react'
import { useShowroom, SortOption } from '../../context/ShowroomContext'
import { SHOWROOM_CATEGORIES } from '../../data/categories'
import { SHOWROOM_PRODUCTS } from '../../data/products'
import { cn } from '../../lib/utils'

export const CategoryNav: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    viewLayout,
    setViewLayout,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useShowroom()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftMask, setShowLeftMask] = useState(false)
  const [showRightMask, setShowRightMask] = useState(false)

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return SHOWROOM_PRODUCTS.length
    return SHOWROOM_PRODUCTS.filter(p => p.category === categoryId).length
  }

  // Handle horizontal scroll indicators
  const checkScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setShowLeftMask(el.scrollLeft > 10)
    setShowRightMask(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <div className="space-y-4">
      {/* 1. Category Navigation & Discovery Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border/80">
        
        {/* Category Tabs */}
        <div className="relative flex-1 min-w-0">
          {/* Left subtle mask */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
              showLeftMask ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
            role="tablist"
            aria-label="Product categories"
          >
            {SHOWROOM_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id
              const count = getCategoryCount(category.id)

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={cn(
                    "group relative whitespace-nowrap px-3.5 py-2 rounded-xl text-xs tracking-wide transition-all duration-200 cursor-pointer flex items-baseline gap-1.5",
                    isSelected
                      ? "bg-secondary text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-medium"
                  )}
                >
                  <span className="font-sans uppercase text-[11px] sm:text-xs">
                    {category.label}
                  </span>
                  
                  <span
                    className={cn(
                      "text-[10px] font-mono",
                      isSelected ? "text-primary font-bold" : "text-muted-foreground/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right subtle mask */}
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
              showRightMask ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* 2. Search, Sort & View Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-56 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
              aria-label="Search collection"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-card border border-border rounded-xl px-3 py-1.5 shadow-2xs">
            <ArrowUpDown className="h-3 w-3 text-primary shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer font-medium font-sans pr-1"
              aria-label="Sort collection"
            >
              <option value="curated">Featured</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Layout Toggle */}
          <div className="hidden sm:flex items-center gap-0.5 bg-card border border-border rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setViewLayout('editorial')}
              className={cn(
                "p-1.5 rounded-lg transition-all duration-200 cursor-pointer",
                viewLayout === 'editorial'
                  ? "bg-secondary text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="3-Column Grid"
              aria-label="3-Column Grid"
            >
              <Columns2 className="h-3.5 w-3.5" />
            </button>
            
            <button
              onClick={() => setViewLayout('compact')}
              className={cn(
                "p-1.5 rounded-lg transition-all duration-200 cursor-pointer",
                viewLayout === 'compact'
                  ? "bg-secondary text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="4-Column Grid"
              aria-label="4-Column Grid"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

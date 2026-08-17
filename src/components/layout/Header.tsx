import React, { useState } from 'react'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { BRAND_CONFIG } from '../../data/brand'
import { cn } from '../../lib/utils'

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory } = useShowroom()
  const { setIsOpen: setIsShoppingBoxOpen, totalCount: totalSelectedCount } = useShoppingBox()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleNavClick = (categoryId?: string, sectionId?: string) => {
    setIsMobileMenuOpen(false)
    if (categoryId) {
      setSelectedCategory(categoryId)
    }
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('all', 'root')
            }}
            className="flex items-baseline gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
              {BRAND_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-[0.25em] text-muted-foreground border-l border-border pl-3 py-0.5">
              Showroom Atelier
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button
            onClick={() => handleNavClick('all', 'catalog-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Catalog
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'spotlight-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Spotlight
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'story-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Craft & Materiality
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'atelier-info')}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Showroom Info
          </button>
        </nav>

        {/* Actions & Search */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className={cn(
            "relative transition-all duration-300",
            isSearchOpen ? "w-48 sm:w-64" : "w-9 sm:w-64"
          )}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search collection, stone, wood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false)
                }}
                className={cn(
                  "w-full bg-card/80 border border-border rounded-full pl-9 pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all",
                  !isSearchOpen && "hidden sm:block"
                )}
              />
              {/* Mobile search toggle icon */}
              {!isSearchOpen && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="sm:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
                  aria-label="Open search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-muted-foreground hover:text-foreground text-xs"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Selection Box Indicator Pill */}
          <button
            onClick={() => setIsShoppingBoxOpen(true)}
            className="relative flex items-center gap-2 bg-secondary hover:bg-stone-200/70 text-foreground px-3.5 py-1.5 rounded-full text-xs font-medium border border-border/80 transition-all cursor-pointer shadow-subtle group focus-visible:ring-2 focus-visible:ring-primary"
            title="Open Curated Selection Box"
            aria-label={`Open Selection Box, ${totalSelectedCount} items selected`}
          >
            <ShoppingBag className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">Selected</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-full text-[11px] font-mono transition-colors",
              totalSelectedCount > 0
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted text-muted-foreground"
            )}>
              {totalSelectedCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-6 space-y-4 animate-slide-in-top shadow-card">
          <div className="space-y-3">
            <button
              onClick={() => handleNavClick('all', 'catalog-section')}
              className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/50"
            >
              Showroom Catalog
            </button>
            <button
              onClick={() => handleNavClick(undefined, 'spotlight-section')}
              className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/50"
            >
              Curated Spotlight
            </button>
            <button
              onClick={() => handleNavClick(undefined, 'story-section')}
              className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/50"
            >
              Craftsmanship & Heritage
            </button>
            <button
              onClick={() => handleNavClick(undefined, 'atelier-info')}
              className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2"
            >
              Atelier Hours & Location
            </button>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>{BRAND_CONFIG.showroomAddress}</span>
          </div>
        </div>
      )}
    </header>
  )
}

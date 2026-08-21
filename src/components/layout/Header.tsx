import React, { useState, useEffect } from 'react'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { BrandLogo } from '../ui/BrandLogo'
import { cn } from '../../lib/utils'

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory } = useShowroom()
  const { setIsOpen: setIsShoppingBoxOpen, totalCount: totalSelectedCount } = useShoppingBox()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/80 shadow-subtle py-3.5"
          : "bg-background/60 backdrop-blur-xs py-5"
      )}
    >
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-28 flex items-center justify-between gap-6">
        
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('all', 'root')
            }}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <BrandLogo size="md" showTagline={false} />
          </a>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-medium">
          <button
            onClick={() => handleNavClick('all', 'catalog-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1 relative group"
          >
            <span>All Pieces</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => handleNavClick('living', 'catalog-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1 relative group"
          >
            <span>Living</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => handleNavClick('dining', 'catalog-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1 relative group"
          >
            <span>Dining</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => handleNavClick('lighting', 'catalog-section')}
            className="hover:text-foreground transition-colors cursor-pointer py-1 relative group"
          >
            <span>Lighting</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => handleNavClick(undefined, 'atelier-info')}
            className="hover:text-foreground transition-colors cursor-pointer py-1 relative group"
          >
            <span>Atelier</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Actions: Search + Selection Drawer Pill */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search */}
          <div className={cn(
            "relative transition-all duration-300",
            isSearchOpen ? "w-48 sm:w-56" : "w-8 sm:w-48"
          )}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false)
                }}
                className={cn(
                  "w-full bg-card/80 border border-border/80 rounded-full pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-sans",
                  !isSearchOpen && "hidden sm:block"
                )}
                aria-label="Search collection"
              />
              {!isSearchOpen && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="sm:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                  aria-label="Open search input"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-muted-foreground hover:text-foreground text-xs p-0.5 rounded-full"
                  aria-label="Clear search query"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Selection Box Pill */}
          <button
            onClick={() => setIsShoppingBoxOpen(true)}
            className="relative inline-flex items-center gap-2 bg-card/90 hover:bg-secondary text-foreground px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider font-medium border border-border/80 shadow-2xs hover:border-primary/50 transition-all cursor-pointer group active:scale-97"
            aria-label={`Open Curated Selection Box with ${totalSelectedCount} items`}
          >
            <ShoppingBag className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Box</span>
            <span
              className={cn(
                "px-2 py-0.2 rounded-full text-[11px] font-mono font-semibold transition-colors",
                totalSelectedCount > 0
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-stone-200 text-muted-foreground"
              )}
            >
              {totalSelectedCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-5 space-y-3 animate-fade-in shadow-card">
          <button
            onClick={() => handleNavClick('all', 'catalog-section')}
            className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/40 transition-colors"
          >
            All Pieces
          </button>
          <button
            onClick={() => handleNavClick('living', 'catalog-section')}
            className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/40 transition-colors"
          >
            Living &amp; Seating
          </button>
          <button
            onClick={() => handleNavClick('dining', 'catalog-section')}
            className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/40 transition-colors"
          >
            Monolithic Dining
          </button>
          <button
            onClick={() => handleNavClick('lighting', 'catalog-section')}
            className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 border-b border-border/40 transition-colors"
          >
            Architectural Lighting
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'atelier-info')}
            className="block w-full text-left font-serif text-lg text-foreground hover:text-primary py-2 transition-colors"
          >
            Atelier Info &amp; Inquiries
          </button>
        </div>
      )}
    </header>
  )
}

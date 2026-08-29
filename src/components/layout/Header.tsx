import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { BrandLogo } from '../ui/BrandLogo'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSelector } from '../ui/LanguageSelector'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useShowroom } from '../../context/ShowroomContext'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/utils'

export const Header: React.FC = () => {
  const {
    setIsOpen: setIsShoppingBoxOpen,
    totalCount: totalSelectedCount,
  } = useShoppingBox()
  const {
    setSelectedCategory,
    setSearchQuery,
  } = useShowroom()
  const { t } = useLanguage()

  const handleLogoClick = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasItems = totalSelectedCount > 0

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/85 dark:bg-[#0c1017]/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200/80 dark:border-white/[0.08] transition-colors duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="w-full max-w-[1920px] mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-20 gap-1.5 sm:gap-2">

        {/* Left: Brand Logo & Brand Name */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none shrink-0 min-w-0"
          aria-label="Go to home"
        >
          <BrandLogo size="md" showText={true} />
        </button>

        {/* Right Actions: Language Switcher, Theme Switcher & Shopping Box */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">

          {/* Multi-Language Selector */}
          <LanguageSelector />

          {/* Theme Mode Toggle */}
          <ThemeToggle />

          {/* Shopping Box Button with Card-Matching Glow */}
          <button
            onClick={() => setIsShoppingBoxOpen(true)}
            className={cn(
              "relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4.5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-300 cursor-pointer group select-none active:scale-95",
              hasItems
                ? "bg-emerald-50/95 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border border-emerald-500/70 dark:border-emerald-400/60 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:border-emerald-400 dark:hover:border-emerald-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.55),0_0_40px_rgba(52,211,153,0.3)] hover:ring-2 hover:ring-emerald-400/50 animate-heartbeat-continuous"
                : "bg-white/90 dark:bg-[#131823] hover:bg-slate-50 dark:hover:bg-[#161e2e] text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-800/90 hover:border-sky-400 dark:hover:border-sky-400 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.45),0_0_35px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_0_22px_rgba(56,189,248,0.5),0_0_40px_rgba(56,189,248,0.25)] hover:ring-2 hover:ring-sky-400/40"
            )}
            aria-label={`${t('header.shoppingBox')}: ${totalSelectedCount}`}
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 group-hover:scale-110",
                  hasItems
                    ? "text-emerald-600 dark:text-emerald-400 stroke-[2.2]"
                    : "text-sky-600 dark:text-sky-400"
                )}
              />
            </div>
            <span className="hidden md:inline font-medium tracking-wide">
              {t('header.shoppingBox')}
            </span>
            {hasItems && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold bg-emerald-500 text-white shadow-xs">
                {totalSelectedCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  )
}

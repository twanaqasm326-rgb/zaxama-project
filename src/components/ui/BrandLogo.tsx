import React from 'react'
import { cn } from '../../lib/utils'
import { useLanguage } from '../../context/LanguageContext'

interface BrandLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  showText?: boolean
  showTagline?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  showText = true,
  showTagline = false,
}) => {
  const { t } = useLanguage()

  const sizeMap = {
    sm: { icon: 'w-7 h-7 sm:w-8 sm:h-8', text: 'text-base sm:text-lg font-bold tracking-wider', sub: 'text-[10px]' },
    md: { icon: 'w-8 h-8 sm:w-10 sm:h-10', text: 'text-base sm:text-2xl font-bold tracking-wider', sub: 'text-xs' },
    lg: { icon: 'w-11 h-11 sm:w-14 sm:h-14', text: 'text-xl sm:text-3xl font-bold tracking-widest', sub: 'text-sm' },
    hero: { icon: 'w-18 h-18 sm:w-24 sm:h-24', text: 'text-2xl sm:text-4xl font-bold tracking-widest', sub: 'text-xs sm:text-sm' },
  }

  const { icon, text, sub } = sizeMap[size]

  return (
    <div className={cn("inline-flex items-center gap-2 sm:gap-3 select-none", className)}>
      {/* Sleek Emblem */}
      <div className={cn("relative flex items-center justify-center shrink-0", icon)}>
        {/* Glow */}
        <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-md pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(14,165,233,0.3)] dark:drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Luxury Squircle Frame */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            className="stroke-sky-600 dark:stroke-sky-400"
            strokeWidth="3.5"
          />
          {/* Inner Accent Line */}
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            rx="16"
            className="stroke-slate-300/80 dark:stroke-white/15"
            strokeWidth="1.5"
          />

          {/* Letter F (Dark Charcoal in Light Mode, Crisp White in Dark Mode) */}
          <path
            d="M 28 26 L 28 74 M 28 26 L 47 26 M 28 49 L 43 49"
            className="stroke-slate-900 dark:stroke-slate-100"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter D (Sky Blue in both modes) */}
          <path
            d="M 52 26 L 52 74 M 52 26 C 75 26 80 37 80 50 C 80 63 75 74 52 74"
            className="stroke-sky-600 dark:stroke-sky-400"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Luxury Accent Dot */}
          <circle cx="50" cy="50" r="3.5" className="fill-sky-600 dark:fill-sky-400" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "text-slate-900 dark:text-white uppercase leading-none font-sans tracking-wide transition-colors",
              text
            )}
          >
            {t('brand.name')}
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-sky-400 uppercase font-medium mt-1 leading-none tracking-widest",
                sub
              )}
            >
              {t('brand.tagline')}
            </span>
          )}
        </div>
      )}
    </div>
  )
}


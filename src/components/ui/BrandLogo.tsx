import React from 'react'
import { cn } from '../../lib/utils'
import { BRAND_CONFIG } from '../../data/brand'

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
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base font-bold tracking-wider', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-lg sm:text-xl font-bold tracking-wider', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl font-bold tracking-widest', sub: 'text-xs' },
    hero: { icon: 'w-24 h-24', text: 'text-3xl sm:text-4xl font-bold tracking-widest', sub: 'text-xs sm:text-sm' },
  }

  const { icon, text, sub } = sizeMap[size]

  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      {/* Sleek Emblem */}
      <div className={cn("relative flex items-center justify-center shrink-0", icon)}>
        {/* Glow */}
        <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-md pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-sky-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.4)] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Rounded Frame */}
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="20"
            className="stroke-sky-400"
            strokeWidth="3.5"
          />
          {/* Inner Geometric Shape */}
          <rect
            x="50"
            y="18"
            width="45"
            height="45"
            rx="10"
            transform="rotate(45 50 18)"
            className="stroke-slate-400/50"
            strokeWidth="2.5"
          />
          {/* Central Pillar */}
          <path
            d="M50 28V72M34 50H66"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Center Point */}
          <circle cx="50" cy="50" r="5" className="fill-sky-400" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "text-white uppercase leading-none font-sans tracking-wide",
              text
            )}
          >
            {BRAND_CONFIG.name}
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-sky-400 uppercase font-medium mt-1 leading-none tracking-widest",
                sub
              )}
            >
              {BRAND_CONFIG.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}


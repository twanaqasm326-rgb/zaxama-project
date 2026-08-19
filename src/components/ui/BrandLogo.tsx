import React from 'react'
import { cn } from '../../lib/utils'

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
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl sm:text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    hero: { icon: 'w-28 h-28 sm:w-40 sm:h-40', text: 'text-3xl sm:text-4xl', sub: 'text-xs sm:text-sm' },
  }

  const { icon, text, sub } = sizeMap[size]

  return (
    <div className={cn("inline-flex items-center gap-3.5 select-none", className)}>
      {/* Sculptural Architectural Emblem */}
      <div className={cn("relative flex items-center justify-center shrink-0", icon)}>
        {/* Ambient Subtle Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg pointer-events-none" />
        
        {/* Geometric Monolithic Emblem SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary drop-shadow-[0_4px_12px_rgba(197,160,89,0.3)] transition-transform duration-500 hover:scale-105"
        >
          {/* Outer Rounded Architectural Frame */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="18"
            className="stroke-primary/80"
            strokeWidth="2.5"
          />
          {/* Inner Inscribed Rotated Diamond / Arch */}
          <rect
            x="50"
            y="14"
            width="50.9"
            height="50.9"
            rx="8"
            transform="rotate(45 50 14)"
            className="stroke-foreground/60"
            strokeWidth="1.75"
          />
          {/* Central Monolith Pillar & Arch Line */}
          <path
            d="M50 26V74M36 50H64"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Champagne Corner Pips */}
          <circle cx="50" cy="50" r="4.5" className="fill-primary" />
          <circle cx="28" cy="28" r="2" className="fill-primary/60" />
          <circle cx="72" cy="28" r="2" className="fill-primary/60" />
          <circle cx="28" cy="72" r="2" className="fill-primary/60" />
          <circle cx="72" cy="72" r="2" className="fill-primary/60" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-serif font-normal tracking-[0.24em] text-foreground uppercase leading-none bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text",
              text
            )}
          >
            FAKHAMA DECOR
          </span>
          {showTagline && (
            <span
              className={cn(
                "font-mono tracking-[0.28em] text-primary uppercase font-medium mt-1.5 leading-none",
                sub
              )}
            >
              Architectural Living &amp; Objects
            </span>
          )}
        </div>
      )}
    </div>
  )
}

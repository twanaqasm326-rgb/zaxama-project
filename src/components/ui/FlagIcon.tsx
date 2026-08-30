import React from 'react'
import { Language } from '../../data/translations'
import { cn } from '../../lib/utils'

interface FlagIconProps {
  code: Language
  className?: string
}

// UK Flag (Union Jack)
export const FlagUK: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 60 40"
    className={cn("w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden", className)}
    aria-hidden="true"
  >
    <clipPath id="uk-clip">
      <rect width="60" height="40" rx="2" />
    </clipPath>
    <g clipPath="url(#uk-clip)">
      {/* Blue field */}
      <rect width="60" height="40" fill="#012169" />
      {/* White diagonal saltire */}
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="6" />
      {/* Red diagonal saltire */}
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="2.5" />
      {/* White central cross */}
      <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="10" />
      {/* Red central cross */}
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
)

// Arabic Pan-Arab Flag
export const FlagArabic: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 60 40"
    className={cn("w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden", className)}
    aria-hidden="true"
  >
    <clipPath id="ar-clip">
      <rect width="60" height="40" rx="2" />
    </clipPath>
    <g clipPath="url(#ar-clip)">
      {/* Top Black Stripe */}
      <rect width="60" height="13.33" y="0" fill="#000000" />
      {/* Middle White Stripe */}
      <rect width="60" height="13.34" y="13.33" fill="#FFFFFF" />
      {/* Bottom Green Stripe */}
      <rect width="60" height="13.33" y="26.67" fill="#007A3D" />
      {/* Left Red Triangle */}
      <polygon points="0,0 20,20 0,40" fill="#CE1126" />
    </g>
  </svg>
)

// Kurdistan Flag with 21-ray Golden Sun
export const FlagKurdistan: React.FC<{ className?: string }> = ({ className }) => {
  // Generate 21-ray sun polygon points
  const cx = 30
  const cy = 20
  const outerR = 7.2
  const innerR = 4.2
  const totalPoints = 42

  const points = Array.from({ length: totalPoints }, (_, i) => {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (i * Math.PI) / 21 - Math.PI / 2
    const x = (cx + r * Math.cos(angle)).toFixed(2)
    const y = (cy + r * Math.sin(angle)).toFixed(2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <clipPath id="ku-clip">
        <rect width="60" height="40" rx="2" />
      </clipPath>
      <g clipPath="url(#ku-clip)">
        {/* Red Stripe */}
        <rect width="60" height="13.33" y="0" fill="#ED2024" />
        {/* White Stripe */}
        <rect width="60" height="13.34" y="13.33" fill="#FFFFFF" />
        {/* Green Stripe */}
        <rect width="60" height="13.33" y="26.67" fill="#278E43" />
        {/* 21-Point Golden Sun */}
        <polygon points={points} fill="#FEB81C" />
        {/* Center Disc */}
        <circle cx="30" cy="20" r="3.8" fill="#FEB81C" />
      </g>
    </svg>
  )
}

// Turkish Flag
export const FlagTurkey: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 60 40"
    className={cn("w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 overflow-hidden", className)}
    aria-hidden="true"
  >
    <clipPath id="tr-clip">
      <rect width="60" height="40" rx="2" />
    </clipPath>
    <g clipPath="url(#tr-clip)">
      {/* Red Background */}
      <rect width="60" height="40" fill="#E30A17" />
      {/* White Crescent */}
      <circle cx="23" cy="20" r="9.5" fill="#FFFFFF" />
      <circle cx="25.5" cy="20" r="7.6" fill="#E30A17" />
      {/* 5-pointed Star */}
      <polygon
        points="34,14 35.3,18 39.5,18 36.1,20.5 37.4,24.5 34,22 30.6,24.5 31.9,20.5 28.5,18 32.7,18"
        fill="#FFFFFF"
      />
    </g>
  </svg>
)

export const FlagIcon: React.FC<FlagIconProps> = ({ code, className }) => {
  switch (code) {
    case 'en':
      return <FlagUK className={className} />
    case 'ar':
      return <FlagArabic className={className} />
    case 'ku':
      return <FlagKurdistan className={className} />
    case 'tr':
      return <FlagTurkey className={className} />
    default:
      return <FlagUK className={className} />
  }
}

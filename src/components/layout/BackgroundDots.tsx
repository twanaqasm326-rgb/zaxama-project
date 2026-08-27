import React, { useMemo } from 'react'

interface Dot {
  id: number
  top: string
  left: string
  size: number
  opacity: number
  color: string
  glowColor: string
  duration: number
  delay: number
}

export const BackgroundDots: React.FC = () => {
  // Precompute bright, luminous floating dots
  const dots = useMemo<Dot[]>(() => {
    const items: Dot[] = []
    const count = 52

    for (let i = 0; i < count; i++) {
      const top = ((i * 19 + 5) % 100)
      const left = ((i * 23 + 11) % 100)
      const size = (i % 3 === 0 ? 3 : i % 2 === 0 ? 2.5 : 2)
      const opacity = 0.35 + ((i % 4) * 0.15) // Brighter opacity (0.35 to 0.8)
      const isSky = i % 2 === 0
      const color = isSky 
        ? `rgba(56, 189, 248, ${opacity})` 
        : `rgba(224, 242, 254, ${opacity})`
      const glowColor = isSky 
        ? `rgba(56, 189, 248, 0.65)` 
        : `rgba(255, 255, 255, 0.5)`
      const duration = 4 + (i % 4) * 1.5
      const delay = (i % 6) * 0.9

      items.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size,
        opacity,
        color,
        glowColor,
        duration,
        delay,
      })
    }
    return items
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Micro-Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.16]" 
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px'
        }} 
      />

      {/* 2. Soft Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_0%] from-sky-500/5 dark:from-sky-950/25 via-transparent to-transparent dark:to-[#0c1017]/85" />

      {/* 3. Scattered Ambient Glowing Floating Dots */}
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full transition-opacity duration-500"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            boxShadow: `0 0 10px ${dot.glowColor}`,
            animation: `pulse ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

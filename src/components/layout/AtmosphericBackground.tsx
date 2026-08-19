import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const AtmosphericBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      // Smooth dampening
      setMousePos({
        x: (e.clientX / window.innerWidth) * 40 - 20,
        y: (e.clientY / window.innerHeight) * 40 - 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Warm Alabaster Canvas with Subtle Vignette */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* 2. Floating Ambient Light Orbs (Champagne Gold, Warm Travertine, Rose Bronze) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -25, 20, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
        }}
        className="absolute -top-32 left-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-[#E8C98B]/20 via-[#D4AF37]/10 to-transparent blur-[120px] opacity-70"
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -35, 25, 0],
                y: [0, 30, -20, 0],
                scale: [1, 0.96, 1.06, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`,
        }}
        className="absolute top-1/3 -right-40 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-[#E2C9B8]/25 via-[#C5A059]/12 to-transparent blur-[140px] opacity-60"
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 25, -30, 0],
                y: [0, -20, 25, 0],
                scale: [1, 1.05, 0.95, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-10 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#DFD3C3]/30 via-[#D4AF37]/8 to-transparent blur-[130px] opacity-55"
      />

      {/* 3. Subtle Tactile Noise Texture Overlay (gives physical travertine paper feel) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="atelier-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atelier-noise)" />
      </svg>

      {/* 4. Fine Architectural Hairline Grid Overlay (fade out towards edges) */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(197, 160, 89, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
        }}
      />
    </div>
  )
}

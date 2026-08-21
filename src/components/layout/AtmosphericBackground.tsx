import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'

export const AtmosphericBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  // Spring-damped smooth cursor tracking for ethereal gallery spotlight
  const cursorX = useSpring(0, { stiffness: 45, damping: 20 })
  const cursorY = useSpring(0, { stiffness: 45, damping: 20 })

  useEffect(() => {
    setIsClient(true)
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    // Set initial position to center of viewport
    cursorX.set(window.innerWidth / 2)
    cursorY.set(window.innerHeight / 3)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion, cursorX, cursorY])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Warm Alabaster Canvas */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* 2. Interactive Atelier Cursor Spotlight Beam (Smooth Damped) */}
      {isClient && !shouldReduceMotion && (
        <motion.div
          className="absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full bg-radial-gradient from-[#C5A059]/16 via-[#C5A059]/06 to-transparent blur-[100px] pointer-events-none opacity-80 mix-blend-multiply"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* 3. Floating Ambient Light Mesh Nodes (Champagne Gold, Warm Travertine, Rose Bronze, Soft Stone) */}
      {/* Node A: Top Left Champagne Sunburst */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -35, 25, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-36 left-1/5 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E8C98B]/25 via-[#D4AF37]/12 to-transparent blur-[140px] opacity-75"
      />

      {/* Node B: Right Edge Warm Travertine Glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -45, 30, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.94, 1.08, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-48 w-[850px] h-[850px] rounded-full bg-gradient-to-bl from-[#E2C9B8]/28 via-[#C5A059]/14 to-transparent blur-[150px] opacity-65"
      />

      {/* Node C: Bottom Left Umber & Rose Stone */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 35, -40, 0],
                y: [0, -25, 35, 0],
                scale: [1, 1.06, 0.92, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-5 left-5 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#DFD3C3]/35 via-[#D4AF37]/10 to-transparent blur-[140px] opacity-60"
      />

      {/* Node D: Center Subtle Luminescent Core */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.35, 0.55, 0.35],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-radial-gradient from-[#F0ECE4]/60 via-[#EAE4DC]/20 to-transparent blur-[130px] pointer-events-none"
      />

      {/* 4. Tactile Micro-Noise Texture Overlay (Physical Italian Paper & Travertine Grain) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="atelier-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atelier-noise)" />
      </svg>

      {/* 5. Architectural 48px Hairline Grid Overlay with Radial Vignette Mask */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(197, 160, 89, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 85%)',
        }}
      />
    </div>
  )
}

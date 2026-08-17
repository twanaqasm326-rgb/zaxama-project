import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Plus, Check, Layers, Compass, Sparkles } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { cn } from '../../lib/utils'

export const SignatureMonolith: React.FC = () => {
  const { setInspectedProduct, featuredProducts, products } = useShowroom()
  const { toggleItem, getItemForProduct } = useShoppingBox()
  const shouldReduceMotion = useReducedMotion()

  // Select the signature monolith product dynamically (prefer travertine/stone table or first available featured)
  const monolithProduct =
    featuredProducts.find(p => p.materials?.some(m => m.toLowerCase().includes('travertine') || m.toLowerCase().includes('stone'))) ||
    featuredProducts[1] ||
    products[1]

  const [activeOptionId, setActiveOptionId] = useState<string>(
    monolithProduct?.options?.[0]?.id || ''
  )
  const [isHovered, setIsHovered] = useState(false)

  if (!monolithProduct) return null

  const existingSelection = getItemForProduct(monolithProduct.id)
  const isSelected = Boolean(existingSelection)
  const selectedOption = monolithProduct.options?.find(o => o.id === activeOptionId) || monolithProduct.options?.[0]

  const secondaryImage =
    monolithProduct.galleryImages && monolithProduct.galleryImages.length > 1
      ? monolithProduct.galleryImages[1]
      : null

  // Weighted easing curve for museum-grade reveal
  const easeArchitectural = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="monolith-section"
      className="relative overflow-hidden bg-showroom-obsidian text-stone-100 py-20 lg:py-28 border-t border-b border-stone-800/80"
    >
      {/* Deep Obsidian Atmospheric Spotlight Glow */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-architectural opacity-10 pointer-events-none" />

      {/* Ambient Radial Accent */}
      <div className="absolute -top-40 right-1/4 w-[600px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Marquee Provenance Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
          <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Exhibition Focus: Master Specimen</span>
            <span className="text-stone-700 font-light">•</span>
            <span className="text-stone-400 font-light">Chamber 01</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-stone-400 uppercase">
            <span>Natural Roman Travertine &amp; Hand-Honed Mass</span>
          </div>
        </div>

        {/* Monumental Asymmetrical Grid: 7 Cols Visual + 5 Cols Architectural Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Chamber (7 Cols): Monumental Image Canvas */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, ease: easeArchitectural }}
            className="lg:col-span-7 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Structural Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900/90 border border-stone-800/90 shadow-monolith cursor-pointer">
              
              {/* Primary Image */}
              <img
                src={monolithProduct.mainImage}
                alt={monolithProduct.name}
                className={cn(
                  "w-full h-full object-cover object-center transition-all duration-700 ease-out",
                  secondaryImage && isHovered ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
                )}
                loading="lazy"
                onClick={() => setInspectedProduct(monolithProduct)}
              />

              {/* Secondary Alternate View on Hover */}
              {secondaryImage && (
                <img
                  src={secondaryImage}
                  alt={`${monolithProduct.name} alternate view`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
                    isHovered ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
                  )}
                  loading="lazy"
                  onClick={() => setInspectedProduct(monolithProduct)}
                />
              )}

              {/* Coordinate Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="bg-stone-950/85 backdrop-blur-md text-stone-200 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg border border-stone-800">
                  {monolithProduct.code}
                </span>

                <span className="bg-primary/90 backdrop-blur-md text-stone-950 font-mono text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg">
                  Monolithic Centerpiece
                </span>
              </div>

              {/* Bottom Quick-Action Hover Trigger */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setInspectedProduct(monolithProduct)
                  }}
                  className="pointer-events-auto inline-flex items-center gap-2 bg-stone-100 text-stone-900 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal hover:bg-white transition-colors cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-primary" />
                  <span>Inspect Physical Blueprint</span>
                </button>
              </div>
            </div>

            {/* Faded Ghost Marker Behind */}
            <div className="absolute -bottom-8 -left-6 text-7xl sm:text-9xl font-serif font-bold text-stone-800/15 pointer-events-none select-none -z-10">
              01
            </div>
          </motion.div>

          {/* Right Narrative Chamber (5 Cols): Editorial Story & Blueprint Specs */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, delay: shouldReduceMotion ? 0 : 0.1, ease: easeArchitectural }}
            className="lg:col-span-5 space-y-7"
          >
            {/* Origin & Provenance */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 uppercase tracking-widest pb-3 border-b border-stone-800/80">
              <span className="flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-primary" />
                <span>{monolithProduct.origin || 'Italian Quarry Basin'}</span>
              </span>
              <span className="text-primary font-medium">{monolithProduct.designer}</span>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-3">
              <h2
                onClick={() => setInspectedProduct(monolithProduct)}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-100 tracking-tight leading-[1.08] hover:text-primary transition-colors cursor-pointer"
              >
                {monolithProduct.name}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed font-sans">
                {monolithProduct.tagline || monolithProduct.fullDescription}
              </p>
            </div>

            {/* Physical Characteristics Matrix */}
            <div className="grid grid-cols-2 gap-4 py-2 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block tracking-wider">Dimensions</span>
                <span className="text-stone-200 font-medium">
                  {monolithProduct.dimensions?.width ? `${monolithProduct.dimensions.width} × ${monolithProduct.dimensions.depth}` : 'Bespoke Scale'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block tracking-wider">Weight &amp; Mass</span>
                <span className="text-stone-200 font-medium">
                  {monolithProduct.dimensions?.weight || 'Natural Solid Mass'}
                </span>
              </div>
            </div>

            {/* Material / Finishes Selector */}
            {monolithProduct.options && monolithProduct.options.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400 uppercase tracking-wider">Quarry Selection / Finish:</span>
                  <span className="text-primary font-medium">{selectedOption?.name}</span>
                </div>

                <div className="flex items-center gap-3" role="radiogroup" aria-label="Monolith Quarry Selections">
                  {monolithProduct.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setActiveOptionId(opt.id)}
                      className={cn(
                        "flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer",
                        activeOptionId === opt.id
                          ? "bg-stone-800 border-primary text-stone-100 ring-1 ring-primary"
                          : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                      )}
                      aria-label={`Select ${opt.name}`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-700 inline-block shadow-xs"
                        style={{ backgroundColor: opt.colorHex || '#ccc' }}
                      />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price, Blueprint Inspection & Selection Actions */}
            <div className="pt-5 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Estimated Atelier Value
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-stone-100">
                    ${monolithProduct.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-stone-400">USD</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInspectedProduct(monolithProduct)}
                  className="inline-flex items-center gap-2 border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 px-5 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-sm"
                  aria-label={`Inspect blueprint for ${monolithProduct.name}`}
                >
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>Inspect Blueprint</span>
                </button>

                <button
                  onClick={() => toggleItem(monolithProduct, selectedOption)}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-md",
                    isSelected
                      ? "bg-primary text-stone-950 hover:bg-primary/90"
                      : "bg-stone-100 text-stone-900 hover:bg-white"
                  )}
                  aria-label={isSelected ? `Remove ${monolithProduct.name} from selection` : `Add ${monolithProduct.name} to showroom selection`}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>In Selection</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5 text-primary" />
                      <span>Curate Piece</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

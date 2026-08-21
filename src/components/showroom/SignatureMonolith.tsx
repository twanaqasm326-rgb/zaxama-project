import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Plus, Check, Layers, Sparkles } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { cn } from '../../lib/utils'

export const SignatureMonolith: React.FC = () => {
  const { setInspectedProduct, featuredProducts, products } = useShowroom()
  const { toggleItem, getItemForProduct } = useShoppingBox()
  const shouldReduceMotion = useReducedMotion()

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

  const easeArchitectural = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="monolith-section"
      className="relative overflow-hidden bg-showroom-obsidian text-stone-100 py-20 lg:py-28 border-t border-b border-stone-800/80"
    >
      {/* Deep Obsidian Atmospheric Spotlight Glow */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-75 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      {/* Ambient Accent Radial */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        
        {/* Section Provenance Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800">
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

        {/* 7 Cols Visual + 5 Cols Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Chamber (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeArchitectural }}
            className="lg:col-span-7 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-monolith cursor-pointer">
              
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
                  alt={`${monolithProduct.name} alternate angle`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
                    isHovered ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
                  )}
                  loading="lazy"
                  onClick={() => setInspectedProduct(monolithProduct)}
                />
              )}

              {/* Monolith Coordinates Tag */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono uppercase tracking-widest text-stone-200">
                {monolithProduct.code} • Chamber Specimen
              </div>

              {/* Quarry Origin Tag */}
              <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/30 text-[10px] font-mono uppercase tracking-widest text-primary font-medium">
                {monolithProduct.origin}
              </div>

              {/* Hover Inspection Button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <button
                  onClick={() => setInspectedProduct(monolithProduct)}
                  className="inline-flex items-center gap-2 bg-stone-100 text-stone-900 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal pointer-events-auto cursor-pointer hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0"
                >
                  <Eye className="h-4 w-4 text-primary" />
                  <span>Inspect Physical Blueprint</span>
                </button>
              </div>

              {/* Crossfade Angle Hint Indicator */}
              {secondaryImage && (
                <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-stone-400 border border-white/10">
                  {isHovered ? 'Angle II / Gallery' : 'Hover for Detail'}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column (5 Cols): Architectural Narrative */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: 0.1, ease: easeArchitectural }}
            className="lg:col-span-5 space-y-7"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary block">
                {monolithProduct.designer || 'Atelier Master Series'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
                {monolithProduct.name}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed font-sans">
                {monolithProduct.fullDescription || monolithProduct.shortDescription}
              </p>
            </div>

            {/* Dimensional Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-stone-800 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Dimensions</span>
                <span className="text-stone-100 font-medium">{monolithProduct.dimensions?.width} × {monolithProduct.dimensions?.depth}</span>
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Physical Mass</span>
                <span className="text-stone-100 font-medium">{monolithProduct.dimensions?.weight || '115 kg (Solid Stone)'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Primary Quarry</span>
                <span className="text-stone-100 font-medium">Tivoli Basins, Italy</span>
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Lead Time</span>
                <span className="text-stone-100 font-medium">{monolithProduct.leadTime || '4 - 6 Weeks'}</span>
              </div>
            </div>

            {/* Quarry Stone Swatches & Actions */}
            <div className="space-y-4">
              {monolithProduct.options && monolithProduct.options.length > 0 && (
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-stone-400 uppercase text-[11px]">Stone Selection:</span>
                  <div className="flex items-center gap-2">
                    {monolithProduct.options.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setActiveOptionId(opt.id)}
                        className={cn(
                          "px-3 py-1 rounded-md text-[11px] border transition-all cursor-pointer",
                          activeOptionId === opt.id
                            ? "bg-primary/20 border-primary text-primary font-semibold"
                            : "border-stone-700 text-stone-300 hover:border-stone-500"
                        )}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Curate Action */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">Valuation</span>
                  <span className="font-mono text-2xl font-semibold text-white">
                    ${monolithProduct.price.toLocaleString()}{' '}
                    <span className="text-xs text-stone-400 font-normal">USD</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInspectedProduct(monolithProduct)}
                    className="p-3.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 transition-colors cursor-pointer"
                    title="Full Specifications"
                  >
                    <Layers className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => toggleItem(monolithProduct, selectedOption)}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer active:scale-95",
                      isSelected
                        ? "bg-stone-800 text-white border border-primary/50"
                        : "bg-primary text-primary-foreground hover:brightness-110 shadow-glow"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 text-primary" />
                        <span>In Selection Box</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Curate Piece</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

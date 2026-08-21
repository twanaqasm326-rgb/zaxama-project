import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Plus, Check, Sparkles, Layers } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { cn } from '../../lib/utils'

export const FeaturedSpotlight: React.FC = () => {
  const { setInspectedProduct, featuredProducts, products } = useShowroom()
  const { toggleItem, getItemForProduct } = useShoppingBox()
  const shouldReduceMotion = useReducedMotion()

  const spotlightA = products.find(p => p.id === 'fd-din-04') || featuredProducts[0] || products[0]
  const spotlightB = products.find(p => p.id === 'fd-lit-03') || products.find(p => p.category === 'lighting') || products[2]

  const [hoveredA, setHoveredA] = useState(false)
  const [hoveredB, setHoveredB] = useState(false)

  if (!spotlightA || !spotlightB) return null

  const isSelectedA = Boolean(getItemForProduct(spotlightA.id))
  const isSelectedB = Boolean(getItemForProduct(spotlightB.id))

  const secondaryImageA = spotlightA.galleryImages?.[1] || null
  const secondaryImageB = spotlightB.galleryImages?.[1] || null

  const easeArchitectural = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="spotlight-section"
      className="relative overflow-hidden bg-atmosphere-linen py-20 lg:py-28 border-b border-showroom-hairline"
    >
      {/* Subtle Hairline Grid Layer */}
      <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

      <div className="relative w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-28 space-y-14">
        
        {/* Curated Dialogue Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-showroom-hairline">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-card/80 border border-showroom-hairline text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Curated Dialogue • Chamber 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
              Old-Growth Timber &amp; <span className="italic font-light text-primary">Luminous Brass</span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-md leading-relaxed font-sans">
            A deliberate architectural pairing celebrating contrasting physical densities: monolithic hand-joined walnut juxtaposed with precision-turned raw brass lighting.
          </p>
        </div>

        {/* Asymmetric 7 / 5 Editorial Dialogue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Spotlight A (7 Columns): Dominant Walnut Dining Table */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, ease: easeArchitectural }}
            className="lg:col-span-7 bg-card border border-showroom-hairline rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-pedestal transition-all duration-500 flex flex-col justify-between space-y-7 group"
            onMouseEnter={() => setHoveredA(true)}
            onMouseLeave={() => setHoveredA(false)}
          >
            <div className="space-y-6">
              
              {/* Image Frame with Secondary Angle Crossfade */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-200/50 cursor-pointer"
                onClick={() => setInspectedProduct(spotlightA)}
              >
                <img
                  src={spotlightA.mainImage}
                  alt={spotlightA.name}
                  className={cn(
                    "w-full h-full object-cover object-center transition-all duration-700 ease-out",
                    secondaryImageA && hoveredA ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
                  )}
                  loading="lazy"
                />

                {secondaryImageA && (
                  <img
                    src={secondaryImageA}
                    alt={`${spotlightA.name} alternate view`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
                      hoveredA ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
                    )}
                    loading="lazy"
                  />
                )}

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-foreground/90 backdrop-blur-md text-background text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-md">
                    {spotlightA.code}
                  </span>
                  <span className="bg-card/90 backdrop-blur-md text-primary text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border border-border">
                    {spotlightA.origin}
                  </span>
                </div>

                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 bg-card/95 text-foreground px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>Inspect Piece</span>
                  </span>
                </div>
              </div>

              {/* Title & Narrative */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary block">
                  {spotlightA.designer || 'Atelier Series'}
                </span>
                <h3
                  onClick={() => setInspectedProduct(spotlightA)}
                  className="font-serif text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors cursor-pointer"
                >
                  {spotlightA.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {spotlightA.shortDescription}
                </p>
              </div>

              {/* Materials & Dimensions Specs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-showroom-hairline text-xs font-mono">
                <div>
                  <span className="text-muted-foreground text-[10px] uppercase block">Material</span>
                  <span className="text-foreground font-medium">{spotlightA.materials?.[0] || 'Solid American Walnut'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] uppercase block">Dimensions</span>
                  <span className="text-foreground font-medium">{spotlightA.dimensions?.width} × {spotlightA.dimensions?.depth}</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions & Price */}
            <div className="pt-4 border-t border-showroom-hairline flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Estimated Valuation</span>
                <span className="font-mono text-xl font-semibold text-foreground">
                  ${spotlightA.price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">USD</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setInspectedProduct(spotlightA)}
                  className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer"
                  title="View Details"
                >
                  <Layers className="h-4 w-4" />
                </button>

                <button
                  onClick={() => toggleItem(spotlightA)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer active:scale-95",
                    isSelectedA
                      ? "bg-secondary text-foreground border border-primary/40"
                      : "bg-foreground text-background hover:bg-stone-800 shadow-xs"
                  )}
                >
                  {isSelectedA ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span>In Box</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Curate</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </motion.div>

          {/* Spotlight B (5 Columns): Spun Brass Pendant Luminaire */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, delay: 0.1, ease: easeArchitectural }}
            className="lg:col-span-5 bg-card border border-showroom-hairline rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-pedestal transition-all duration-500 flex flex-col justify-between space-y-7 group"
            onMouseEnter={() => setHoveredB(true)}
            onMouseLeave={() => setHoveredB(false)}
          >
            <div className="space-y-6">
              
              {/* Image Frame */}
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200/50 cursor-pointer"
                onClick={() => setInspectedProduct(spotlightB)}
              >
                <img
                  src={spotlightB.mainImage}
                  alt={spotlightB.name}
                  className={cn(
                    "w-full h-full object-cover object-center transition-all duration-700 ease-out",
                    secondaryImageB && hoveredB ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
                  )}
                  loading="lazy"
                />

                {secondaryImageB && (
                  <img
                    src={secondaryImageB}
                    alt={`${spotlightB.name} alternate view`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
                      hoveredB ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
                    )}
                    loading="lazy"
                  />
                )}

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-foreground/90 backdrop-blur-md text-background text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-md">
                    {spotlightB.code}
                  </span>
                  <span className="bg-card/90 backdrop-blur-md text-primary text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border border-border">
                    {spotlightB.origin}
                  </span>
                </div>

                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 bg-card/95 text-foreground px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>Inspect Piece</span>
                  </span>
                </div>
              </div>

              {/* Title & Narrative */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary block">
                  {spotlightB.designer || 'Atelier Series'}
                </span>
                <h3
                  onClick={() => setInspectedProduct(spotlightB)}
                  className="font-serif text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors cursor-pointer"
                >
                  {spotlightB.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {spotlightB.shortDescription}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-showroom-hairline text-xs font-mono">
                <div>
                  <span className="text-muted-foreground text-[10px] uppercase block">Material</span>
                  <span className="text-foreground font-medium">Spun Satin Brass</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] uppercase block">Light Source</span>
                  <span className="text-foreground font-medium">2700K Warm LED Halo</span>
                </div>
              </div>

            </div>

            {/* Actions & Price */}
            <div className="pt-4 border-t border-showroom-hairline flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Estimated Valuation</span>
                <span className="font-mono text-xl font-semibold text-foreground">
                  ${spotlightB.price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">USD</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setInspectedProduct(spotlightB)}
                  className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer"
                  title="View Details"
                >
                  <Layers className="h-4 w-4" />
                </button>

                <button
                  onClick={() => toggleItem(spotlightB)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer active:scale-95",
                    isSelectedB
                      ? "bg-secondary text-foreground border border-primary/40"
                      : "bg-foreground text-background hover:bg-stone-800 shadow-xs"
                  )}
                >
                  {isSelectedB ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span>In Box</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Curate</span>
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

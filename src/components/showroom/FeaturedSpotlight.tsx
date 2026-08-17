import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { cn } from '../../lib/utils'

export const FeaturedSpotlight: React.FC = () => {
  const { setInspectedProduct, featuredProducts, products } = useShowroom()
  const { toggleItem, getItemForProduct } = useShoppingBox()
  const shouldReduceMotion = useReducedMotion()

  // Select two contrasting curated products for the editorial dialogue
  // (Form & Timber: Solid Walnut Dining Table ↔ Luminous Brass: Aura Pendant Luminaire)
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
      <div className="absolute inset-0 bg-grid-architectural opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Curated Dialogue Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-showroom-hairline">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-card/80 border border-showroom-hairline text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Curated Dialogue • Chamber 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
              Form, Timber &amp; <span className="italic font-light text-primary">Luminous Brass</span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-md leading-relaxed font-sans">
            A deliberate architectural pairing celebrating contrasting physical densities: old-growth timber joinery juxtaposed with precision-turned raw brass.
          </p>
        </div>

        {/* Asymmetric 7 / 5 Editorial Dialogue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Spotlight A (7 Columns): Dominant Timber / Form Centerpiece */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: easeArchitectural }}
            className="lg:col-span-7 bg-card border border-showroom-hairline rounded-3xl p-6 sm:p-9 shadow-subtle hover:shadow-card transition-all duration-500 flex flex-col justify-between space-y-8 group"
            onMouseEnter={() => setHoveredA(true)}
            onMouseLeave={() => setHoveredA(false)}
          >
            <div className="space-y-6">
              
              {/* Image Frame with Secondary Angle Crossfade */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100/80 cursor-pointer"
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

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-stone-900/90 backdrop-blur-md text-stone-100 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                    {spotlightA.category} • Curated 01
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-md text-foreground font-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-border shadow-sm">
                  ${spotlightA.price.toLocaleString()} USD
                </div>

                {/* Inspect Blueprint Hover Layer */}
                <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 bg-card/95 text-foreground px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal pointer-events-auto cursor-pointer">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>Inspect Blueprint</span>
                  </span>
                </div>
              </div>

              {/* Product Narrative & Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <span>{spotlightA.origin || 'Master Workshop'}</span>
                  {spotlightA.designer && (
                    <span className="text-primary font-medium">{spotlightA.designer}</span>
                  )}
                </div>

                <h3
                  onClick={() => setInspectedProduct(spotlightA)}
                  className="font-serif text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors cursor-pointer tracking-tight"
                >
                  {spotlightA.name}
                </h3>

                <p className="text-sm text-muted-foreground font-light leading-relaxed font-sans">
                  {spotlightA.tagline || spotlightA.shortDescription}
                </p>
              </div>

              {/* Material Story Badges */}
              {spotlightA.materials && spotlightA.materials.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {spotlightA.materials.slice(0, 3).map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-showroom-stone/60 text-foreground/90 px-3 py-1 rounded-lg border border-showroom-hairline"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-showroom-hairline flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-muted-foreground">
                {spotlightA.leadTime ? `Lead Time: ${spotlightA.leadTime}` : spotlightA.code}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleItem(spotlightA)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer",
                    isSelectedA
                      ? "bg-stone-900 text-stone-100"
                      : "bg-secondary text-foreground hover:bg-stone-200 border border-border"
                  )}
                >
                  {isSelectedA ? 'Selected ✓' : '+ Select'}
                </button>

                <button
                  onClick={() => setInspectedProduct(spotlightA)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary font-semibold transition-colors cursor-pointer"
                >
                  <span>Inspect Spec</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Spotlight B (5 Columns): Complementary Luminaire / Spatial Accent */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: shouldReduceMotion ? 0 : 0.1, ease: easeArchitectural }}
            className="lg:col-span-5 bg-card border border-showroom-hairline rounded-3xl p-6 sm:p-9 shadow-subtle hover:shadow-card transition-all duration-500 flex flex-col justify-between space-y-8 group"
            onMouseEnter={() => setHoveredB(true)}
            onMouseLeave={() => setHoveredB(false)}
          >
            <div className="space-y-6">
              
              {/* Image Frame with Secondary Angle Crossfade */}
              <div
                className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100/80 cursor-pointer"
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

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-stone-900/90 backdrop-blur-md text-stone-100 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
                    {spotlightB.category} • Curated 02
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-md text-foreground font-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-border shadow-sm">
                  ${spotlightB.price.toLocaleString()} USD
                </div>

                {/* Inspect Blueprint Hover Layer */}
                <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 bg-card/95 text-foreground px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal pointer-events-auto cursor-pointer">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>Inspect Blueprint</span>
                  </span>
                </div>
              </div>

              {/* Product Narrative & Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <span>{spotlightB.origin || 'Nordic Studio'}</span>
                  {spotlightB.designer && (
                    <span className="text-primary font-medium">{spotlightB.designer}</span>
                  )}
                </div>

                <h3
                  onClick={() => setInspectedProduct(spotlightB)}
                  className="font-serif text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors cursor-pointer tracking-tight"
                >
                  {spotlightB.name}
                </h3>

                <p className="text-sm text-muted-foreground font-light leading-relaxed font-sans">
                  {spotlightB.tagline || spotlightB.shortDescription}
                </p>
              </div>

              {/* Material Story Badges */}
              {spotlightB.materials && spotlightB.materials.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {spotlightB.materials.slice(0, 2).map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-showroom-stone/60 text-foreground/90 px-3 py-1 rounded-lg border border-showroom-hairline"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-showroom-hairline flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-muted-foreground">
                {spotlightB.leadTime ? `Lead Time: ${spotlightB.leadTime}` : spotlightB.code}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleItem(spotlightB)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer",
                    isSelectedB
                      ? "bg-stone-900 text-stone-100"
                      : "bg-secondary text-foreground hover:bg-stone-200 border border-border"
                  )}
                >
                  {isSelectedB ? 'Selected ✓' : '+ Select'}
                </button>

                <button
                  onClick={() => setInspectedProduct(spotlightB)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary font-semibold transition-colors cursor-pointer"
                >
                  <span>Inspect Spec</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

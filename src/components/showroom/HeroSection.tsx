import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Compass, Eye, Sparkles, Layers } from 'lucide-react'
import { useShowroom } from '../../context/ShowroomContext'
import { SHOWROOM_PRODUCTS } from '../../data/products'
import { cn } from '../../lib/utils'

export const HeroSection: React.FC = () => {
  const { setInspectedProduct, setSelectedCategory } = useShowroom()
  const shouldReduceMotion = useReducedMotion()

  // Select iconic signature pieces for the hero exhibition
  const signatureProduct = SHOWROOM_PRODUCTS.find(p => p.id === 'fd-liv-01') || SHOWROOM_PRODUCTS[0]
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    signatureProduct.options?.[0]?.id || ''
  )

  const handleExploreClick = (categoryId?: string) => {
    if (categoryId) {
      setSelectedCategory(categoryId)
    }
    const catalog = document.getElementById('catalog-section')
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants with weighted, architectural easing
  const easeOutEditorial = [0.16, 1, 0.3, 1] as const

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }

  const itemFadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: easeOutEditorial,
      },
    },
  }

  const imageRevealVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: easeOutEditorial,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-atmosphere-light border-b border-border/80 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Architectural Texture & Ambient Radial Luminance */}
      <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial-ambient pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10 lg:space-y-14"
        >
          {/* 1. Exhibition Provenance Header Bar */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-showroom-hairline/80"
          >
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>2026 Permanent Collection</span>
              <span className="text-border font-light">•</span>
              <span className="text-muted-foreground font-light">Atelier Vol. IV</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-muted-foreground uppercase">
              <span className="hidden md:inline-block">Florence & Milan Design Studios</span>
              <span className="text-border hidden md:inline-block">•</span>
              <span className="text-primary font-medium">Digital Showroom</span>
            </div>
          </motion.div>

          {/* 2. Main Architectural Stage: The Monolith & The Word */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col (7 Cols): Editorial Statement & Discovery Pathways */}
            <motion.div variants={itemFadeUp} className="lg:col-span-7 space-y-8">
              
              {/* Category Subtitle */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-showroom-stone/60 border border-showroom-hairline text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Architectural Form & Material Truth</span>
              </div>

              {/* Monumental Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-foreground tracking-tight leading-[1.04] editorial-title">
                  The Architecture of Living &amp;{' '}
                  <span className="italic font-light text-primary tracking-normal">Pure Materiality.</span>
                </h1>
                
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl font-sans">
                  A curated digital showroom dedicated to sculptural mass, Roman travertine, old-growth walnut, and calibrated architectural lighting. Curate your bespoke selection and export high-precision specification sheets.
                </p>
              </div>

              {/* Primary Showroom Action & Fast Pathways */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => handleExploreClick()}
                  className="inline-flex items-center justify-center gap-3 bg-foreground text-background hover:bg-stone-800 px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer group"
                  aria-label="Explore the permanent collection"
                >
                  <span>Explore Permanent Collection</span>
                  <ArrowDownRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => handleExploreClick('living')}
                  className="inline-flex items-center justify-center gap-2 border border-border bg-card/90 hover:bg-showroom-travertine text-foreground px-6 py-4 rounded-xl text-xs font-mono uppercase tracking-[0.16em] font-medium transition-colors shadow-subtle cursor-pointer"
                >
                  <span>Living Monoliths</span>
                </button>
              </div>

              {/* Curated Category Jump Links */}
              <div className="pt-6 border-t border-showroom-hairline/80 space-y-2.5">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                  <Compass className="h-3 w-3 text-primary" />
                  <span>Curated Discovery Streams</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {[
                    { label: 'Architectural Lighting', id: 'lighting' },
                    { label: 'Monolithic Tables', id: 'living' },
                    { label: 'Bespoke Seating', id: 'living' },
                    { label: 'Craft Vessels', id: 'objects' },
                  ].map((stream, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExploreClick(stream.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-card hover:bg-showroom-travertine border border-border text-foreground/80 hover:text-foreground transition-colors cursor-pointer shadow-xs"
                    >
                      {stream.label} →
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Right Col (5 Cols): Sculptural Integrated Specimen Staging */}
            <motion.div variants={imageRevealVariants} className="lg:col-span-5">
              <div className="relative group">
                
                {/* Ambient Glow Pedestal */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary/15 via-transparent to-showroom-stone/40 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Main Architectural Staging Frame */}
                <div className="relative bg-card border border-showroom-hairline rounded-2xl p-6 shadow-pedestal group-hover:shadow-card transition-all duration-500 overflow-hidden">
                  
                  {/* Top Specimen Coordinates */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-showroom-hairline text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span className="text-foreground font-medium">Specimen [01 / 12]</span>
                    </div>
                    <span className="text-primary font-medium">{signatureProduct.origin}</span>
                  </div>

                  {/* Object Visual Frame */}
                  <div
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100/80 cursor-pointer group/img"
                    onClick={() => setInspectedProduct(signatureProduct)}
                  >
                    <img
                      src={signatureProduct.mainImage}
                      alt={signatureProduct.name}
                      className="w-full h-full object-cover object-center group-hover/img:scale-103 transition-transform duration-700 ease-out"
                      loading="eager"
                    />

                    {/* Integrated Monolith Overlay Badges */}
                    <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-stone-100 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                      Signature Piece
                    </div>

                    <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-md text-foreground text-[10px] font-mono font-medium px-2.5 py-1 rounded-md border border-border shadow-sm">
                      {signatureProduct.code}
                    </div>

                    {/* Interactive Inspect Hover Trigger */}
                    <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-2 bg-card/95 text-foreground px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-modal pointer-events-auto cursor-pointer">
                        <Eye className="h-3.5 w-3.5 text-primary" />
                        <span>Inspect Blueprint</span>
                      </span>
                    </div>
                  </div>

                  {/* Specimen Information & Finish Selector */}
                  <div className="pt-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-primary block">
                          {signatureProduct.designer || 'Atelier Permanent Series'}
                        </span>
                        <h3
                          onClick={() => setInspectedProduct(signatureProduct)}
                          className="font-serif text-2xl font-normal text-foreground group-hover:text-primary transition-colors cursor-pointer mt-0.5"
                        >
                          {signatureProduct.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-lg font-semibold text-foreground block">
                          ${signatureProduct.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                          {signatureProduct.currency}
                        </span>
                      </div>
                    </div>

                    {/* Material Options Preview Swatches */}
                    {signatureProduct.options && signatureProduct.options.length > 0 && (
                      <div className="pt-2 flex items-center justify-between border-t border-showroom-hairline/80 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-muted-foreground uppercase">
                            Finishes:
                          </span>
                          <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Available finishes">
                            {signatureProduct.options.map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => setSelectedOptionId(opt.id)}
                                className={cn(
                                  "w-4 h-4 rounded-full border shadow-xs transition-all cursor-pointer",
                                  selectedOptionId === opt.id
                                    ? "ring-2 ring-primary ring-offset-2 scale-110 border-primary"
                                    : "border-border hover:scale-105"
                                )}
                                style={{ backgroundColor: opt.colorHex || '#ccc' }}
                                title={opt.name}
                                aria-label={`Select finish: ${opt.name}`}
                              />
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setInspectedProduct(signatureProduct)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary font-semibold transition-colors cursor-pointer"
                        >
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          <span>Full Specs →</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  )
}

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Eye, Sparkles } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'
import { BrandLogo } from '../ui/BrandLogo'
import { SHOWROOM_PRODUCTS } from '../../data/products'
import { useShowroom } from '../../context/ShowroomContext'

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const { setInspectedProduct } = useShowroom()

  const signatureProduct = SHOWROOM_PRODUCTS.find(p => p.id === 'fd-tab-02') || SHOWROOM_PRODUCTS[0]

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-8 sm:space-y-10">
        
        {/* Top Brand Wordmark & Provenance Ribbon with Soft Center-Lit Hairline */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
          className="relative pb-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.24em] uppercase bg-gradient-to-r from-foreground via-stone-800 to-primary bg-clip-text text-transparent inline-block">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                Showroom Atelier
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>Riyadh, KSA</span>
              <span className="text-primary/60">•</span>
              <span>Est. {BRAND_CONFIG.year}</span>
              <span className="text-primary/60">•</span>
              <span className="text-primary font-semibold">Direct Atelier Provenance</span>
            </div>
          </div>

          {/* Soft Gradient Hairline (No harsh cut) */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        </motion.div>

        {/* 2-Column Balanced Showcase Grid (7 Cols Left / 5 Cols Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Bold Monumental Headline, Narrative, Discovery Actions & Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7 text-left"
          >
            {/* Shimmer Announcement Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/85 border border-primary/30 backdrop-blur-md shadow-subtle shimmer-badge">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary font-semibold">
                Chamber 01 • Atelier Arrival &amp; Specimen
              </span>
            </div>

            {/* Expansive Headline with Editorial Flow (No Trailing Period) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-foreground tracking-tight leading-[1.04] editorial-title">
              Timeless Form &amp;{' '}
              <span className="italic font-light bg-gradient-to-r from-primary via-[#D4AF37] to-[#A37F3C] bg-clip-text text-transparent tracking-normal">
                Living Stone
              </span>
            </h1>

            {/* Curated Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-light leading-relaxed font-sans max-w-2xl">
              Handcrafted Roman travertine monoliths, solid old-growth hardwoods, and sculptural spun bronze objects curated for elevated residential and hospitality architecture.
            </p>

            {/* Primary Discovery CTA Action */}
            <div className="pt-1">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground text-background hover:bg-stone-800 border border-primary/40 text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all shadow-md hover:shadow-pedestal-glow hover:border-primary active:scale-97 cursor-pointer group"
              >
                <span>Enter Permanent Collection</span>
                <ArrowDown className="h-3.5 w-3.5 text-primary group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* 3 Enriched Architectural Curation Metric Plinths */}
            <div className="relative pt-6">
              {/* Soft Gradient Separator */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
              
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4">
                <div className="space-y-1.5 p-4 rounded-2xl bg-card/75 border border-white/80 dark:border-stone-800 backdrop-blur-md shadow-subtle hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl sm:text-3xl font-normal bg-gradient-to-br from-foreground to-stone-700 bg-clip-text text-transparent">
                      06
                    </span>
                    <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-wider">
                      Vol. IV
                    </span>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Curated Chambers
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-card/75 border border-white/80 dark:border-stone-800 backdrop-blur-md shadow-subtle hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl sm:text-3xl font-normal bg-gradient-to-br from-foreground to-stone-700 bg-clip-text text-transparent">
                      100%
                    </span>
                    <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-wider">
                      Tivoli
                    </span>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Roman Travertine
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-card/75 border border-white/80 dark:border-stone-800 backdrop-blur-md shadow-subtle hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl sm:text-3xl font-normal bg-gradient-to-br from-foreground to-stone-700 bg-clip-text text-transparent">
                      Bespoke
                    </span>
                    <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-wider">
                      Custom
                    </span>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Numbered Specimen
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent Signature Spotlight Pedestal Plinth Card */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="relative group w-full">
              {/* Ambient Golden Radial Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/25 via-[#D4AF37]/15 to-transparent rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* The Architectural Vitrine Plinth Card */}
              <div className="relative bg-card/85 backdrop-blur-xl border border-white/80 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-pedestal-glow hover:border-primary/60 transition-all duration-500 space-y-5">
                
                {/* Header with Emblem & Signature Tag */}
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-secondary/80 border border-border/80 shadow-2xs">
                      <BrandLogo size="sm" showText={false} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground font-semibold">
                        Master Specimen
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {signatureProduct.code} • [01 / 12]
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25">
                    Tivoli Navona
                  </span>
                </div>

                {/* Highlight Product Image Preview on Warm Plinth */}
                <div
                  onClick={() => setInspectedProduct(signatureProduct)}
                  className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200/50 border border-border/70 group/img cursor-pointer shadow-inner"
                >
                  <img
                    src={signatureProduct.mainImage}
                    alt={signatureProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white font-mono uppercase tracking-wider font-medium">
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      Inspect Blueprint Specification
                    </span>
                  </div>
                </div>

                {/* Piece Details & Quick Inspect CTA */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="space-y-0.5 text-left">
                    <h4 className="font-serif text-lg font-normal text-foreground leading-tight">
                      {signatureProduct.name}
                    </h4>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      ${signatureProduct.price.toLocaleString()} USD • Hand-Honed in Italy
                    </p>
                  </div>

                  <button
                    onClick={() => setInspectedProduct(signatureProduct)}
                    className="p-3 rounded-full bg-foreground text-background hover:bg-stone-800 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
                    aria-label={`Inspect ${signatureProduct.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4 text-primary" />
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

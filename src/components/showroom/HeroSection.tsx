import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'
import { BrandLogo } from '../ui/BrandLogo'
import { SHOWROOM_PRODUCTS } from '../../data/products'
import { useShowroom } from '../../context/ShowroomContext'

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const { setInspectedProduct } = useShowroom()

  const signatureProduct = SHOWROOM_PRODUCTS.find(p => p.id === 'fd-tab-02') || SHOWROOM_PRODUCTS[0]

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-18">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Top-Left Eye-Catching Brand Wordmark & Provenance Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.24em] uppercase bg-gradient-to-r from-foreground via-stone-800 to-primary bg-clip-text text-transparent inline-block">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary font-medium">
              Showroom Atelier
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>Riyadh, KSA</span>
            <span>•</span>
            <span>Est. {BRAND_CONFIG.year}</span>
            <span>•</span>
            <span className="text-primary font-semibold">Authentic Sourced</span>
          </div>
        </motion.div>

        {/* 2-Column Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Grand Editorial Headline, Curated Subtitle & Metric Badges */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-foreground tracking-tight leading-[1.08] editorial-title">
              Timeless Form &amp;{' '}
              <span className="italic font-light text-primary tracking-normal">Living Stone.</span>
            </h1>

            {/* Curated Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl font-sans">
              Handcrafted Roman travertine monoliths, solid hardwoods, and sculptural bronze objects curated for elevated residential and hospitality spaces.
            </p>

            {/* 3 Architectural Curation Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/60">
              <div className="space-y-1">
                <span className="font-serif text-xl sm:text-2xl font-normal text-foreground">06</span>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Curated Categories
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-xl sm:text-2xl font-normal text-foreground">100%</span>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Authentic Travertine
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-xl sm:text-2xl font-normal text-foreground">Bespoke</span>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Made To Order
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Spotlight Pedestal Card */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative group w-full max-w-md">
              {/* Ambient Golden Radial Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* The Signature Card */}
              <div className="relative bg-card/90 backdrop-blur-md border border-border rounded-3xl p-6 sm:p-7 shadow-card hover:shadow-[0_20px_45px_-12px_rgba(197,160,89,0.2)] hover:border-primary/50 transition-all duration-500 space-y-5">
                
                {/* Header with Emblem & Signature Tag */}
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-secondary/60 border border-border/80">
                      <BrandLogo size="sm" showText={false} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground font-semibold">
                      Signature Piece
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-primary font-bold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Tivoli Stone
                  </span>
                </div>

                {/* Highlight Product Image Preview */}
                <div
                  onClick={() => setInspectedProduct(signatureProduct)}
                  className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200/40 border border-border/70 group/img cursor-pointer"
                >
                  <img
                    src={signatureProduct.mainImage}
                    alt={signatureProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white font-mono uppercase tracking-wider">
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      Inspect Specification
                    </span>
                  </div>
                </div>

                {/* Piece Details & Quick Inspect CTA */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="space-y-0.5 text-left">
                    <h4 className="font-serif text-base font-normal text-foreground leading-tight">
                      {signatureProduct.name}
                    </h4>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      ${signatureProduct.price.toLocaleString()} USD • Made in Italy
                    </p>
                  </div>

                  <button
                    onClick={() => setInspectedProduct(signatureProduct)}
                    className="p-2.5 rounded-full bg-foreground text-background hover:bg-stone-800 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0"
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

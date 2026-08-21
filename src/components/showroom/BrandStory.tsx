import React from 'react'
import { ArrowUpRight, Sparkles, Gem, Hammer, Shield, Calendar } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'

export const BrandStory: React.FC = () => {
  return (
    <section id="story-section" className="relative overflow-hidden py-16 sm:py-24 border-t border-border/50 bg-card/30">
      {/* Soft Top Ambient Gradient Veil to Blend Seamlessly from Chamber 02 */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-80 h-10 bg-primary/10 blur-2xl pointer-events-none" />

      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-12 sm:space-y-16">
        
        {/* Chamber 03 Entrance Header */}
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border/80 text-[10px] font-mono uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Chamber 03 • Architectural Materiality &amp; Provenance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
            Craftsmanship Rooted in Permanence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed font-sans">
            We believe an object’s value lives in honest materiality and the human touch of master stonemasons, woodturners, and metalsmiths. Every piece in our permanent collection is engineered to age with authentic character over generations.
          </p>
        </div>

        {/* 3 Materiality Vitrine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1: Natural Roman Stone */}
          <div className="bg-card/80 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-7 sm:p-8 shadow-subtle hover:shadow-pedestal-glow hover:border-primary/50 transition-all duration-500 space-y-4 group text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
                <Gem className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                Geological Roman Travertine
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                Quarried in historic Italian basins, each slab of Navona and Silver travertine is selected for its mineral density, organic veining, and tactile warmth before waterjet precision honing.
              </p>
            </div>

            {/* Technical Specification Chips */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">Density: 2.48 g/cm³</span>
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">Tivoli Basin</span>
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">Navona Matte</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Old-Growth Hardwoods */}
          <div className="bg-card/80 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-7 sm:p-8 shadow-subtle hover:shadow-pedestal-glow hover:border-primary/50 transition-all duration-500 space-y-4 group text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
                <Hammer className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                Air-Dried Solid Hardwoods
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                FSC-certified American black walnut and European white oak, air-dried over 18 months to achieve exceptional stability. Joined using concealed mortise-and-tenon craftsmanship.
              </p>
            </div>

            {/* Technical Specification Chips */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">Moisture: 8% Cured</span>
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">Mortise &amp; Tenon</span>
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">FSC-Grade A</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Living Brass & Bronze */}
          <div className="bg-card/80 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-7 sm:p-8 shadow-subtle hover:shadow-pedestal-glow hover:border-primary/50 transition-all duration-500 space-y-4 group text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                Living Spun Brass &amp; Bronze
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                Spun solid brass discs and collectible bronze vessels finished with proprietary hot-wax patinas that evolve an authentic golden luster with age and touch.
              </p>
            </div>

            {/* Technical Specification Chips */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">CuSn8 Cast Bronze</span>
                <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-medium">Spun Solid Brass</span>
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">Hot-Wax Patina</span>
              </div>
            </div>
          </div>

        </div>

        {/* Private Showroom Consultation Card with Dual-Action CTA */}
        <div className="relative overflow-hidden bg-card/85 backdrop-blur-xl border border-white/80 dark:border-stone-800 rounded-3xl p-8 sm:p-12 shadow-pedestal-glow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-[10px] font-mono uppercase tracking-widest font-semibold">
              <Calendar className="h-3 w-3" />
              <span>Private Atelier Consultations</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Experience the physical materials firsthand at our Riyadh showroom atelier.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              Consultations include tactile mineral stone inspections, blueprint scale drawings, and custom project specification reviews with our architectural curation team.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 w-full lg:w-auto">
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}?subject=Showroom%20Atelier%20Consultation%20Inquiry`}
              className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background hover:bg-stone-800 border border-primary/30 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-97"
            >
              <span>Book Showroom Visit</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
            </a>

            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Fakhama Decor Atelier, I would like to inquire about a private showroom consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary/80 hover:bg-secondary border border-border/80 text-foreground hover:text-primary px-5 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-medium transition-all cursor-pointer shadow-xs active:scale-97"
            >
              <span>WhatsApp Direct Line</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

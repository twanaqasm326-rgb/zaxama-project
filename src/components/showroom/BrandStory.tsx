import React from 'react'
import { ArrowUpRight, Sparkles, Gem, Hammer, Shield } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'

export const BrandStory: React.FC = () => {
  return (
    <section id="story-section" className="py-20 lg:py-28 border-t border-border/80 bg-stone-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Atelier Philosophy &amp; Provenance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-foreground tracking-tight editorial-title">
            Craftsmanship Rooted in Architectural Permanence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed font-sans">
            We believe an object’s value lives in honest materiality and the human touch of master stonemasons, woodturners, and metalsmiths. Every piece in our permanent collection is engineered to age with authentic character over generations.
          </p>
        </div>

        {/* 3 Materiality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Natural Stone */}
          <div className="bg-card border border-showroom-hairline rounded-3xl p-7 sm:p-8 shadow-card hover:shadow-pedestal transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
              <Gem className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Geological Roman Travertine
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              Quarried in historic Italian basins, each slab of Navona and Silver travertine is selected for its mineral density, organic veining, and tactile warmth before waterjet precision honing.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              Tivoli &amp; Aragon Basins
            </div>
          </div>

          {/* Pillar 2: Old-Growth Hardwoods */}
          <div className="bg-card border border-showroom-hairline rounded-3xl p-7 sm:p-8 shadow-card hover:shadow-pedestal transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
              <Hammer className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Air-Dried Solid Hardwoods
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              FSC-certified American black walnut and European white oak, air-dried over 18 months to achieve exceptional stability. Joined using concealed mortise-and-tenon craftsmanship.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              18-Month Cured Timber
            </div>
          </div>

          {/* Pillar 3: Living Brass & Bronze */}
          <div className="bg-card border border-showroom-hairline rounded-3xl p-7 sm:p-8 shadow-card hover:shadow-pedestal transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Living Spun Brass &amp; Bronze
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              Spun solid brass discs and collectible bronze vessels finished with proprietary hot-wax patinas that evolve an authentic golden luster with age and touch.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              Living Hot-Wax Patinas
            </div>
          </div>

        </div>

        {/* Private Showroom Consultation Card */}
        <div className="bg-card border border-showroom-hairline rounded-3xl p-8 sm:p-12 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              Private Atelier Consultations
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Experience the materials firsthand at our showroom atelier in Riyadh.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              Consultations include tactile material swatch inspections, scale drawings, and personalized project curation with our senior design team.
            </p>
          </div>
          <a
            href={`mailto:${BRAND_CONFIG.contact.email}?subject=Showroom%20Atelier%20Consultation%20Inquiry`}
            className="inline-flex items-center gap-3 bg-foreground text-background hover:bg-stone-800 px-7 py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 shadow-md active:scale-97"
          >
            <span>Request Appointment</span>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </a>
        </div>

      </div>
    </section>
  )
}

import React from 'react'
import { ArrowUpRight, Sparkles, Gem, Hammer, Shield } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'

export const BrandStory: React.FC = () => {
  return (
    <section id="story-section" className="py-16 lg:py-24 border-t border-border/80 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Atelier Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-foreground tracking-tight">
            Craftsmanship Rooted in Architectural Permanence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            We believe that an object’s value lies in honest materiality and the human touch of master stonemasons, woodturners, and metalsmiths. Every piece in our showroom is built to age with graceful character over decades of use.
          </p>
        </div>

        {/* 3 Materiality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Natural Stone */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Gem className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">
              Geological Travertine & Stone
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Quarried in historic Italian basins, each slab of Navona and Silver travertine is selected for its mineral depth, organic cavities, and tactile warmth before waterjet precision honing.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              Tivoli & Aragon Basins
            </div>
          </div>

          {/* Pillar 2: Old-Growth Timber */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Hammer className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">
              Sustainably Harvested Hardwoods
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              FSC-certified American black walnut and European white oak, air-dried over 18 months to achieve structural stability. Joined using concealed mortise-and-tenon craftsmanship.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              18-Month Air-Dried Slabs
            </div>
          </div>

          {/* Pillar 3: Hand-Patinated Metals */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">
              Living Brass & Lost-Wax Bronze
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Spun solid brass discs and numbered bronze collectible vessels finished with proprietary sulfur and wax patinas that evolve an authentic golden luster over decades.
            </p>
            <div className="pt-2 text-[11px] font-mono text-primary font-medium">
              Proprietary Hot-Wax Patinas
            </div>
          </div>

        </div>

        {/* Showroom Consultation Callout */}
        <div className="bg-card border border-border/90 rounded-2xl p-8 sm:p-10 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              Private Atelier Appointments
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Experience the materials firsthand at our showroom atelier.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Appointments include material swatch inspections, custom proportion scale blueprints, and personalized project curation with our senior architectural design team.
            </p>
          </div>
          <a
            href={`mailto:${BRAND_CONFIG.contact.email}?subject=Showroom%20Atelier%20Consultation%20Inquiry`}
            className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-stone-800 px-6 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <span>Request Appointment</span>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </a>
        </div>

      </div>
    </section>
  )
}

import React from 'react'
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'

export const Footer: React.FC = () => {
  return (
    <footer id="atelier-info" className="bg-stone-100/80 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Vision & Mission */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-serif text-3xl tracking-[0.2em] font-normal text-foreground">
                {BRAND_CONFIG.name}
              </span>
              <p className="text-xs uppercase font-mono tracking-[0.25em] text-primary">
                {BRAND_CONFIG.tagline}
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
              {BRAND_CONFIG.subtitle} We collaborate with master stonemasons, woodturners, and metalsmiths across Europe and Japan to produce enduring architectural statements.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Atelier Open for Private Consultations
              </span>
            </div>
          </div>

          {/* Showroom Physical Atelier */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-semibold">
              Showroom Atelier
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground font-light">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{BRAND_CONFIG.showroomAddress}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{BRAND_CONFIG.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Inquiries & Communication */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground font-light">
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-light">
          <p>© {BRAND_CONFIG.year} {BRAND_CONFIG.name} Showroom. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Architectural Living Catalog</span>
            <span>•</span>
            <span>Bespoke Materiality</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

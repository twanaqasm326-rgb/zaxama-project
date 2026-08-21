import React from 'react'
import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'
import { BrandLogo } from '../ui/BrandLogo'

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Fakhama Decor Atelier, I would like to inquire about your architectural showroom collection and bespoke pieces.'
  )}`

  return (
    <footer id="atelier-info" className="relative mt-12 sm:mt-16 pt-12 sm:pt-16 pb-8 overflow-hidden border-t border-border/70 bg-card/50 backdrop-blur-md">
      {/* Dual-Tone Champagne Hairline Divider with Center Luminescent Flare */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-primary/20 blur-md pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-10 relative z-10">
        
        {/* 3-Column Symmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Business Name & Provenance Narrative */}
          <div className="flex flex-col items-start space-y-2.5 text-left">
            <div className="space-y-0.5">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.24em] text-foreground uppercase leading-none">
                {BRAND_CONFIG.name}
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary font-semibold block">
                Architectural Living &amp; Objects
              </span>
            </div>

            <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-sm font-sans pt-0.5">
              Handcrafted architectural furniture, Roman travertine monoliths, and bespoke lighting curated for monumental living spaces.
            </p>
          </div>

          {/* Middle Column: Sculptural Emblem Logo Stage */}
          <div className="flex flex-col items-center justify-center text-center space-y-2.5">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary/25 to-[#D4AF37]/10 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative p-3.5 rounded-2xl bg-secondary/80 border border-white/80 dark:border-stone-800 shadow-2xs hover:scale-105 transition-transform duration-300">
                <BrandLogo size="lg" showText={false} />
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-foreground font-semibold block">
                Riyadh Atelier
              </span>
              <span className="text-[9px] font-mono text-primary tracking-[0.22em] uppercase font-medium">
                Permanent Collection • Est. {BRAND_CONFIG.year}
              </span>
            </div>
          </div>

          {/* Right Column: Direct Inquiries (Email + WhatsApp Number) */}
          <div className="flex flex-col md:items-end items-start space-y-3 md:text-right">
            <h4 className="text-xs font-mono uppercase tracking-[0.22em] text-foreground font-semibold">
              Atelier Consultations
            </h4>
            
            <div className="space-y-2 text-xs text-muted-foreground font-light flex flex-col md:items-end items-start">
              {/* Email Link */}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}?subject=Showroom%20Collection%20Inquiry`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/80 text-foreground hover:text-primary transition-all duration-300 group shadow-2xs"
              >
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="font-mono text-[11px]">{BRAND_CONFIG.contact.email}</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* WhatsApp Linked Number */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/80 text-foreground hover:text-primary transition-all duration-300 group font-mono text-[11px] font-medium shadow-2xs"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{BRAND_CONFIG.contact.phone}</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 ml-0.5 font-semibold">
                  Direct Line
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Minimal Copyright with Soft Gradient Hairline */}
        <div className="relative pt-6">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
            <p>© {BRAND_CONFIG.year} {BRAND_CONFIG.name} Atelier. All rights reserved.</p>
            <div className="flex items-center gap-2.5">
              <span>Architectural Living</span>
              <span className="text-primary">•</span>
              <span>Bespoke Specification Sheets</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

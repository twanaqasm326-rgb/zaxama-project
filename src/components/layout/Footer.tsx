import React from 'react'
import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react'
import { BRAND_CONFIG } from '../../data/brand'
import { BrandLogo } from '../ui/BrandLogo'

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Fakhama Decor Atelier, I would like to inquire about your architectural showroom collection and bespoke pieces.'
  )}`

  return (
    <footer id="atelier-info" className="relative mt-6 sm:mt-8 pt-8 sm:pt-10 pb-8 overflow-hidden border-t border-border/70 bg-card/40">
      {/* Gentle ambient top glow to merge with background without hard cuts */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-200/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        
        {/* 3-Column Symmetrical Layout: Left (Name/Summary) | Center (Emblem Logo) | Right (Inquiries) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Business Name & Identity */}
          <div className="flex flex-col items-start space-y-2 text-left">
            <div className="space-y-0.5">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.24em] text-foreground uppercase leading-none">
                {BRAND_CONFIG.name}
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary font-medium block">
                Architectural Living &amp; Objects
              </span>
            </div>

            <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-sm font-sans pt-0.5">
              Handcrafted architectural furniture, Roman travertine monoliths, and bespoke lighting curated for elevated living spaces.
            </p>
          </div>

          {/* Middle Column: Sculptural Emblem Logo Stage */}
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="relative group">
              <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-md opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none" />
              <div className="relative p-3 rounded-2xl bg-secondary/60 border border-border/80 shadow-2xs hover:scale-105 transition-transform duration-300">
                <BrandLogo size="lg" showText={false} />
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-muted-foreground font-medium block">
                Riyadh Atelier
              </span>
              <span className="text-[9px] font-mono text-primary tracking-[0.2em] uppercase">
                Est. {BRAND_CONFIG.year}
              </span>
            </div>
          </div>

          {/* Right Column: Direct Inquiries (Email + WhatsApp Number) */}
          <div className="flex flex-col md:items-end items-start space-y-2.5 md:text-right">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-semibold">
              Inquiries &amp; Consultations
            </h4>
            
            <div className="space-y-2 text-xs text-muted-foreground font-light flex flex-col md:items-end items-start">
              {/* Email Link */}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}?subject=Showroom%20Collection%20Inquiry`}
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* WhatsApp Linked Number */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group font-mono font-medium"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{BRAND_CONFIG.contact.phone}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 ml-1">
                  WhatsApp
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Minimal Copyright */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
          <p>© {BRAND_CONFIG.year} {BRAND_CONFIG.name} Atelier. All rights reserved.</p>
          <div className="flex items-center gap-2.5">
            <span>Architectural Collection</span>
            <span>•</span>
            <span>Bespoke Specifications</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { openWhatsAppChat } from '../../lib/helpers'
import { BRAND_CONFIG } from '../../data/brand'
import { ArrowRight } from 'lucide-react'

export const WhatsAppFloatingHelp: React.FC = () => {
  const { t } = useLanguage()

  const handleWhatsAppChat = () => {
    openWhatsAppChat(t('help.whatsappPreset'))
  }

  return (
    <footer className="w-full relative z-10 py-3.5 sm:py-6 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto bg-white/70 dark:bg-[#0a0e14]/70 backdrop-blur-xl">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">

        {/* Brand Information & Credits (Left on desktop, 2nd on mobile) */}
        <div className="w-full sm:w-auto space-y-0.5 sm:space-y-1 text-center sm:text-left rtl:sm:text-right order-2 sm:order-1">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('brand.tagline')}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-end gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
            <span>© 2026 Fakhama Decorat.</span>
            <span>•</span>
            <span>All rights reserved.</span>
            <span>•</span>
            <span>Developed by <strong className="text-slate-600 dark:text-slate-300 font-semibold">Twana</strong></span>
          </div>
        </div>

        {/* Actions Container: TikTok Icon Button + WhatsApp Action Card (Right on desktop, 1st on mobile) */}
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5 order-1 sm:order-2 shrink-0">

          {/* TikTok Account Button (Same height & style as WhatsApp button, placed on the other side) */}
          <a
            href={BRAND_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-3 sm:px-3.5 py-2.5 sm:py-2.5 rounded-xl bg-white dark:bg-[#131823] hover:bg-slate-100 dark:hover:bg-[#1b2333] text-slate-800 dark:text-slate-100 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(244,63,94,0.25)] transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
            title="Follow Fakhama Decorat on TikTok"
            aria-label="Follow Fakhama Decorat on TikTok"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-rose-500/25 transition-all duration-300 shadow-xs">
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.89c.35 0 .68.07 1 .18v-3.5a6.37 6.37 0 0 0-1-.08A6.33 6.33 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V8.87a8.28 8.28 0 0 0 4.84 1.54V6.96a4.85 4.85 0 0 1-.93-.27z" />
              </svg>
            </div>
          </a>

          {/* WhatsApp Direct Contact Button */}
          <button
            onClick={handleWhatsAppChat}
            className="flex-1 sm:flex-initial group inline-flex items-center justify-between sm:justify-start gap-2 sm:gap-3 bg-white dark:bg-[#131823] hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 sm:px-4.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 cursor-pointer active:scale-98"
            aria-label="Contact us on WhatsApp for help"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Glowing emerald icon badge */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all duration-300 shrink-0 shadow-xs">
                <svg
                  className="w-3.5 h-3.5 fill-emerald-500 dark:fill-emerald-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              {/* Text next to the icon */}
              <span className="text-[11px] sm:text-[13px] font-semibold tracking-wide truncate">
                {t('help.floatingText')}
              </span>
            </div>

            {/* Subtle mobile arrow */}
            <div className="sm:hidden text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0">
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  )
}

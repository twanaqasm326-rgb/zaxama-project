import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { openWhatsAppChat } from '../../lib/helpers'

export const WhatsAppFloatingHelp: React.FC = () => {
  const { t } = useLanguage()

  const handleWhatsAppChat = () => {
    openWhatsAppChat(t('help.whatsappPreset'))
  }

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 animate-fade-in">
      <button
        onClick={handleWhatsAppChat}
        className="group flex items-center gap-2 sm:gap-3 bg-white/95 dark:bg-[#0d141e]/90 hover:bg-slate-50 dark:hover:bg-[#131d2b] text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white px-3 sm:px-4.5 py-2 sm:py-3 rounded-2xl border border-emerald-500/50 hover:border-emerald-500 dark:border-emerald-500/40 dark:hover:border-emerald-400/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_20px_rgba(16,185,129,0.25)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.18),0_0_25px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(16,185,129,0.45)] transition-all duration-300 cursor-pointer active:scale-95"
        aria-label="Contact us on WhatsApp for help"
      >
        {/* Glowing emerald icon badge */}
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300 shrink-0 shadow-xs">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-500 dark:fill-emerald-400"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </div>

        {/* Text next to the icon */}
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
            {t('help.floatingText')}
          </span>
        </div>
      </button>
    </div>
  )
}

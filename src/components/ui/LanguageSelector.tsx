import React, { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SUPPORTED_LANGUAGES, Language } from '../../data/translations'
import { cn } from '../../lib/utils'

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0]

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLanguage = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button showing Shortened Language Name (EN, AR, KU, TR) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer backdrop-blur-md border active:scale-95",
          isOpen
            ? "bg-slate-200/90 dark:bg-[#1f293d] border-sky-400 text-slate-900 dark:text-white shadow-xs"
            : "bg-slate-100/90 dark:bg-[#141a26]/80 hover:bg-slate-200/90 dark:hover:bg-[#1c2436] text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700/60 hover:border-sky-500/50 shadow-xs"
        )}
        aria-label={`Current language: ${currentOption.shortCode}. Click to change language.`}
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-wider">{currentOption.shortCode}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-48 py-1.5 bg-white/95 dark:bg-[#111622]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {t('header.selectLanguage')}
            </span>
          </div>

          <div className="space-y-0.5 px-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === language
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left",
                    isSelected
                      ? "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1b2333] hover:text-slate-950 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold font-mono px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                      {lang.shortCode}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {lang.label}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-sky-500 dark:text-sky-400 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

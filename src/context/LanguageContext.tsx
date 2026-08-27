import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, TRANSLATIONS } from '../data/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: 'ltr' | 'rtl'
  isRTL: boolean
  t: (key: string, params?: Record<string, string | number>) => string
}

const STORAGE_KEY = 'fakhama_language_v1'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language
      if (saved && ['en', 'ar', 'ku', 'tr'].includes(saved)) {
        return saved
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'en'
  })

  const direction: 'ltr' | 'rtl' = 'ltr'
  const isRTL = false

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Ignore
    }

    // Always maintain LTR visual layout across all languages
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = language
    document.body.classList.remove('rtl-layout')
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en
    let translation = langDict[key] || TRANSLATIONS.en[key] || key

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        translation = translation.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal))
      })
    }

    return translation
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        direction,
        isRTL,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

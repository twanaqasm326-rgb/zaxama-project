import { jsPDF } from 'jspdf'

/**
 * Font sources (Local first, CDN fallback) for PDF invoice generation.
 */

const IBM_PLEX_ARABIC_BOLD_LOCAL = '/fonts/IBMPlexSansArabic-Bold.ttf'

const AMIRI_REGULAR_FALLBACK =
  'https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf'
const AMIRI_BOLD_FALLBACK =
  'https://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf'

// Plus Jakarta Sans covers Latin + full Turkish glyphs (ş ğ ı İ ö ü ç)
const PJS_REGULAR_LOCAL = '/fonts/PlusJakartaSans-Regular.ttf'
const PJS_BOLD_LOCAL = '/fonts/PlusJakartaSans-Bold.ttf'
const PJS_REGULAR_FALLBACK =
  'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf'
const PJS_BOLD_FALLBACK =
  'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNSg.ttf'

const ARABIC_FONT_NAME = 'IBMPlexSansArabic'
const LATIN_FONT_NAME = 'PlusJakartaSans'

interface FontCache {
  regular: string | null
  bold: string | null
  fontName: string
}

const arabicFontCache: FontCache = {
  regular: null,
  bold: null,
  fontName: ARABIC_FONT_NAME,
}

const latinFontCache: FontCache = {
  regular: null,
  bold: null,
  fontName: LATIN_FONT_NAME,
}

/**
 * Fetches a font from a URL and converts it to a base64 string.
 */
async function fetchFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function fetchFirstAvailable(urls: string[]): Promise<string> {
  for (const url of urls) {
    try {
      return await fetchFontAsBase64(url)
    } catch {
      // Try the next source
    }
  }
  throw new Error('All font sources failed')
}

/**
 * Loads the IBM Plex Sans Arabic font (with Amiri fallback) and caches it.
 */
export async function loadArabicFont(): Promise<boolean> {
  try {
    if (!arabicFontCache.regular || !arabicFontCache.bold) {
      try {
        // Try local IBM Plex Sans Arabic first
        const boldFont = await fetchFontAsBase64(IBM_PLEX_ARABIC_BOLD_LOCAL)
        arabicFontCache.bold = boldFont
        arabicFontCache.regular = boldFont // Use bold/semibold for clear legibility
        arabicFontCache.fontName = ARABIC_FONT_NAME
      } catch {
        // Fallback to CDN Amiri if local fetch fails
        const [regular, bold] = await Promise.all([
          fetchFontAsBase64(AMIRI_REGULAR_FALLBACK),
          fetchFontAsBase64(AMIRI_BOLD_FALLBACK),
        ])
        arabicFontCache.regular = regular
        arabicFontCache.bold = bold
        arabicFontCache.fontName = 'Amiri'
      }
    }
    return true
  } catch (err) {
    console.error('Failed to load Arabic/Kurdish font:', err)
    return false
  }
}

/**
 * Loads the Plus Jakarta Sans font for full Latin/Turkish glyph support.
 * jsPDF's built-in helvetica (WinAnsi) cannot encode ş ğ ı İ.
 */
export async function loadLatinFont(): Promise<boolean> {
  try {
    if (!latinFontCache.regular || !latinFontCache.bold) {
      const [regular, bold] = await Promise.all([
        fetchFirstAvailable([PJS_REGULAR_LOCAL, PJS_REGULAR_FALLBACK]),
        fetchFirstAvailable([PJS_BOLD_LOCAL, PJS_BOLD_FALLBACK]),
      ])
      latinFontCache.regular = regular
      latinFontCache.bold = bold
      latinFontCache.fontName = LATIN_FONT_NAME
    }
    return true
  } catch (err) {
    console.error('Failed to load Latin/Turkish font:', err)
    return false
  }
}

/**
 * Registers the Arabic/Kurdish font with a jsPDF document instance.
 */
export function registerArabicFont(doc: jsPDF): string | null {
  if (!arabicFontCache.regular && !arabicFontCache.bold) {
    return null
  }
  return registerFont(doc, arabicFontCache)
}

/**
 * Registers the Latin/Turkish-capable font with a jsPDF document instance.
 */
export function registerLatinFont(doc: jsPDF): string | null {
  if (!latinFontCache.regular && !latinFontCache.bold) {
    return null
  }
  return registerFont(doc, latinFontCache)
}

function registerFont(doc: jsPDF, cache: FontCache): string | null {
  const fontName = cache.fontName

  if (cache.regular) {
    doc.addFileToVFS(`${fontName}-Regular.ttf`, cache.regular)
    doc.addFont(`${fontName}-Regular.ttf`, fontName, 'normal')
  }

  if (cache.bold) {
    doc.addFileToVFS(`${fontName}-Bold.ttf`, cache.bold)
    doc.addFont(`${fontName}-Bold.ttf`, fontName, 'bold')
  }

  return fontName
}

/**
 * Checks whether the given language needs an Arabic-script font.
 */
export function needsArabicFont(language: string): boolean {
  return language === 'ar' || language === 'ku'
}

/**
 * Checks whether the given language needs the extended Latin font
 * (Turkish-specific characters unsupported by jsPDF's default helvetica).
 */
export function needsLatinFont(language: string): boolean {
  return language === 'tr'
}

import { jsPDF } from 'jspdf'

/**
 * URLs for IBM Plex Sans Arabic (Local first, CDN fallback)
 */
const IBM_PLEX_ARABIC_BOLD_LOCAL = '/fonts/IBMPlexSansArabic-Bold.ttf'

const AMIRI_REGULAR_FALLBACK =
  'https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf'
const AMIRI_BOLD_FALLBACK =
  'https://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf'

let fontCache: { regular: string | null; bold: string | null; fontName: string } = {
  regular: null,
  bold: null,
  fontName: 'IBMPlexSansArabic',
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

/**
 * Loads the IBM Plex Sans Arabic font (with Amiri fallback) and caches it.
 */
export async function loadArabicFont(): Promise<boolean> {
  try {
    if (!fontCache.regular || !fontCache.bold) {
      try {
        // Try local IBM Plex Sans Arabic first
        const [boldFont] = await Promise.all([
          fetchFontAsBase64(IBM_PLEX_ARABIC_BOLD_LOCAL),
        ])
        fontCache.bold = boldFont
        fontCache.regular = boldFont // Use bold/semibold for clear legibility
        fontCache.fontName = 'IBMPlexSansArabic'
      } catch {
        // Fallback to CDN Amiri if local fetch fails
        const [regular, bold] = await Promise.all([
          fetchFontAsBase64(AMIRI_REGULAR_FALLBACK),
          fetchFontAsBase64(AMIRI_BOLD_FALLBACK),
        ])
        fontCache.regular = regular
        fontCache.bold = bold
        fontCache.fontName = 'Amiri'
      }
    }
    return true
  } catch (err) {
    console.error('Failed to load Arabic/Kurdish font:', err)
    return false
  }
}

/**
 * Registers the Arabic/Kurdish font with a jsPDF document instance.
 */
export function registerArabicFont(doc: jsPDF): string | null {
  if (!fontCache.regular && !fontCache.bold) {
    return null
  }

  const fontName = fontCache.fontName || 'IBMPlexSansArabic'

  if (fontCache.regular) {
    doc.addFileToVFS(`${fontName}-Regular.ttf`, fontCache.regular)
    doc.addFont(`${fontName}-Regular.ttf`, fontName, 'normal')
  }

  if (fontCache.bold) {
    doc.addFileToVFS(`${fontName}-Bold.ttf`, fontCache.bold)
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

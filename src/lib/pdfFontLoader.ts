import { jsPDF } from 'jspdf'

/**
 * Google Fonts CDN URLs for Amiri (Arabic/Kurdish-supporting serif font)
 * Amiri is a high-quality Naskh typeface that supports Arabic, Kurdish, and Latin scripts.
 */
const AMIRI_REGULAR_URL =
  'https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf'
const AMIRI_BOLD_URL =
  'https://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf'

let fontCache: { regular: string | null; bold: string | null } = {
  regular: null,
  bold: null,
}

/**
 * Fetches a TTF font from a URL and converts it to a base64 string.
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
 * Loads the Amiri Arabic font and caches it for reuse.
 * Returns true if the font was loaded successfully.
 */
export async function loadArabicFont(): Promise<boolean> {
  try {
    if (!fontCache.regular) {
      const [regular, bold] = await Promise.all([
        fetchFontAsBase64(AMIRI_REGULAR_URL),
        fetchFontAsBase64(AMIRI_BOLD_URL),
      ])
      fontCache.regular = regular
      fontCache.bold = bold
    }
    return true
  } catch (err) {
    console.error('Failed to load Arabic font:', err)
    return false
  }
}

/**
 * Registers the Amiri font with a jsPDF document instance.
 * Must call loadArabicFont() first to populate the cache.
 */
export function registerArabicFont(doc: jsPDF): boolean {
  if (!fontCache.regular || !fontCache.bold) {
    return false
  }

  doc.addFileToVFS('Amiri-Regular.ttf', fontCache.regular)
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal')

  doc.addFileToVFS('Amiri-Bold.ttf', fontCache.bold)
  doc.addFont('Amiri-Bold.ttf', 'Amiri', 'bold')

  return true
}

/**
 * Checks whether the given language needs an Arabic-script font.
 */
export function needsArabicFont(language: string): boolean {
  return language === 'ar' || language === 'ku'
}

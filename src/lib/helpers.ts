import { Product, ProductOption } from '../types/product'
import { BRAND_CONFIG } from '../data/brand'

export const DEFAULT_CURRENCY = BRAND_CONFIG.currency
export const MAX_QUANTITY = 99

/**
 * Returns the first available option for a product, or undefined.
 */
export function getDefaultOption(product: Product): ProductOption | undefined {
  return product.options && product.options.length > 0 ? product.options[0] : undefined
}

/**
 * Clamps a quantity into the valid 1..MAX_QUANTITY range.
 * Non-numeric input falls back to 1.
 */
export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)))
}

/**
 * Formats an amount with its currency suffix (defaults to brand currency).
 */
export function formatPrice(amount: number, currency?: string): string {
  return `${amount.toLocaleString()} ${currency || DEFAULT_CURRENCY}`
}

/**
 * Builds a wa.me deep link from a raw phone number stored in BRAND_CONFIG,
 * normalizing local leading-zero formats to international dial codes.
 */
export function buildWhatsAppLink(message: string): string {
  const phone = BRAND_CONFIG.contact.phone || ''
  const formatted = phone.startsWith('0')
    ? '964' + phone.slice(1)
    : phone.replace(/[^0-9]/g, '')
  return `https://wa.me/${formatted}?text=${encodeURIComponent(message)}`
}

/**
 * Opens a WhatsApp chat in a new tab with a pre-filled message.
 */
export function openWhatsAppChat(message: string): void {
  window.open(buildWhatsAppLink(message), '_blank')
}

/**
 * Returns a resized variant of an image URL for thumbnails.
 * Unsplash supports dynamic width params; other hosts are returned untouched.
 */
export function productImage(url: string, width?: number): string {
  if (!width) return url
  try {
    const parsed = new URL(url)
    if (parsed.hostname.endsWith('unsplash.com')) {
      parsed.searchParams.set('w', String(width))
      parsed.searchParams.set('auto', 'format')
      parsed.searchParams.set('fit', 'crop')
      parsed.searchParams.set('q', '80')
      return parsed.toString()
    }
  } catch {
    // Malformed URL — fall through and return original
  }
  return url
}

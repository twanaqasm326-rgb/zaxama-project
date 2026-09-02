import { Product, ProductOption } from './product'

/**
 * Live hydrated in-memory selection item referencing active catalog product
 */
export interface ShoppingBoxItem {
  id: string
  product: Product
  selectedOption?: ProductOption
  quantity: number
  customNotes?: string
  addedAt: number
}

/**
 * Minimal durable selection payload persisted to localStorage.
 * Does NOT store full product snapshots to prevent catalog data drift.
 */
export interface PersistedSelectionItem {
  productId: string
  optionId?: string
  quantity: number
  customNotes?: string
  addedAt?: number
}

/**
 * Versioned storage envelope for robust localStorage migrations
 */
export interface PersistedSelectionStorage {
  version: number
  items: PersistedSelectionItem[]
}

export interface ClientInformation {
  clientName?: string
  phone?: string
  city?: string
  address?: string
  companyName?: string
  projectTitle?: string
  email?: string
  notes?: string
}

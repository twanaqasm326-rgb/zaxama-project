import React from 'react'
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
  companyName?: string
  projectTitle?: string
  email?: string
  phone?: string
  notes?: string
}

export interface ShoppingBoxContextType {
  items: ShoppingBoxItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isReviewOpen: boolean
  setIsReviewOpen: (isOpen: boolean) => void
  addItem: (product: Product, option?: ProductOption, quantity?: number) => void
  toggleItem: (product: Product, option?: ProductOption) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateItemOption: (itemId: string, option: ProductOption) => void
  updateItemNotes: (itemId: string, notes: string) => void
  clearBox: () => void
  isProductSelected: (productId: string) => boolean
  getItemForProduct: (productId: string) => ShoppingBoxItem | undefined
  totalCount: number
  totalValuation: number
  clientInfo: ClientInformation
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInformation>>
}

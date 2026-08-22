export type ProductCategory = string

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductOption {
  id: string
  name: string
  value?: string
  colorHex?: string
  textureUrl?: string
  image?: string
}

export interface ProductDimensions {
  width?: string
  depth?: string
  height?: string
  weight?: string
  [key: string]: string | undefined
}

export interface Product {
  // Required core product attributes
  id: string
  code: string
  name: string
  brand?: string
  price: number
  originalPrice?: number
  currency?: string
  shortDescription: string
  mainImage: string

  // Badges & Status Indicators
  stockCount?: number
  stockBadge?: string // e.g., 'Only 1 left', 'Only 2 left', 'In Stock'
  discountAmount?: string // e.g., '-15,000 IQD'
  discountPercent?: number | string
  hasDiscount?: boolean
  isNewArrival?: boolean
  isFeatured?: boolean
  isNew?: boolean
  rating?: number
  reviewCount?: number

  // Common showcase attributes
  tagline?: string
  category?: ProductCategory
  tags?: string[]
  fullDescription?: string
  galleryImages?: string[]
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order' | 'limited-edition' | 'pre-order' | string
  leadTime?: string

  // Generic and extensible specifications
  specifications?: ProductSpecification[]
  options?: ProductOption[]

  // Optional domain-specific attributes (extensible)
  dimensions?: ProductDimensions
  materials?: string[]
  attributes?: Record<string, string | number | boolean | string[]>
  designer?: string
  origin?: string

  // Exhibition Hierarchy & Staging
  tier?: 'tier-1' | 'tier-2' | 'tier-3'
  aspectRatio?: '4:3' | '3:4' | '16:9' | '1:1'
  curationNote?: string
}

export interface CategoryDefinition {
  id: ProductCategory
  label: string
  shortLabel?: string
  description?: string
  iconName?: string
  badgeText?: string
}


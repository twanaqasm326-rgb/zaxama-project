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
  price: number
  shortDescription: string
  mainImage: string

  // Common optional showcase attributes
  currency?: string
  tagline?: string
  category?: ProductCategory
  tags?: string[]
  fullDescription?: string
  galleryImages?: string[]
  availability?: 'in-stock' | 'made-to-order' | 'limited-edition' | 'pre-order' | string
  leadTime?: string
  isFeatured?: boolean
  isNew?: boolean

  // Generic and extensible specifications
  specifications?: ProductSpecification[]
  options?: ProductOption[]

  // Optional domain-specific attributes (extensible)
  dimensions?: ProductDimensions
  materials?: string[]
  attributes?: Record<string, string | number | boolean | string[]>
  designer?: string
  origin?: string

  // Editorial Exhibition Hierarchy & Staging
  tier?: 'tier-1' | 'tier-2' | 'tier-3'
  aspectRatio?: '4:3' | '3:4' | '16:9' | '1:1'
  curationNote?: string
}

export interface CategoryDefinition {
  id: ProductCategory
  label: string
  description?: string
  iconName?: string
  badgeText?: string
}

import { ShoppingBoxItem, ClientInformation } from './shoppingBox'

export interface PDFCompanyBranding {
  companyName: string
  tagline?: string
  address?: string
  contactEmail?: string
  contactPhone?: string
  websiteUrl?: string
  logoUrl?: string
}

export interface PDFExportOptions {
  includePricing?: boolean
  includeSpecifications?: boolean
  includeImages?: boolean
  includeNotes?: boolean
  documentTitle?: string
  referenceNumber?: string
  customFooterText?: string
}

export interface PDFDocumentData {
  documentNumber: string
  generatedAt: string
  branding: PDFCompanyBranding
  client?: ClientInformation
  items: ShoppingBoxItem[]
  totalItems: number
  estimatedTotal?: number
  currency?: string
  options?: PDFExportOptions
}

import React, { createContext, useContext, useState, useMemo } from 'react'
import { Product, ProductCategory } from '../types/product'
import { SHOWROOM_PRODUCTS } from '../data/products'

export type ViewLayout = 'editorial' | 'compact'
export type SortOption = 'curated' | 'price-asc' | 'price-desc' | 'name'

interface ShowroomContextType {
  products: Product[]
  selectedCategory: ProductCategory
  setSelectedCategory: (category: ProductCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewLayout: ViewLayout
  setViewLayout: (layout: ViewLayout) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  inspectedProduct: Product | null
  setInspectedProduct: (product: Product | null) => void
  filteredProducts: Product[]
  featuredProducts: Product[]
}

const ShowroomContext = createContext<ShowroomContextType | undefined>(undefined)

export const ShowroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewLayout, setViewLayout] = useState<ViewLayout>('editorial')
  const [sortBy, setSortBy] = useState<SortOption>('curated')
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    const matched = SHOWROOM_PRODUCTS.filter(product => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(t => t.toLowerCase().includes(query))) ||
        (product.materials && product.materials.some(m => m.toLowerCase().includes(query))) ||
        (product.designer && product.designer.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })

    // Sort according to selected sort option
    return [...matched].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      // 'curated' default: featured first, then original order
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return 0
    })
  }, [selectedCategory, searchQuery, sortBy])

  const featuredProducts = useMemo(() => {
    return SHOWROOM_PRODUCTS.filter(p => p.isFeatured)
  }, [])

  return (
    <ShowroomContext.Provider
      value={{
        products: SHOWROOM_PRODUCTS,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        viewLayout,
        setViewLayout,
        sortBy,
        setSortBy,
        inspectedProduct,
        setInspectedProduct,
        filteredProducts,
        featuredProducts,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  )
}

export const useShowroom = () => {
  const context = useContext(ShowroomContext)
  if (!context) {
    throw new Error('useShowroom must be used within a ShowroomProvider')
  }
  return context
}

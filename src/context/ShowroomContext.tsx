import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { Product, ProductCategory } from '../types/product'
import { SHOWROOM_PRODUCTS } from '../data/products'

export type GridDensity = '5-col' | '4-col'
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface QuickFilters {
  discountsOnly: boolean
  newArrivalsOnly: boolean
  inStockOnly: boolean
}

interface ShowroomContextType {
  products: Product[]
  selectedCategory: ProductCategory
  setSelectedCategory: (category: ProductCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  gridDensity: GridDensity
  setGridDensity: (density: GridDensity) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  quickFilters: QuickFilters
  toggleDiscountsOnly: () => void
  toggleNewArrivalsOnly: () => void
  toggleInStockOnly: () => void
  selectedBrands: string[]
  toggleBrand: (brand: string) => void
  clearBrands: () => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  isFilterDrawerOpen: boolean
  setIsFilterDrawerOpen: (open: boolean) => void
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  wishlistCount: number
  inspectedProduct: Product | null
  setInspectedProduct: (product: Product | null) => void
  filteredProducts: Product[]
  availableBrands: string[]
  totalCatalogCount: number
  resetAllFilters: () => void
}

const STORAGE_KEY_WISHLIST = 'dyar_showroom_wishlist_v1'

const ShowroomContext = createContext<ShowroomContextType | undefined>(undefined)

export const ShowroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [gridDensity, setGridDensity] = useState<GridDensity>('5-col')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  
  const [quickFilters, setQuickFilters] = useState<QuickFilters>({
    discountsOnly: false,
    newArrivalsOnly: false,
    inStockOnly: false,
  })

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WISHLIST)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist))
    } catch {
      // ignore
    }
  }, [wishlist])

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const isWishlisted = (productId: string) => wishlist.includes(productId)

  const toggleDiscountsOnly = () => {
    setQuickFilters(prev => ({ ...prev, discountsOnly: !prev.discountsOnly }))
  }

  const toggleNewArrivalsOnly = () => {
    setQuickFilters(prev => ({ ...prev, newArrivalsOnly: !prev.newArrivalsOnly }))
  }

  const toggleInStockOnly = () => {
    setQuickFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const clearBrands = () => setSelectedBrands([])

  const resetAllFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    setSelectedBrands([])
    setPriceRange([0, 3000000])
    setQuickFilters({
      discountsOnly: false,
      newArrivalsOnly: false,
      inStockOnly: false,
    })
    setSortBy('default')
  }

  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>()
    SHOWROOM_PRODUCTS.forEach(p => {
      if (p.brand) brandsSet.add(p.brand)
    })
    return Array.from(brandsSet).sort()
  }, [])

  const filteredProducts = useMemo(() => {
    return SHOWROOM_PRODUCTS.filter(product => {
      // 1. Category Matching
      if (selectedCategory === 'offers') {
        if (!product.hasDiscount && !product.discountAmount) return false
      } else if (selectedCategory !== 'all' && selectedCategory !== 'more') {
        if (product.category !== selectedCategory) return false
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesBrand = product.brand?.toLowerCase().includes(query) || false
        const matchesCode = product.code.toLowerCase().includes(query)
        const matchesTags = product.tags?.some(t => t.toLowerCase().includes(query)) || false
        if (!matchesName && !matchesBrand && !matchesCode && !matchesTags) {
          return false
        }
      }

      // 3. Quick Filters
      if (quickFilters.discountsOnly && !product.hasDiscount && !product.discountAmount) {
        return false
      }
      if (quickFilters.newArrivalsOnly && !product.isNewArrival && !product.isNew) {
        return false
      }
      if (quickFilters.inStockOnly && product.stockCount === 0) {
        return false
      }

      // 4. Brands Filter
      if (selectedBrands.length > 0) {
        if (!product.brand || !selectedBrands.includes(product.brand)) {
          return false
        }
      }

      // 5. Price Range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'newest') {
        if (a.isNewArrival && !b.isNewArrival) return -1
        if (!a.isNewArrival && b.isNewArrival) return 1
      }
      return 0
    })
  }, [selectedCategory, searchQuery, quickFilters, selectedBrands, priceRange, sortBy])

  return (
    <ShowroomContext.Provider
      value={{
        products: SHOWROOM_PRODUCTS,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        gridDensity,
        setGridDensity,
        sortBy,
        setSortBy,
        quickFilters,
        toggleDiscountsOnly,
        toggleNewArrivalsOnly,
        toggleInStockOnly,
        selectedBrands,
        toggleBrand,
        clearBrands,
        priceRange,
        setPriceRange,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        inspectedProduct,
        setInspectedProduct,
        filteredProducts,
        availableBrands,
        totalCatalogCount: SHOWROOM_PRODUCTS.length,
        resetAllFilters,
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


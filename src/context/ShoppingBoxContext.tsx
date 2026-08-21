import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { Product, ProductOption } from '../types/product'
import { ShoppingBoxItem, ClientInformation, PersistedSelectionStorage, PersistedSelectionItem } from '../types/shoppingBox'
import { PDFExportOptions } from '../types/pdf'
import { SHOWROOM_PRODUCTS } from '../data/products'

interface ShoppingBoxContextType {
  items: ShoppingBoxItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isReviewOpen: boolean
  setIsReviewOpen: (isOpen: boolean) => void
  addItem: (product: Product, option?: ProductOption, quantity?: number) => void
  toggleItem: (product: Product, option?: ProductOption) => void
  setProductQuantity: (product: Product, quantity: number, option?: ProductOption) => void
  incrementProductQuantity: (product: Product, option?: ProductOption) => void
  decrementProductQuantity: (product: Product, option?: ProductOption) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateItemOption: (itemId: string, option: ProductOption) => void
  updateItemNotes: (itemId: string, notes: string) => void
  clearBox: () => void
  isProductSelected: (productId: string, optionId?: string) => boolean
  getItemForProduct: (productId: string, optionId?: string) => ShoppingBoxItem | undefined
  totalCount: number
  totalValuation: number
  clientInfo: ClientInformation
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInformation>>
  exportOptions: PDFExportOptions
  setExportOptions: React.Dispatch<React.SetStateAction<PDFExportOptions>>
}

const STORAGE_KEY_V2 = 'fakhama_decor_selection_v2'
const STORAGE_KEY_V1 = 'fakhama_decor_selection_box_v1'

const ShoppingBoxContext = createContext<ShoppingBoxContextType | undefined>(undefined)

/**
 * Hydrate minimal persisted items against the current live SHOWROOM_PRODUCTS catalog.
 * Handles deleted products, price updates, option changes, and schema migrations.
 */
function hydrateSelectionFromStorage(): ShoppingBoxItem[] {
  try {
    // 1. Try modern V2 versioned schema first
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2)
    let persistedItems: PersistedSelectionItem[] = []

    if (rawV2) {
      const parsed: PersistedSelectionStorage = JSON.parse(rawV2)
      if (parsed && Array.isArray(parsed.items)) {
        persistedItems = parsed.items
      }
    } else {
      // 2. Backward compatibility migration from V1 format
      const rawV1 = localStorage.getItem(STORAGE_KEY_V1)
      if (rawV1) {
        const parsedV1 = JSON.parse(rawV1)
        if (Array.isArray(parsedV1)) {
          persistedItems = parsedV1.map((v1Item: any) => ({
            productId: v1Item.product?.id || v1Item.productId || '',
            optionId: v1Item.selectedOption?.id || v1Item.optionId || undefined,
            quantity: typeof v1Item.quantity === 'number' ? v1Item.quantity : 1,
            customNotes: v1Item.customNotes,
            addedAt: v1Item.addedAt,
          })).filter(item => Boolean(item.productId))
        }
      }
    }

    if (persistedItems.length === 0) {
      return []
    }

    // 3. Reconcile with live SHOWROOM_PRODUCTS catalog
    const hydrated: ShoppingBoxItem[] = []

    for (const pItem of persistedItems) {
      const liveProduct = SHOWROOM_PRODUCTS.find(p => p.id === pItem.productId)
      
      // If product was deleted or no longer exists in catalog, discard safely
      if (!liveProduct) {
        continue
      }

      // Reconcile selected option
      let liveOption: ProductOption | undefined = undefined
      if (liveProduct.options && liveProduct.options.length > 0) {
        if (pItem.optionId) {
          liveOption = liveProduct.options.find(opt => opt.id === pItem.optionId) || liveProduct.options[0]
        } else {
          liveOption = liveProduct.options[0]
        }
      }

      const validQuantity = Math.min(99, Math.max(1, pItem.quantity || 1))
      const optionKey = liveOption?.id || 'default'

      hydrated.push({
        id: `${liveProduct.id}-${optionKey}-${pItem.addedAt || Date.now()}`,
        product: liveProduct,
        selectedOption: liveOption,
        quantity: validQuantity,
        customNotes: pItem.customNotes,
        addedAt: pItem.addedAt || Date.now(),
      })
    }

    return hydrated
  } catch (err) {
    console.warn('Failed to parse saved selections, initializing clean state.', err)
    return []
  }
}

export const ShoppingBoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ShoppingBoxItem[]>(() => hydrateSelectionFromStorage())
  const [isOpen, setIsOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  
  const [clientInfo, setClientInfo] = useState<ClientInformation>({
    clientName: '',
    companyName: '',
    projectTitle: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [exportOptions, setExportOptions] = useState<PDFExportOptions>({
    includePricing: true,
    includeSpecifications: true,
    includeImages: true,
    includeNotes: true,
    documentTitle: 'Product Selection & Specification Overview',
  })

  // Persist only minimal references (productId, optionId, quantity, customNotes) to localStorage
  useEffect(() => {
    try {
      const minimalPayload: PersistedSelectionStorage = {
        version: 2,
        items: items.map(item => ({
          productId: item.product.id,
          optionId: item.selectedOption?.id,
          quantity: item.quantity,
          customNotes: item.customNotes,
          addedAt: item.addedAt,
        })),
      }
      localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(minimalPayload))
    } catch {
      // Ignore quota / private-browsing errors safely
    }
  }, [items])

  const addItem = (product: Product, option?: ProductOption, quantity = 1) => {
    setItems(prev => {
      const defaultOption = option || (product.options && product.options.length > 0 ? product.options[0] : undefined)

      // Check if product with matching option already exists
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedOption?.id === defaultOption?.id
      )

      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx].quantity = Math.min(99, updated[existingIdx].quantity + quantity)
        return updated
      }

      const newItem: ShoppingBoxItem = {
        id: `${product.id}-${defaultOption?.id || 'default'}-${Date.now()}`,
        product,
        selectedOption: defaultOption,
        quantity: Math.min(99, Math.max(1, quantity)),
        addedAt: Date.now(),
      }

      return [...prev, newItem]
    })
  }

  const toggleItem = (product: Product, option?: ProductOption) => {
    setItems(prev => {
      const defaultOption = option || (product.options && product.options.length > 0 ? product.options[0] : undefined)
      const existing = prev.find(item => 
        item.product.id === product.id && (defaultOption ? item.selectedOption?.id === defaultOption.id : true)
      )
      if (existing) {
        return prev.filter(item => item.id !== existing.id)
      } else {
        const newItem: ShoppingBoxItem = {
          id: `${product.id}-${defaultOption?.id || 'default'}-${Date.now()}`,
          product,
          selectedOption: defaultOption,
          quantity: 1,
          addedAt: Date.now(),
        }
        return [...prev, newItem]
      }
    })
  }

  const setProductQuantity = (product: Product, quantity: number, option?: ProductOption) => {
    const targetOption = option || (product.options && product.options.length > 0 ? product.options[0] : undefined)
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => 
        !(item.product.id === product.id && (targetOption ? item.selectedOption?.id === targetOption.id : true))
      ))
      return
    }

    const validQty = Math.min(99, Math.max(1, quantity))
    setItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && (targetOption ? item.selectedOption?.id === targetOption.id : true)
      )

      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx].quantity = validQty
        if (targetOption) {
          updated[existingIdx].selectedOption = targetOption
        }
        return updated
      }

      const newItem: ShoppingBoxItem = {
        id: `${product.id}-${targetOption?.id || 'default'}-${Date.now()}`,
        product,
        selectedOption: targetOption,
        quantity: validQty,
        addedAt: Date.now(),
      }
      return [...prev, newItem]
    })
  }

  const incrementProductQuantity = (product: Product, option?: ProductOption) => {
    const targetOption = option || (product.options && product.options.length > 0 ? product.options[0] : undefined)
    setItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && (targetOption ? item.selectedOption?.id === targetOption.id : true)
      )

      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx].quantity = Math.min(99, updated[existingIdx].quantity + 1)
        return updated
      }

      const newItem: ShoppingBoxItem = {
        id: `${product.id}-${targetOption?.id || 'default'}-${Date.now()}`,
        product,
        selectedOption: targetOption,
        quantity: 1,
        addedAt: Date.now(),
      }
      return [...prev, newItem]
    })
  }

  const decrementProductQuantity = (product: Product, option?: ProductOption) => {
    const targetOption = option || (product.options && product.options.length > 0 ? product.options[0] : undefined)
    setItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && (targetOption ? item.selectedOption?.id === targetOption.id : true)
      )

      if (existingIdx >= 0) {
        if (prev[existingIdx].quantity <= 1) {
          return prev.filter((_, idx) => idx !== existingIdx)
        }
        const updated = [...prev]
        updated[existingIdx].quantity = updated[existingIdx].quantity - 1
        return updated
      }

      return prev
    })
  }

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: Math.min(99, Math.max(1, quantity)) } : item
      )
    )
  }

  const updateItemOption = (itemId: string, option: ProductOption) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, selectedOption: option } : item
      )
    )
  }

  const updateItemNotes = (itemId: string, notes: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, customNotes: notes } : item
      )
    )
  }

  const clearBox = () => {
    setItems([])
  }

  const isProductSelected = (productId: string, optionId?: string) => {
    return items.some(item => 
      item.product.id === productId && (optionId ? item.selectedOption?.id === optionId : true)
    )
  }

  const getItemForProduct = (productId: string, optionId?: string) => {
    if (optionId) {
      return items.find(item => item.product.id === productId && item.selectedOption?.id === optionId)
    }
    return items.find(item => item.product.id === productId)
  }

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const totalValuation = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [items])

  return (
    <ShoppingBoxContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        isReviewOpen,
        setIsReviewOpen,
        addItem,
        toggleItem,
        setProductQuantity,
        incrementProductQuantity,
        decrementProductQuantity,
        removeItem,
        updateQuantity,
        updateItemOption,
        updateItemNotes,
        clearBox,
        isProductSelected,
        getItemForProduct,
        totalCount,
        totalValuation,
        clientInfo,
        setClientInfo,
        exportOptions,
        setExportOptions,
      }}
    >
      {children}
    </ShoppingBoxContext.Provider>
  )
}

export const useShoppingBox = () => {
  const context = useContext(ShoppingBoxContext)
  if (!context) {
    throw new Error('useShoppingBox must be used within a ShoppingBoxProvider')
  }
  return context
}

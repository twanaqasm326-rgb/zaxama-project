import React, { useState } from 'react'
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Layers,
  Sparkles,
} from 'lucide-react'
import { useShoppingBox } from '../../context/ShoppingBoxContext'

export const ShoppingBoxDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    setIsReviewOpen,
    removeItem,
    updateQuantity,
    clearBox,
    totalCount,
    totalValuation,
  } = useShoppingBox()

  const [liveAnnouncement, setLiveAnnouncement] = useState('')

  if (!isOpen) return null

  const handleProceedToReview = () => {
    setIsOpen(false)
    setIsReviewOpen(true)
  }

  const handleExploreCatalog = () => {
    setIsOpen(false)
    const catalog = document.getElementById('catalog-section')
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleUpdateQty = (itemId: string, productName: string, newQty: number) => {
    updateQuantity(itemId, newQty)
    if (newQty <= 0) {
      setLiveAnnouncement(`Removed ${productName} from selection box`)
    } else {
      setLiveAnnouncement(`Updated quantity for ${productName} to ${newQty}`)
    }
  }

  const handleRemoveItem = (itemId: string, productName: string) => {
    removeItem(itemId)
    setLiveAnnouncement(`Removed ${productName} from selection box`)
  }

  const handleClearAll = () => {
    clearBox()
    setLiveAnnouncement('Cleared all items from selection box')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Curated Showroom Selection Box">
      {/* Screen Reader Announcement Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border shadow-modal flex flex-col justify-between animate-slide-in-right">
          
          {/* ============================================================
              DRAWER HEADER: Title, Count Badge & Close Action
              ============================================================ */}
          <div className="p-6 border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal text-foreground leading-tight">
                  Selection Box
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {totalCount} {totalCount === 1 ? 'object curated' : 'objects curated'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              aria-label="Close selection box"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* ============================================================
              DRAWER BODY: Selection Items List or Empty State
              ============================================================ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              /* Thoughtful Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-border/80 flex items-center justify-center text-muted-foreground">
                  <Layers className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h4 className="font-serif text-xl font-normal text-foreground">
                    Your Selection Box is Empty
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Explore our showroom catalog and curate architectural pieces to prepare an official specification document.
                  </p>
                </div>
                <button
                  onClick={handleExploreCatalog}
                  className="mt-2 inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors shadow-subtle cursor-pointer"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
                  <span>CURATED OBJECTS</span>
                  <button
                    onClick={handleClearAll}
                    className="text-muted-foreground hover:text-destructive transition-colors text-[11px] cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {items.map(item => (
                  <div
                    key={item.id}
                    className="group bg-stone-50/70 hover:bg-stone-50 border border-border/80 rounded-xl p-3.5 flex gap-3.5 transition-all shadow-xs"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-200/80 shrink-0 border border-border/60">
                      <img
                        src={item.product.mainImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta & Controls */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                          <span>{item.product.code}</span>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.product.name)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <h4 className="font-serif text-sm font-normal text-foreground leading-tight truncate">
                          {item.product.name}
                        </h4>

                        {item.selectedOption && (
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            {item.selectedOption.colorHex && (
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-border shrink-0"
                                style={{ backgroundColor: item.selectedOption.colorHex }}
                              />
                            )}
                            <span className="truncate">{item.selectedOption.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Quantity & Valuation Row */}
                      <div className="pt-2 flex items-center justify-between border-t border-border/50">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden shadow-2xs">
                          <button
                            onClick={() => handleUpdateQty(item.id, item.product.name, item.quantity - 1)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item.id, item.product.name, item.quantity + 1)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toLocaleString()}{' '}
                          <span className="text-[10px] font-normal text-muted-foreground">USD</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================
              DRAWER FOOTER: Valuation Summary & Proceed to Review CTA
              ============================================================ */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border/80 bg-stone-50/50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs text-muted-foreground">
                  <span>Selected Objects</span>
                  <span className="font-mono">{totalCount} Pieces</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Estimated Selection Value
                  </span>
                  <span className="font-mono text-xl font-bold text-foreground">
                    ${totalValuation.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">USD</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToReview}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-foreground text-background hover:bg-stone-800 text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all shadow-card active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Prepare Specification Document</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Continue Browsing Showroom
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/80 font-mono text-center">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Generates professional client-ready architectural PDF</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

import React from 'react'
import {
  X,
  Plus,
  Minus,
  Trash2,
  FileText,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useShowroom } from '../../context/ShowroomContext'

export const ShoppingBoxDrawer: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    items,
    totalCount,
    totalValuation,
    updateQuantity,
    removeItem,
    clearBox,
    setIsReviewOpen,
  } = useShoppingBox()

  const { setInspectedProduct } = useShowroom()

  if (!isOpen) return null

  const handleOpenReview = () => {
    setIsOpen(false)
    setIsReviewOpen(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Curated Selection Box Drawer"
          className="w-screen max-w-md bg-card border-l border-border shadow-drawer flex flex-col justify-between animate-slide-in-right"
        >
          {/* 1. Header Bar */}
          <div className="p-6 border-b border-showroom-hairline flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary shadow-2xs">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-normal text-foreground">
                  Showroom Selection
                </h2>
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  {totalCount} {totalCount === 1 ? 'Specimen Curated' : 'Specimens Curated'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearBox}
                  className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-destructive px-2 py-1 transition-colors cursor-pointer"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 2. Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-secondary/40 border border-border/80 flex gap-4 items-center group shadow-2xs hover:shadow-subtle transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    onClick={() => {
                      setIsOpen(false)
                      setInspectedProduct(item.product)
                    }}
                    className="w-18 h-18 rounded-xl object-cover border border-border cursor-pointer shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                        {item.product.code}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                        title="Remove piece"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setIsOpen(false)
                        setInspectedProduct(item.product)
                      }}
                      className="font-serif text-base font-normal text-foreground group-hover:text-primary transition-colors truncate cursor-pointer"
                    >
                      {item.product.name}
                    </h4>

                    {item.selectedOption && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedOption.colorHex || '#ccc' }}
                        />
                        <span>{item.selectedOption.name}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        ${(item.product.price * item.quantity).toLocaleString()} USD
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-mono font-medium min-w-[1rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Calm Empty State */
              <div className="py-24 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-primary shadow-2xs">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <h3 className="font-serif text-xl font-normal text-foreground">
                    Your Selection is Empty
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Explore the permanent collection and curate specimens for your architectural project.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3. Footer & PDF Spec Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-showroom-hairline bg-card/80 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Estimated Valuation:
                  </span>
                  <span className="font-mono text-2xl font-semibold text-foreground">
                    ${totalValuation.toLocaleString()} USD
                  </span>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground leading-tight">
                  *Non-binding architectural specification estimate. Excludes freight &amp; custom crating.
                </p>
              </div>

              <button
                onClick={handleOpenReview}
                className="w-full py-4 bg-foreground text-background hover:bg-stone-800 rounded-xl text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Generate Architectural PDF Spec</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

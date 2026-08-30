import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface QuantityStepperProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onChangeQuantity: (qty: number) => void
  min?: number
  max?: number
  showTrashAtOne?: boolean
  className?: string
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onChangeQuantity,
  min = 1,
  max = 99,
  showTrashAtOne = true,
  className,
}) => {
  const [inputValue, setInputValue] = useState(String(quantity))

  // Keep internal input value in sync when external quantity updates
  useEffect(() => {
    setInputValue(String(quantity))
  }, [quantity])

  // Hold-to-repeat state management
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const repeatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasRepeatedRef = useRef<boolean>(false)
  const activeActionRef = useRef<(() => void) | null>(null)

  const stopHold = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current)
      repeatIntervalRef.current = null
    }
  }, [])

  const startHold = useCallback((action: () => void) => {
    stopHold()
    hasRepeatedRef.current = false
    activeActionRef.current = action

    // 550ms hold delay before repeat mode begins
    holdTimerRef.current = setTimeout(() => {
      hasRepeatedRef.current = true
      action() // 1st repeated increment
      repeatIntervalRef.current = setInterval(() => {
        if (activeActionRef.current) {
          activeActionRef.current()
        }
      }, 140) // Smooth continuous cadence
    }, 550)
  }, [stopHold])

  // Clean up timers on unmount
  useEffect(() => {
    return () => stopHold()
  }, [stopHold])

  const handleIncrementClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // If it was already triggered by a long-press hold, do not trigger an extra click
    if (hasRepeatedRef.current) {
      hasRepeatedRef.current = false
      return
    }
    if (quantity < max) {
      onIncrement()
    }
  }

  const handleDecrementClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // If it was already triggered by a long-press hold, do not trigger an extra click
    if (hasRepeatedRef.current) {
      hasRepeatedRef.current = false
      return
    }
    onDecrement()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    const num = parseInt(val, 10)
    if (!isNaN(num) && num >= min && num <= max) {
      onChangeQuantity(num)
    }
  }

  const handleInputBlur = () => {
    const num = parseInt(inputValue, 10)
    if (isNaN(num) || num < min) {
      setInputValue(String(min))
      onChangeQuantity(min)
    } else if (num > max) {
      setInputValue(String(max))
      onChangeQuantity(max)
    } else {
      setInputValue(String(num))
      onChangeQuantity(num)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const isAtMin = quantity <= min
  const isAtMax = quantity >= max

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "inline-flex items-center gap-1 sm:gap-1.5 bg-white/95 dark:bg-[#0b0e14] border border-emerald-500/80 rounded-full p-1 sm:p-1.5 shadow-[0_0_12px_rgba(16,185,129,0.32)] shrink-0 select-none",
        className
      )}
    >
      {/* Decrement / Remove button */}
      <button
        type="button"
        onClick={handleDecrementClick}
        onPointerDown={(e) => {
          e.stopPropagation()
          startHold(onDecrement)
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-90 touch-manipulation select-none",
          isAtMin && showTrashAtOne
            ? "bg-rose-500/15 hover:bg-rose-500/30 text-rose-500 dark:text-rose-400 border-rose-500/50 hover:border-rose-400 shadow-xs"
            : "bg-white dark:bg-[#141a26] hover:bg-slate-200 dark:hover:bg-[#1f293d] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-slate-700/70 shadow-xs"
        )}
        aria-label="Decrease quantity"
      >
        {isAtMin && showTrashAtOne ? (
          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-rose-500 dark:text-rose-400" />
        ) : (
          <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
        )}
      </button>

      {/* Editable Manual Input */}
      <input
        type="number"
        min={min}
        max={max}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="w-6 sm:w-7 text-xs sm:text-[13.5px] font-bold text-center text-emerald-600 dark:text-emerald-400 bg-transparent border-0 focus:outline-none focus:bg-emerald-500/10 focus:ring-1 focus:ring-emerald-400/60 rounded p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-text"
        aria-label="Item quantity"
      />

      {/* Increment button */}
      <button
        type="button"
        disabled={isAtMax}
        onClick={handleIncrementClick}
        onPointerDown={(e) => {
          e.stopPropagation()
          if (!isAtMax) {
            startHold(onIncrement)
          }
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-400/60 shadow-sm transition-all cursor-pointer active:scale-90 hover:shadow-[0_0_10px_rgba(16,185,129,0.55)] touch-manipulation select-none disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[3]" />
      </button>
    </div>
  )
}

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useShoppingBox } from '../../context/ShoppingBoxContext'

export const FloatingSelectionButton: React.FC = () => {
  const { setIsOpen, totalCount } = useShoppingBox()

  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          aria-label="Shopping Cart Trigger"
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1.5 bg-sky-500/25 rounded-full blur-md animate-pulse pointer-events-none" />

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 bg-[#161c28] hover:bg-[#1c2433] text-white px-5 py-3 rounded-full shadow-2xl border border-sky-500/30 transition-colors cursor-pointer group"
            aria-label={`Open Shopping Cart with ${totalCount} items`}
          >
            <ShoppingBag className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
            
            <span className="text-xs font-semibold tracking-wide">
              Cart
            </span>

            {/* Bouncy Badge Number */}
            <motion.span
              key={totalCount}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="bg-sky-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs"
            >
              {totalCount}
            </motion.span>
          </motion.button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}


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
          aria-label="Selection Box Trigger"
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Subtle Ambient Pulse Ring */}
          <div className="absolute -inset-1.5 bg-primary/25 rounded-full blur-md animate-pulse pointer-events-none" />

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 bg-foreground/95 backdrop-blur-md text-background hover:bg-stone-800 px-5 py-3.5 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/15 transition-colors cursor-pointer group"
            aria-label={`Open Curated Selection with ${totalCount} items`}
          >
            <ShoppingBag className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Curated Box
            </span>

            {/* Bouncy Badge Number */}
            <motion.span
              key={totalCount}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="bg-primary text-primary-foreground font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs"
            >
              {totalCount}
            </motion.span>
          </motion.button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

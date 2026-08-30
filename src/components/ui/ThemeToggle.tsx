import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn(
        "relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-90 shadow-sm shrink-0",
        isDark
          ? "bg-[#141a26] hover:bg-[#1a2233] border-slate-700/80 hover:border-sky-400 text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]"
          : "bg-slate-100 hover:bg-slate-200/90 border-slate-300 hover:border-amber-500 text-amber-600 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]",
        className
      )}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-icon"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.2] fill-sky-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="light-icon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.4] fill-amber-400/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

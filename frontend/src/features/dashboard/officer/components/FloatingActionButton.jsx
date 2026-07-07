import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export function FloatingActionButton({ onClick, label = 'Laporan Baru' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed right-6 bottom-6 z-30 flex items-center gap-3">
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg bg-navy px-3 py-1.5 text-sm font-medium tracking-[0.14px] text-white"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={label}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
      </motion.button>
    </div>
  )
}

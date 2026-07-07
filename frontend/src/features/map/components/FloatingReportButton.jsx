import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export function FloatingReportButton({ pendingCount = 3, onClick }) {
  return (
    <motion.button
      type="button"
      aria-label="Lapor sekarang"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto fixed right-4 bottom-4 z-20 flex items-center gap-2 rounded-full bg-[#BA1A1A] px-5 py-3 font-sans text-sm font-bold tracking-[0.5px] text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.25)] sm:absolute sm:top-6 sm:right-6 sm:bottom-auto sm:px-6 sm:py-3.5 sm:text-base"
    >
      <AlertTriangle size={18} aria-hidden="true" />
      Lapor Sekarang
      {pendingCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#BA1A1A]">
          {pendingCount}
        </span>
      )}
    </motion.button>
  )
}

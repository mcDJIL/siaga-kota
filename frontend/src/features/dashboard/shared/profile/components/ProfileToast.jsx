import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function ProfileToast({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          role="status"
          className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg sm:right-6 sm:left-auto sm:translate-x-0"
        >
          <CheckCircle2 className="h-4 w-4 text-brand-green-light" aria-hidden="true" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

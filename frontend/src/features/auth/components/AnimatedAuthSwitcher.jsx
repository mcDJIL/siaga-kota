import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function AnimatedAuthSwitcher({ children }) {
  const location = useLocation()

  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="flex w-full justify-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

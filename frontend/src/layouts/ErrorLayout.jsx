import { motion } from 'framer-motion'

export function ErrorLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-2 sm:px-4 py-2 sm:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {children}
      </motion.div>
    </div>
  )
}

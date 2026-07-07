import { motion } from 'framer-motion'
import { GoogleIcon } from './icons'

export function GoogleButton({ onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      aria-label="Masuk dengan Google"
      className="flex w-full items-center justify-center gap-4 rounded-lg border border-border-muted px-4 py-3 text-base text-text-body"
    >
      <GoogleIcon className="h-5 w-5" />
      Google
    </motion.button>
  )
}

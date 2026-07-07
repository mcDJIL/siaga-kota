import { motion } from 'framer-motion'
import { BellOff } from 'lucide-react'

export function NotificationEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-muted bg-bg-soft py-16 text-center"
    >
      <BellOff className="h-9 w-9 text-text-muted" aria-hidden="true" />
      <p className="text-base text-text-muted">Tidak ada notifikasi pada kategori ini.</p>
    </motion.div>
  )
}

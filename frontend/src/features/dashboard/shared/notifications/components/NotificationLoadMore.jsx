import { motion } from 'framer-motion'
import { History } from 'lucide-react'

export function NotificationLoadMore({ onLoadMore, hasMore, label = 'Menampilkan notifikasi hari ini' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-2 pt-8 text-center opacity-60"
    >
      <History className="h-9 w-9 text-text-muted" aria-hidden="true" />
      <p className="text-base text-text-muted">{label}</p>
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="pt-2 text-base font-bold text-navy hover:underline"
        >
          Muat lebih banyak
        </button>
      )}
    </motion.div>
  )
}

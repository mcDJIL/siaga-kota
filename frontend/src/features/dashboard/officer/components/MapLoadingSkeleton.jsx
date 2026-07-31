import { motion } from 'framer-motion'

export function MapLoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 z-10"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-300" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-navy" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-navy">Memuat peta...</p>
          <p className="text-xs text-text-muted">Mengambil data laporan dan petugas</p>
        </div>
      </div>
    </motion.div>
  )
}

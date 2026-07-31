import { motion } from 'framer-motion'

export function FloodStatisticCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col gap-2 rounded-xl bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-start justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-border-muted" />
        <div className="h-5 w-5 animate-pulse rounded bg-border-muted" />
      </div>

      <div className="flex items-baseline gap-2">
        <div className="h-8 w-16 animate-pulse rounded bg-border-muted" />
        <div className="h-4 w-12 animate-pulse rounded bg-border-muted" />
      </div>

      <div className="h-3 w-32 animate-pulse rounded bg-border-muted" />
    </motion.div>
  )
}

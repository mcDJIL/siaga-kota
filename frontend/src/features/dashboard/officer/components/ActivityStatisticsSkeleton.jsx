import { motion } from 'framer-motion'

export function ActivityStatisticsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-border-muted bg-bg-blue-soft p-4"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-10 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </motion.div>
  )
}

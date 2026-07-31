import { motion } from 'framer-motion'

export function TaskCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 rounded-xl border border-border-muted bg-white p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />

      <div className="flex items-center gap-2 pt-1">
        <div className="h-3 w-3 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 flex-1 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="flex gap-2 pt-1">
        <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </motion.div>
  )
}

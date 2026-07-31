import { motion } from 'framer-motion'

export function OfficerCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 rounded-xl border border-border-muted p-4"
    >
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
      </div>
    </motion.div>
  )
}

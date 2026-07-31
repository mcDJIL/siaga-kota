import { motion } from 'framer-motion'

export function ActivityMapSkeleton() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Map Area Skeleton */}
      <div className="relative flex-1 bg-gradient-to-b from-gray-100 to-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
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

        {/* Map Controls Skeleton */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-white shadow-sm" />
          <div className="h-10 w-10 animate-pulse rounded-lg bg-white shadow-sm" />
          <div className="h-10 w-10 animate-pulse rounded-lg bg-white shadow-sm" />
        </div>

        {/* Map Legend Skeleton */}
        <div className="absolute bottom-6 right-6 hidden flex-col gap-2 rounded-lg border border-navy/10 bg-white/90 p-3 shadow-sm sm:flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Layer Control Skeleton */}
        <div className="absolute bottom-24 left-6 flex flex-col gap-2 rounded-lg bg-white p-3 shadow-sm">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <aside className="hidden w-[400px] shrink-0 border-l border-border-muted bg-white lg:flex lg:flex-col">
        {/* Filter Panel Skeleton */}
        <div className="border-b border-border-muted p-4">
          <div className="flex flex-col gap-3">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex border-b border-border-muted">
          <div className="flex-1 px-4 py-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex-1 px-4 py-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col gap-2 rounded-xl border border-border-muted bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                <div className="flex gap-2 pt-2">
                  <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Skeleton */}
        <div className="border-t border-border-muted bg-bg-blue-soft p-4">
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
        </div>
      </aside>

      {/* Mobile Filter Button Skeleton */}
      <div className="fixed right-4 bottom-4 z-30 h-12 w-40 animate-pulse rounded-full bg-gray-300 lg:hidden" />
    </div>
  )
}

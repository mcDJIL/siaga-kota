import { motion } from 'framer-motion'
import { Image } from 'lucide-react'

export function FloodMonitoringCardSkeleton() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] print:hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-muted bg-bg-soft px-6 py-4">
        <div className="flex items-center gap-2">
          <Image className="h-[18px] w-[18px] text-navy" aria-hidden="true" />
          <div className="h-5 w-48 animate-pulse rounded bg-border-muted" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#BA1A1A]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-body">Prioritas Tinggi</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-navy" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-body">Pemantauan</span>
          </span>
          <div className="h-9 w-32 animate-pulse rounded-lg bg-border-muted" />
        </div>
      </div>

      <div className="relative h-[450px] bg-bg-blue-lighter flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-border-muted" />
          <p className="text-text-muted">Memuat peta...</p>
        </div>
      </div>
    </motion.section>
  )
}

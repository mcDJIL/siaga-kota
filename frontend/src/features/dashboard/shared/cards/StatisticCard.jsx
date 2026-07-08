import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'

export function StatisticCard({ icon: Icon, iconBg, iconColor, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 items-center gap-4 rounded-2xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', iconBg)}>
        <Icon className={cn('h-5 w-5', iconColor)} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">{label}</p>
        <p className="text-2xl font-semibold text-navy">{value}</p>
      </div>
    </motion.div>
  )
}

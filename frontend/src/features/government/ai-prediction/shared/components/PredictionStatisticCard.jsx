import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useCountUp } from '../../../dashboard/shared/components/DashboardSummaryCard'

export function PredictionStatisticCard({ icon: Icon, label, value, suffix = '', valueColor = 'text-navy', trendText, description }) {
  const count = useCountUp(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col gap-2 rounded-xl border border-[#C4C6CF]/30 bg-white p-5 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
        <span className="text-sm font-medium text-text-muted">{label}</span>
      </div>

      <div className="flex h-14 items-center gap-2">
        <span className={`font-heading text-5xl leading-[56px] font-bold tracking-[-0.96px] ${valueColor}`}>
          {count}
          {suffix}
        </span>
        {trendText && (
          <span className="flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-[#BA1A1A]">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {trendText}
          </span>
        )}
        {description && <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{description}</span>}
      </div>
    </motion.div>
  )
}

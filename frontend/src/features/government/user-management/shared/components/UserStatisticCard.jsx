import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useCountUp } from '../../../dashboard/shared/components/DashboardSummaryCard'
import { formatUserCount } from '../../utils/userFormatter'

export function UserStatisticCard({ icon: Icon, iconBg, iconColor, label, value, trendText, children }) {
  const isNumeric = typeof value === 'number'
  const count = useCountUp(isNumeric ? value : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 items-center gap-4 rounded-xl border border-[#C4C6CF]/30 bg-white p-6 shadow-sm"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-muted">{label}</span>
        {(value || value === 0) && (
          <div className="flex items-end gap-2">
            <span className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
              {isNumeric ? formatUserCount(count) : value}
            </span>
            {trendText && (
              <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-brand-green-dark">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                {trendText}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
}

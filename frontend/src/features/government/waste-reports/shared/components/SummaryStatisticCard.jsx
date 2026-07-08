import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { useCountUp } from '../../../dashboard/shared/components/DashboardSummaryCard'

export function SummaryStatisticCard({ statistic }) {
  const { label, value, staticValue, decimals = 0, icon: Icon, iconBg, iconColor, trend } = statistic
  const count = useCountUp(decimals ? Math.round(value * 10 ** decimals) : (value ?? 0))
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown
  const trendColor = trend?.direction === 'up' ? 'text-accent-green bg-accent-green/10' : 'text-[#BA1A1A] bg-[#BA1A1A]/10'

  const displayValue = staticValue ?? (decimals ? (count / 10 ** decimals).toFixed(decimals) : count.toLocaleString('en-US'))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col justify-between gap-4 rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)] backdrop-blur-[5px]"
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-full', iconBg)}>
          <Icon className={cn('h-[18px] w-[18px]', iconColor)} aria-hidden="true" />
        </span>
        {trend && (
          <span className={cn('flex items-center gap-1 rounded-full px-2 py-1', trendColor)}>
            <TrendIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px]">{trend.value}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium tracking-[0.14px] text-text-muted">{label}</p>
        <p className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
          {displayValue}
        </p>
      </div>
    </motion.div>
  )
}

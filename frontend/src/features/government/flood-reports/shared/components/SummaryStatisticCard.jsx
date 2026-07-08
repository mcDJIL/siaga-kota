import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { useCountUp } from '../../../dashboard/shared/components/DashboardSummaryCard'

export function SummaryStatisticCard({ statistic }) {
  const { label, value, unit, total, icon: Icon, iconBg, iconColor, trend, showProgress, footnote } = statistic
  const count = useCountUp(value)
  const progress = total ? Math.round((value / total) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col gap-1 rounded-2xl border border-border-muted/20 bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} aria-hidden="true" />
        </span>
        {trend && (
          <span className={cn('flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold tracking-[0.6px]', trend.className)}>
            {trend.value}
          </span>
        )}
      </div>

      <p className="pt-3 text-sm font-medium tracking-[0.14px] text-text-muted">{label}</p>

      <div className="flex items-end gap-1">
        <p className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
          {count.toLocaleString('en-US')}
        </p>
        {unit && <span className="pb-0.5 text-xl font-semibold tracking-[-0.32px] text-text-muted">{unit}</span>}
      </div>

      {showProgress && (
        <div className="mt-2 h-1.5 w-full rounded-full bg-[#D3E4FE]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-1.5 rounded-full bg-brand-green"
          />
        </div>
      )}

      {footnote && (
        <div className="mt-2 flex items-center gap-1 text-navy">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.6px]">{footnote}</span>
        </div>
      )}
    </motion.div>
  )
}

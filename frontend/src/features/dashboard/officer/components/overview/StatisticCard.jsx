import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'
import { STATISTIC_ICONS } from './statisticIcons'

export function StatisticCard({ statistic }) {
  const Icon = STATISTIC_ICONS[statistic.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'flex flex-1 flex-col gap-4 rounded-2xl border-l-4 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]',
        statistic.borderColor
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-lg', statistic.iconBg)}>
          <Icon className={cn('h-5 w-5', statistic.iconColor)} aria-hidden="true" />
        </span>
        <span className={cn('text-xs font-bold tracking-[0.6px] uppercase', statistic.badgeColor)}>
          {statistic.badgeText}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium tracking-[0.14px] text-text-muted">{statistic.label}</p>
        <p className="font-heading text-5xl font-bold tracking-tight text-navy">{statistic.value}</p>
      </div>
    </motion.div>
  )
}

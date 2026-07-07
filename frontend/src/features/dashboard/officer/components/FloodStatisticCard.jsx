import { motion } from 'framer-motion'
import { AlertTriangle, Radio, Timer, Waves } from 'lucide-react'
import { cn } from '../../../../lib/cn'

const ICONS = { alertTriangle: AlertTriangle, waves: Waves, radio: Radio, timer: Timer }

const TREND_STYLES = {
  danger: 'text-[#BA1A1A]',
  success: 'text-brand-green',
  neutral: 'text-navy-lighter',
  muted: 'text-text-muted',
}

const ICON_STYLES = {
  danger: 'text-[#BA1A1A]',
  success: 'text-brand-green',
  neutral: 'text-navy',
  muted: 'text-navy',
}

export function FloodStatisticCard({ statistic }) {
  const Icon = ICONS[statistic.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'flex flex-1 flex-col gap-2 rounded-xl bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]',
        statistic.borderAccent && 'border-l-4 border-[#BA1A1A]'
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-base text-text-muted">{statistic.label}</p>
        <Icon className={cn('h-5 w-5 shrink-0', ICON_STYLES[statistic.trendVariant])} aria-hidden="true" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-heading text-3xl font-semibold tracking-tight text-navy">{statistic.value}</span>
        <span className={cn('text-base', TREND_STYLES[statistic.trendVariant])}>{statistic.trend}</span>
      </div>

      <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">{statistic.helper}</p>
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '../../../../../lib/cn'

export function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = null
    let frameId

    function step(timestamp) {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration])

  return value
}

const TREND_COLORS = {
  success: 'text-brand-green',
  danger: 'text-[#BA1A1A]',
}

export function DashboardSummaryCard({ statistic }) {
  const { label, value, icon: Icon, iconBg, iconColor, trend, description } = statistic
  const count = useCountUp(value)
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col justify-between gap-6 rounded-xl border border-bg-blue-lighter bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium tracking-[0.14px] text-text-muted">{label}</p>
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-heading text-5xl leading-[56px] font-bold tracking-[-0.96px] text-text-body">
          {count.toLocaleString('en-US')}
        </p>
        {trend ? (
          <div className={cn('flex items-center gap-1', TREND_COLORS[trend.color])}>
            <TrendIcon className="h-[11px] w-[11px]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px]">{trend.text}</span>
          </div>
        ) : (
          <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">{description}</p>
        )}
      </div>
    </motion.div>
  )
}

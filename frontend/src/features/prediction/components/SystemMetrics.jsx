import { motion } from 'framer-motion'
import { systemMetrics } from '../data/systemMetrics'
import { SignalIcon, SyncIcon, TargetIcon } from './icons'

const ICONS = {
  signal: SignalIcon,
  sync: SyncIcon,
  target: TargetIcon,
}

export function SystemMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-3 sm:px-8"
    >
      {systemMetrics.map((metric) => {
        const IconComponent = ICONS[metric.icon]
        return (
          <div
            key={metric.label}
            className="flex flex-col items-center rounded-2xl border border-border-muted/30 bg-white p-6 text-center shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)]"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${metric.iconBg}`}>
              <IconComponent className={`h-6 w-6 ${metric.iconColor}`} />
            </div>
            <span className="pt-4 font-sans text-2xl font-bold text-navy">{metric.value}</span>
            <span className="text-base font-medium text-text-muted">{metric.label}</span>
          </div>
        )
      })}
    </motion.div>
  )
}

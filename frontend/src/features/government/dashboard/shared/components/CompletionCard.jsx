import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCountUp } from './DashboardSummaryCard'

export function CompletionCard({ stat }) {
  const count = useCountUp(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="relative flex flex-1 flex-col justify-between gap-6 overflow-hidden rounded-xl bg-brand-green p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <CheckCircle2
        className="absolute -top-4 -right-4 h-28 w-28 text-white opacity-20"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <p className="relative text-sm font-medium tracking-[0.14px] text-brand-green-lighter">{stat.label}</p>

      <div className="relative flex flex-col gap-1">
        <p className="font-heading text-5xl leading-[56px] font-bold tracking-[-0.96px] text-white">{count}%</p>
        <p className="text-xs font-semibold tracking-[0.6px] text-brand-green-lighter">{stat.description}</p>
      </div>
    </motion.div>
  )
}

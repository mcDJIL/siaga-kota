import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export function PredictionAlertCard({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-start gap-3 rounded-r-xl border-l-4 border-[#BA1A1A] bg-[#BA1A1A]/10 p-4 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)]"
    >
      <AlertTriangle className="mt-0.5 h-[21px] w-[22px] shrink-0 text-[#BA1A1A]" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold text-[#93000A]">{title}</h4>
        <p className="text-base text-text-muted">{description}</p>
      </div>
    </motion.div>
  )
}

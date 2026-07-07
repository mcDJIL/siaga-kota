import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export function EmergencyBadge() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      transition={{ scale: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#BA1A1A] px-3 py-1 text-sm font-semibold tracking-[0.5px] text-white uppercase"
    >
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
      Darurat
    </motion.span>
  )
}

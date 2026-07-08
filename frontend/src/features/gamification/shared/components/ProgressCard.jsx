import { motion } from 'framer-motion'
import { TreeDeciduous } from 'lucide-react'

export function ProgressCard({ treeNumber, currentXp, targetXp, description }) {
  const percentage = Math.min(100, Math.round((currentXp / targetXp) * 100))
  const remainingXp = Math.max(0, targetXp - currentXp)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col justify-between gap-6 rounded-3xl border border-border-muted/30 bg-white p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] lg:col-span-5"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-navy">Target Penanaman Pohon</h3>
        <p className="text-base text-text-muted">{description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <TreeDeciduous className="h-6 w-6 text-brand-green" aria-hidden="true" />
            <span className="text-base font-bold text-navy">Pohon ke-{treeNumber}</span>
          </div>
          <span className="text-base font-bold text-brand-green">{percentage}%</span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-[#D3E4FE]" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-brand-green"
          />
        </div>

        <p className="text-xs font-semibold tracking-[0.6px] text-text-muted italic">
          Kurang {remainingXp.toLocaleString('id-ID')} XP lagi untuk pohon berikutnya!
        </p>
      </div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const XP_PER_REPORT = 100
const TARGET_XP_PER_LEVEL = 1000

function calculateBadgeProgress(totalReports) {
  const currentXp = totalReports * XP_PER_REPORT
  const level = Math.floor(currentXp / TARGET_XP_PER_LEVEL) + 1
  const targetXp = level * TARGET_XP_PER_LEVEL
  const reportsNeeded = Math.max(0, Math.ceil((targetXp - currentXp) / XP_PER_REPORT))

  return {
    currentXp,
    targetXp,
    level,
    reportsNeeded,
  }
}

export function CitizenBadgeProgress({ totalReports = 0 }) {
  const { currentXp, targetXp, level, reportsNeeded } = calculateBadgeProgress(totalReports)
  const progress = Math.min(100, Math.round((currentXp / targetXp) * 100))

  const title = `Menuju Level ${level + 1}`
  const description = `Lakukan ${reportsNeeded} laporan lagi untuk naik level!`

  return (
    <section
      aria-label="Progres badge gamifikasi"
      className="relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-navy p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
    >
      <Award className="pointer-events-none absolute -top-4 -right-4 h-32 w-32 text-white/10" aria-hidden="true" />

      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <p className="pb-4 text-base text-white/80">{description}</p>

      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-brand-green-lighter"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold tracking-[0.6px] text-white">
          {currentXp.toLocaleString('id-ID')} / {targetXp.toLocaleString('id-ID')} XP
        </span>
        <span className="text-xs font-bold tracking-[0.6px] text-brand-green-lighter">Level {level}</span>
      </div>

      <div className="flex justify-center pt-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green-lighter bg-brand-green-lighter/20">
          <Award className="h-6 w-6 text-brand-green-lighter" aria-hidden="true" />
        </span>
      </div>
    </section>
  )
}

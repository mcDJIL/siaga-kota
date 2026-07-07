import { motion } from 'framer-motion'
import { ImpactIconReports, ImpactIconTrees, ImpactIconVillage } from './icons'

const IMPACT_ICONS = {
  village: ImpactIconVillage,
  reports: ImpactIconReports,
  trees: ImpactIconTrees,
}

export function ImpactCard({ statistic }) {
  const Icon = IMPACT_ICONS[statistic.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-white/10 p-10 text-center backdrop-blur-[2px] sm:p-16"
    >
      <Icon className="h-9 w-11" />
      <span className="font-heading text-4xl font-bold text-white sm:text-5xl" data-count-up={statistic.value}>
        {statistic.value}
        {statistic.suffix}
      </span>
      <span className="text-lg font-semibold text-white/80 sm:text-xl">{statistic.label}</span>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { ValueIconCommunity, ValueIconInnovation, ValueIconSustainability } from './icons'

const VALUE_ICONS = {
  innovation: ValueIconInnovation,
  community: ValueIconCommunity,
  sustainability: ValueIconSustainability,
}

export function ValueCard({ value }) {
  const Icon = VALUE_ICONS[value.icon]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-6 rounded-xl border border-border-muted/30 bg-bg-blue-soft p-6"
    >
      <Icon className="h-[58px] w-[52px] shrink-0" />
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-2xl font-semibold text-navy">{value.title}</h3>
        <p className="text-base leading-6 text-text-muted">{value.description}</p>
      </div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { CheckIcon, TechIconKotaConnect, TechIconSiagaEngine } from './icons'
import { cn } from '../../../lib/cn'

const TECH_ICONS = {
  'siaga-engine': TechIconSiagaEngine,
  'kota-connect': TechIconKotaConnect,
}

export function TechnologyCard({ technology }) {
  const Icon = TECH_ICONS[technology.icon]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 flex-col gap-4 rounded-2xl border border-border-muted/20 bg-white p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:p-16"
    >
      <span className={cn('flex h-16 w-16 items-center justify-center rounded-2xl', technology.iconBg)}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="pt-2 font-heading text-2xl font-semibold text-navy">{technology.title}</h3>
      <p className="text-base leading-[1.625] text-text-muted">{technology.description}</p>
      <ul className="flex flex-col gap-2 pt-2">
        {technology.features.map((feature) => (
          <li key={feature} className={cn('flex items-center gap-2 text-base', technology.accentColor)}>
            <CheckIcon className="h-[17px] w-[17px]" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

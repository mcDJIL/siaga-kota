import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'

const STATUS_STYLES = {
  Critical: {
    border: 'border-[#FFDAD6]',
    bg: 'bg-[#FFDAD6]/10',
    badge: 'bg-[#BA1A1A] text-white',
    bar: '#BA1A1A',
  },
  Monitor: {
    border: 'border-[#C9A82C]/30',
    bg: 'bg-[#C9A82C]/10',
    badge: 'bg-[#C9A82C] text-[#4D3E00]',
    bar: '#C9A82C',
  },
}

export function RiskDistrictCard({ district, isActive, onSelect }) {
  const styles = STATUS_STYLES[district.status] ?? STATUS_STYLES.Monitor

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(district.id)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border p-3 text-left transition-colors',
        styles.border,
        styles.bg,
        isActive && 'ring-2 ring-navy/40'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-text-body">{district.name}</h4>
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{district.label}</span>
        </div>
        <span className={cn('rounded px-2 py-1 text-xs font-semibold tracking-[0.6px]', styles.badge)}>
          {district.status}
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-bg-blue-light">
        <div
          className="h-1.5 rounded-full transition-[width] duration-500"
          style={{ width: `${district.riskScore}%`, backgroundColor: styles.bar }}
        />
      </div>

      <p className="text-xs leading-4 text-text-muted">
        <span className="font-bold text-text-body">Action:</span> {district.action}
      </p>
    </motion.button>
  )
}

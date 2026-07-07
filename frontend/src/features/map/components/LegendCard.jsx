import { motion } from 'framer-motion'
import { Trash2, Droplets, Recycle } from 'lucide-react'
import { legendItems } from '../data/legendData'

const ICONS = { trash: Trash2, droplets: Droplets, recycle: Recycle }

function LegendSwatch({ item }) {
  if (item.type === 'marker') {
    const IconComponent = ICONS[item.icon]
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: item.color }}
      >
        <IconComponent size={14} />
      </span>
    )
  }

  if (item.type === 'line') {
    return <span className="h-0 w-8 shrink-0 border-b-2 border-dashed" style={{ borderColor: item.color }} />
  }

  return (
    <span
      className="h-8 w-8 shrink-0 rounded"
      style={{ backgroundColor: `${item.color}33`, border: `1px solid ${item.color}66` }}
    />
  )
}

export function LegendCard({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={`pointer-events-auto flex w-64 flex-col gap-4 rounded-2xl border border-border-muted bg-white/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[2px] ${className ?? ''}`}
    >
      <h3 className="border-b border-bg-blue-light pb-2 font-heading text-base font-bold text-navy">Legenda Peta</h3>
      <ul className="flex flex-col gap-2">
        {legendItems.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <LegendSwatch item={item} />
            <span className="text-sm font-medium tracking-[0.14px] text-text-muted">{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

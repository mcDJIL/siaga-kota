import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, ChevronDown } from 'lucide-react'

const LEGEND_ITEMS = [
  { key: 'riskZones', label: 'AI Flood Prediction', color: '#BA1A1A' },
  { key: 'tps', label: 'TPS / Waste Bank', color: '#74777F' },
  { key: 'evacuation', label: 'Evacuation Route', color: '#00522F' },
]

export function MapLegend({ className = '', wasteCount = 0, floodCount = 0 }) {
  const reportLegendItems = [
    { key: 'waste', label: 'Waste Reports', color: '#006D40', count: wasteCount },
    { key: 'flood', label: 'Flood Reports', color: '#455F88', count: floodCount },
  ]
  const legendItems = [...reportLegendItems, ...LEGEND_ITEMS]
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`z-50 pointer-events-auto w-64 rounded-2xl border border-white/30 bg-white/85 p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-6 ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between font-display text-base text-navy lg:cursor-default"
      >
        Legend
        <span className="flex items-center gap-1 lg:hidden">
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </span>
        <Info size={20} className="hidden text-badge-neutral lg:block" aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="mt-4 flex flex-col gap-4">
              {legendItems.map((item) => (
                <li key={item.key} className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 0 4px ${item.color}33` }}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm text-text-muted sm:text-base">{item.label}</span>
                  {item.count != null && (
                    <span className="text-xs font-bold tracking-[0.6px]" style={{ color: item.color }}>
                      {item.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

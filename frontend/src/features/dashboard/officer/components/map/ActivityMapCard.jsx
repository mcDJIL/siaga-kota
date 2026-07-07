import { motion } from 'framer-motion'
import { Navigation } from 'lucide-react'
import { DashboardMapContainer } from './DashboardMapContainer'
import { ROUTE_TO_ACTIVE_TASK } from '../../data/mapData'

export function ActivityMapCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-80 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-bg-blue-light px-4 py-4">
        <h3 className="text-sm font-bold text-navy">Pantauan Peta Tugas</h3>
        <span className="rounded-full bg-brand-green-lighter px-2 py-0.5 text-[10px] font-bold text-[#002110]">
          4 AKTIF
        </span>
      </div>

      <div className="relative flex-1 bg-bg-blue-lighter">
        <DashboardMapContainer />

        <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-lg border border-navy/10 bg-white/90 p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-sm">
          <span className="flex items-center gap-2">
            <Navigation className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
            <span className="text-[11px] font-bold text-text-body">{ROUTE_TO_ACTIVE_TASK.label}</span>
          </span>
          <button
            type="button"
            className="pointer-events-auto rounded bg-navy px-3 py-1 text-[10px] font-bold tracking-[0.25px] text-white uppercase"
          >
            Mulai
          </button>
        </div>
      </div>
    </motion.div>
  )
}

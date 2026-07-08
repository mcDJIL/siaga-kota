import { motion } from 'framer-motion'
import { AlertTriangle, LifeBuoy, Settings2 } from 'lucide-react'

const LEGEND_ITEMS = [
  { icon: AlertTriangle, label: 'Zona Siaga' },
  { icon: LifeBuoy, label: 'Bantuan' },
  { icon: Settings2, label: 'Pengaturan' },
]

export function FloodStatisticsPanel({ statistics }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="pointer-events-auto flex w-48 flex-col gap-3 rounded-lg border border-white/50 bg-white/90 p-3 text-xs text-text-body shadow-md backdrop-blur-sm"
    >
      <ul className="flex flex-col gap-1.5">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-text-muted">
            <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-1.5 border-t border-border-muted/30 pt-2">
        <div>
          <p className="text-[10px] text-text-muted">Total Laporan Hari Ini</p>
          <p className="text-lg font-bold text-navy">{statistics.todayReports}</p>
        </div>
        <div>
          <p className="text-[10px] text-text-muted">Titik Banjir Aktif</p>
          <p className="text-lg font-bold text-navy">{statistics.activeFloodPoints}</p>
        </div>
        <div>
          <p className="text-[10px] text-text-muted">Status Siaga</p>
          <p className="text-sm font-bold text-[#BA1A1A]">{statistics.alertStatus}</p>
        </div>
      </div>
    </motion.div>
  )
}

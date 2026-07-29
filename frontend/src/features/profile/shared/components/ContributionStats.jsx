import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

export function ContributionStats({ stats, profile }) {
  const dynamicStats = profile ? [
    {
      id: 'total-laporan',
      label: 'Total Laporan',
      value: Math.min(100, (profile.totalReports / 50) * 100),
      actual: profile.totalReports,
    },
    {
      id: 'laporan-selesai',
      label: 'Laporan Selesai',
      value: profile.totalReports > 0 ? Math.min(100, (profile.completedReports / profile.totalReports) * 100) : 0,
      actual: profile.completedReports,
    },
  ] : stats || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-navy" aria-hidden="true" />
        <h3 className="text-sm font-medium text-navy">Statistik Kontribusi</h3>
      </div>

      <div className="flex flex-col gap-4">
        {dynamicStats.map((stat) => (
          <div key={stat.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{stat.label}</span>
              <span className="text-xs font-bold tracking-[0.6px] text-navy">{Math.round(stat.value)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-blue-light">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.value}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-navy"
              />
            </div>
            {stat.actual !== undefined && (
              <span className="text-[10px] text-text-muted">{stat.actual} items</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

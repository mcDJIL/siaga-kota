import { motion } from 'framer-motion'

export function RecentPointActivity({ activities }) {
  const latestActivities = activities.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <h3 className="text-sm font-medium text-navy">Riwayat Poin Terakhir</h3>

      <div className="flex flex-col gap-3">
        {latestActivities.map((activity, index) => {
          const Icon = activity.icon
          const isLast = index === latestActivities.length - 1
          return (
            <div
              key={activity.id}
              className={`flex items-center justify-between gap-2 ${isLast ? '' : 'border-b border-bg-blue-light pb-3'}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3 w-3 text-brand-green-dark" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text-body">{activity.label}</span>
                  <span className="text-xs text-text-muted">{activity.date}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-brand-green-dark">+{activity.points}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

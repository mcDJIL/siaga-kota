import { motion } from 'framer-motion'
import { Switch } from '../../../../components/ui/Switch'

export function NotificationSettingsCard({ notifications, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col gap-6 rounded-2xl border border-[#DCE9FF] bg-white p-6 shadow-sm"
    >
      <h2 className="border-b border-[#C4C6CF]/50 pb-4 text-xl font-semibold text-navy">Pengaturan Notifikasi</h2>

      <div className="flex flex-col gap-6">
        {notifications.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-text-body">{item.label}</span>
              <span className="text-sm text-text-muted">{item.description}</span>
            </div>
            <Switch checked={item.checked} onChange={() => onToggle(item.id)} label={item.label} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

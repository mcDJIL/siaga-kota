import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { Switch } from '../../../../components/ui/Switch'

export function NotificationSettings({ settings, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-navy" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-text-body">Notification Settings</h2>
      </div>

      <div className="flex flex-col gap-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-base text-text-body">{setting.title}</span>
              <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{setting.description}</span>
            </div>
            <Switch checked={setting.enabled} onChange={() => onToggle(setting.id)} label={setting.title} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

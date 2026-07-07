import { motion } from 'framer-motion'
import { AlertTriangle, Bell, FileText } from 'lucide-react'
import { NotificationToggle } from './NotificationToggle'

const ICON_MAP = {
  file: FileText,
  alert: AlertTriangle,
  system: Bell,
}

export function NotificationPreferenceCard({ preferences, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-2 border-b border-border-muted pb-4">
        <Bell className="h-5 w-5 text-navy" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-text-body">Pengaturan Notifikasi</h3>
      </div>

      <div className="flex flex-col gap-4">
        {preferences.map((preference) => {
          const Icon = ICON_MAP[preference.icon] ?? Bell
          return (
            <div key={preference.id} className="flex items-center justify-between gap-4 rounded-lg p-2">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${preference.iconBg}`}>
                  <Icon className={`h-4 w-4 ${preference.iconColor}`} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-text-body">{preference.title}</span>
                  <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{preference.description}</span>
                </div>
              </div>

              <NotificationToggle
                checked={preference.enabled}
                onChange={() => onToggle(preference.id)}
                label={preference.title}
              />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

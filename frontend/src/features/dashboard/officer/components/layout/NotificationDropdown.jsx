import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { NOTIFICATIONS } from '../../data/dashboardData'

export function NotificationDropdown({ notifications = NOTIFICATIONS }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Buka notifikasi"
        aria-expanded={isOpen}
        className="relative flex items-center justify-center rounded-full p-2 text-text-muted hover:bg-bg-blue-soft"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#BA1A1A]" aria-hidden="true" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Tutup notifikasi"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-border-muted/30 bg-white p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
            >
              <p className="px-3 py-2 text-sm font-semibold text-navy">Notifikasi</p>
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-bg-soft">
                    <span className="text-sm font-semibold text-text-body">{notification.title}</span>
                    <span className="text-xs text-text-muted">{notification.description}</span>
                    <span className="text-xs text-badge-neutral">{notification.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
export function NotificationDropdown({ notifications: initialNotifications = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

  useEffect(() => {
    function handleFloodNotification(event) {
      setNotifications((current) => [event.detail, ...current].slice(0, 5))
    }

    window.addEventListener('siagakota:flood-notification', handleFloodNotification)

    return () => window.removeEventListener('siagakota:flood-notification', handleFloodNotification)
  }, [])

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
              className="fixed inset-x-2 top-[4.5rem] z-50 w-auto max-w-[calc(100vw-1rem)] rounded-xl border border-border-muted/30 bg-white p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] sm:absolute sm:inset-x-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-80"
            >
              <p className="px-3 py-2 text-sm font-semibold text-navy">Notifikasi</p>
              <div className="flex flex-col">
                {notifications.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-text-muted">Belum ada notifikasi.</p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-bg-soft">
                      <span className="text-sm font-semibold text-text-body">{notification.title}</span>
                      <span className="text-xs text-text-muted">{notification.description}</span>
                      <span className="text-xs text-badge-neutral">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'
import { NotificationCard } from '../../../shared/notifications/components/NotificationCard'
import { NotificationEmptyState } from '../../../shared/notifications/components/NotificationEmptyState'

export function NotificationList({ notifications, onViewDetail, onHide, onMarkRead, onConfirm, onComplete }) {
  if (notifications.length === 0) {
    return <NotificationEmptyState />
  }

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onViewDetail={onViewDetail}
            onHide={onHide}
            onMarkRead={onMarkRead}
            onConfirm={onConfirm}
            onComplete={onComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

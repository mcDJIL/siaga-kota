import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationHeader } from '../components/notifications/NotificationHeader'
import { NotificationCategoryTabs } from '../components/notifications/NotificationCategoryTabs'
import { NotificationList } from '../components/notifications/NotificationList'
import { NotificationFilter } from '../../shared/notifications/components/NotificationFilter'
import { NotificationLoadMore } from '../../shared/notifications/components/NotificationLoadMore'
import { INITIAL_NOTIFICATIONS, MORE_NOTIFICATIONS } from '../data/notificationData'
import { READ_STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/notificationTabs'

export function OfficerNotificationPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState('semua')
  const [readStatus, setReadStatus] = useState('semua')
  const [priority, setPriority] = useState('semua')
  const [hasMore, setHasMore] = useState(true)

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (notification.status === 'hidden') return false
      if (activeTab !== 'semua' && notification.category !== activeTab) return false
      if (readStatus !== 'semua') {
        const isRead = notification.status !== 'unread'
        if (readStatus === 'unread' && isRead) return false
        if (readStatus === 'read' && !isRead) return false
      }
      if (priority !== 'semua' && notification.priority !== priority) return false
      return true
    })
  }, [notifications, activeTab, readStatus, priority])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.status === 'unread').length,
    [notifications]
  )

  const updateStatus = (id, status) => {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const handleViewDetail = (notification) => {
    if (notification.status === 'unread') {
      updateStatus(notification.id, 'read')
    }
    if (notification.reportRoute) {
      navigate(notification.reportRoute)
    }
  }

  const handleLoadMore = () => {
    setNotifications((current) => [...current, ...MORE_NOTIFICATIONS])
    setHasMore(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <NotificationHeader unreadCount={unreadCount} />

      <div className="flex flex-col gap-4">
        <NotificationCategoryTabs activeTab={activeTab} onChange={setActiveTab} />
        <NotificationFilter
          readStatus={readStatus}
          onReadStatusChange={setReadStatus}
          readStatusOptions={READ_STATUS_OPTIONS}
          priority={priority}
          onPriorityChange={setPriority}
          priorityOptions={PRIORITY_OPTIONS}
        />
      </div>

      <NotificationList
        notifications={filteredNotifications}
        onViewDetail={handleViewDetail}
        onHide={(id) => updateStatus(id, 'hidden')}
        onMarkRead={(id) => updateStatus(id, 'read')}
        onConfirm={(id) => updateStatus(id, 'confirmed')}
        onComplete={(id) => updateStatus(id, 'completed')}
      />

      <NotificationLoadMore onLoadMore={handleLoadMore} hasMore={hasMore} />
    </div>
  )
}

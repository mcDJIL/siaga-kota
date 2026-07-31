import { useNavigate } from 'react-router-dom'
import { NotificationHeader } from '../components/notifications/NotificationHeader'
import { NotificationCategoryTabs } from '../components/notifications/NotificationCategoryTabs'
import { NotificationList } from '../components/notifications/NotificationList'
import { NotificationFilter } from '../../shared/notifications/components/NotificationFilter'
import { NotificationLoadMore } from '../../shared/notifications/components/NotificationLoadMore'
import { NotificationLoadingSkeleton } from '../../shared/notifications/components/NotificationLoadingSkeleton'
import { useOfficerNotifications } from '../hooks/useOfficerNotifications'
import { READ_STATUS_OPTIONS, PRIORITY_OPTIONS, NOTIFICATION_TABS } from '../data/notificationTabs'

export function OfficerNotificationPage() {
  const navigate = useNavigate()
  const {
    notifications,
    loading,
    error,
    page,
    hasMore,
    filters,
    unreadCount,
    setPage,
    updateFilters,
    markAsRead,
    confirm,
    hide,
  } = useOfficerNotifications()

  const handleViewDetail = (notification) => {
    if (notification.status === 'unread') {
      markAsRead(notification.id)
    }
    if (notification.reportRoute) {
      navigate(notification.reportRoute)
    }
  }

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleCategoryChange = (category) => {
    updateFilters({
      ...filters,
      category,
    })
  }

  const handleReadStatusChange = (status) => {
    updateFilters({
      ...filters,
      status,
    })
  }

  const handlePriorityChange = (priority) => {
    updateFilters({
      ...filters,
      priority,
    })
  }

  if (loading && notifications.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-8">
        <NotificationHeader unreadCount={0} />
        <NotificationLoadingSkeleton />
      </div>
    )
  }

  if (error && notifications.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-8">
        <NotificationHeader unreadCount={0} />
        <div className="flex items-center justify-center rounded-lg border border-border-muted bg-bg-soft p-8">
          <p className="text-center text-text-muted">
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <NotificationHeader unreadCount={unreadCount} />

      <div className="flex flex-col gap-4">
        <NotificationCategoryTabs activeTab={filters.category} onChange={handleCategoryChange} />
        <NotificationFilter
          readStatus={filters.status}
          onReadStatusChange={handleReadStatusChange}
          readStatusOptions={READ_STATUS_OPTIONS}
          priority={filters.priority}
          onPriorityChange={handlePriorityChange}
          priorityOptions={PRIORITY_OPTIONS}
        />
      </div>

      <NotificationList
        notifications={notifications}
        onViewDetail={handleViewDetail}
        onHide={hide}
        onMarkRead={markAsRead}
        onConfirm={confirm}
      />

      {loading && notifications.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border-muted border-t-navy" />
        </div>
      )}

      {!loading && hasMore && (
        <NotificationLoadMore onLoadMore={handleLoadMore} hasMore={hasMore} />
      )}
    </div>
  )
}

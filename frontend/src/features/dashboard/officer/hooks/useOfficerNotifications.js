import { useState, useEffect } from 'react'
import { fetchNotifications, markNotificationAsRead, confirmNotification, hideNotification } from '../../../../services/notification.service'

export function useOfficerNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({
    category: 'semua',
    status: 'semua',
    priority: 'semua',
  })

  useEffect(() => {
    let mounted = true

    async function loadNotifications() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchNotifications({
          category: filters.category,
          status: filters.status,
          priority: filters.priority,
          page,
          perPage: 20,
        })

        if (mounted) {
          const notificationData = response?.data?.notifications || []
          if (page === 1) {
            setNotifications(notificationData)
          } else {
            setNotifications((prev) => [...prev, ...notificationData])
          }

          const total = response?.data?.total || 0
          const loaded = (page * 20) + notificationData.length
          setHasMore(loaded < total)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Gagal memuat notifikasi')
          console.error('Error loading notifications:', err)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadNotifications()

    return () => {
      mounted = false
    }
  }, [page, filters])

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      setNotifications((current) =>
        current.map((item) => (item.id === id ? { ...item, status: 'read' } : item))
      )
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  const handleConfirm = async (id) => {
    try {
      await confirmNotification(id)
      setNotifications((current) =>
        current.map((item) => (item.id === id ? { ...item, status: 'confirmed' } : item))
      )
    } catch (err) {
      console.error('Error confirming notification:', err)
    }
  }

  const handleHide = async (id) => {
    try {
      await hideNotification(id)
      setNotifications((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Error hiding notification:', err)
    }
  }

  const handleUpdateFilter = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => n.status === 'unread').length

  return {
    notifications,
    loading,
    error,
    page,
    hasMore,
    filters,
    unreadCount,
    setPage,
    updateFilters: handleUpdateFilter,
    markAsRead: handleMarkAsRead,
    confirm: handleConfirm,
    hide: handleHide,
  }
}

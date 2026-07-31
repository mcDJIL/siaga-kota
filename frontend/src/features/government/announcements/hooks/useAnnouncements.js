import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  publishAnnouncement,
} from '../../../../services/announcement.service'

const PAGE_SIZE = 5

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    loadAnnouncements()
  }, [page, statusFilter, searchQuery])

  async function loadAnnouncements() {
    try {
      setIsLoading(true)
      const params = {
        per_page: PAGE_SIZE,
        page,
      }

      if (statusFilter !== 'Semua') {
        params.status = statusFilter
      }

      if (searchQuery.trim()) {
        params.search = searchQuery
      }

      const response = await getAnnouncements(params)

      // Handle different response structures
      const announcements = response.data?.announcements || response.data || []
      const total = response.data?.total || response.meta?.total || (Array.isArray(announcements) ? announcements.length : 0)

      setAnnouncements(Array.isArray(announcements) ? announcements : [])
      setTotalCount(typeof total === 'number' ? total : 0)
    } catch (error) {
      console.error('Error loading announcements:', error)
      toast.error('Gagal memuat pengumuman')
    } finally {
      setIsLoading(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  function handleStatusFilterChange(value) {
    setStatusFilter(value)
    setPage(1)
    toast.success('Filter berhasil diterapkan.')
  }

  async function handlePublish(announcementData) {
    try {
      const response = await createAnnouncement({
        ...announcementData,
        status: 'Aktif',
      })
      if (response.data) {
        setPage(1)
        await loadAnnouncements()
        toast.success('Pengumuman berhasil dipublikasikan.')
      }
    } catch (error) {
      console.error('Error publishing announcement:', error)
      toast.error(error.message || 'Gagal mempublikasikan pengumuman')
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const response = await updateAnnouncement(id, updates)
      if (response.data) {
        setEditTarget(null)
        await loadAnnouncements()
        toast.success('Pengumuman berhasil diperbarui.')
      }
    } catch (error) {
      console.error('Error updating announcement:', error)
      toast.error(error.message || 'Gagal memperbarui pengumuman')
    }
  }

  async function handleDelete(id) {
    try {
      const response = await deleteAnnouncement(id)
      if (response) {
        setDeleteTarget(null)
        await loadAnnouncements()
        toast.success('Pengumuman berhasil dihapus.')
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
      toast.error(error.message || 'Gagal menghapus pengumuman')
    }
  }

  return {
    paginated: announcements,
    totalCount,
    page,
    totalPages,
    onPageChange: setPage,
    searchQuery,
    onSearchChange: setSearchQuery,
    statusFilter,
    onStatusFilterChange: handleStatusFilterChange,
    onPublish: handlePublish,
    editTarget,
    onOpenEdit: setEditTarget,
    onCloseEdit: () => setEditTarget(null),
    onUpdate: handleUpdate,
    deleteTarget,
    onOpenDelete: setDeleteTarget,
    onCloseDelete: () => setDeleteTarget(null),
    onDelete: handleDelete,
    isLoading,
  }
}

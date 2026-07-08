import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { ANNOUNCEMENTS } from '../data/announcementData'

const PAGE_SIZE = 5

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase()

    return announcements.filter((item) => {
      const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter
      const matchesQuery = !normalized || item.title.toLowerCase().includes(normalized)
      return matchesStatus && matchesQuery
    })
  }, [announcements, searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleStatusFilterChange(value) {
    setStatusFilter(value)
    setPage(1)
    toast.success('Filter berhasil diterapkan.')
  }

  function handlePublish(announcement) {
    const newAnnouncement = { id: `ann-${Date.now()}`, status: 'Aktif', ...announcement }
    setAnnouncements((current) => [newAnnouncement, ...current])
    setPage(1)
    toast.success('Pengumuman berhasil dipublikasikan.')
  }

  function handleUpdate(id, updates) {
    setAnnouncements((current) => current.map((item) => (item.id === id ? { ...item, ...updates } : item)))
    setEditTarget(null)
    toast.success('Pengumuman berhasil diperbarui.')
  }

  function handleDelete(id) {
    setAnnouncements((current) => current.filter((item) => item.id !== id))
    setDeleteTarget(null)
    toast.success('Pengumuman berhasil dihapus.')
  }

  return {
    paginated,
    totalCount: filtered.length,
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
  }
}

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStatistics,
} from '../../../../services/user-management.service'

const PAGE_SIZE = 5

export function useUsers() {
  const [users, setUsers] = useState([])
  const [statistics, setStatistics] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [roleFilter, setRoleFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [districtFilter, setDistrictFilter] = useState('Semua')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sort, setSort] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    loadUsers()
    loadStatistics()
  }, [page, roleFilter, statusFilter, searchInput])

  async function loadUsers() {
    try {
      setIsLoading(true)
      const params = {
        per_page: PAGE_SIZE,
        page,
      }

      if (roleFilter !== 'Semua') {
        params.role = roleFilter === 'Admin' ? 'admin' : roleFilter === 'Officer' ? 'petugas' : 'warga'
      }

      if (statusFilter !== 'Semua') {
        params.status = statusFilter === 'Aktif' ? 'aktif' : 'nonaktif'
      }

      if (districtFilter !== 'Semua') {
        params.department = districtFilter
      }

      if (searchInput.trim()) {
        params.search = searchInput
      }

      const response = await getUsers(params)
      setUsers(response.data?.users || [])
      setTotalCount(response.data?.total || 0)
      setTotalPages(response.data?.last_page || 1)
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('Gagal memuat data pengguna')
    } finally {
      setIsLoading(false)
    }
  }

  async function loadStatistics() {
    try {
      const response = await getUserStatistics()
      setStatistics(response.data)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const paginated = users

  function handleSort(key) {
    setSort((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))
  }

  async function handleToggleStatus(userId) {
    try {
      const response = await toggleUserStatus(userId)
      if (response.data) {
        await loadUsers()
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Error toggling status:', error)
      toast.error(error.message || 'Gagal mengubah status pengguna')
    }
  }

  async function handleAddOfficer(officer) {
    try {
      const response = await createUser(officer)
      if (response.data) {
        setIsAddOpen(false)
        setPage(1)
        await loadUsers()
        toast.success('Petugas berhasil ditambahkan.')
      }
    } catch (error) {
      console.error('Error adding officer:', error)
      toast.error(error.message || 'Gagal menambahkan petugas')
    }
  }

  async function handleUpdateUser(userId, updates) {
    try {
      const response = await updateUser(userId, updates)
      if (response.data) {
        setEditTarget(null)
        await loadUsers()
        toast.success('Data pengguna berhasil diperbarui.')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error(error.message || 'Gagal memperbarui data pengguna')
    }
  }

  async function handleDeleteUser(userId) {
    try {
      setIsDeleting(true)
      const response = await deleteUser(userId)
      if (response) {
        setDeleteTarget(null)
        if (users.length === 1 && page > 1) {
          setPage((current) => current - 1)
        } else {
          await loadUsers()
        }
        await loadStatistics()
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error(error.message || 'Gagal menghapus pengguna')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    paginated,
    totalCount,
    page,
    totalPages,
    onPageChange: setPage,
    searchInput,
    onSearchChange: setSearchInput,
    roleFilter,
    onRoleFilterChange: (value) => {
      setRoleFilter(value)
      setPage(1)
    },
    statusFilter,
    onStatusFilterChange: (value) => {
      setStatusFilter(value)
      setPage(1)
    },
    districtFilter,
    onDistrictFilterChange: (value) => {
      setDistrictFilter(value)
      setPage(1)
    },
    onSort: handleSort,
    onToggleStatus: handleToggleStatus,
    isAddOpen,
    onOpenAdd: () => setIsAddOpen(true),
    onCloseAdd: () => setIsAddOpen(false),
    onAddOfficer: handleAddOfficer,
    editTarget,
    onOpenEdit: setEditTarget,
    onCloseEdit: () => setEditTarget(null),
    onUpdateUser: handleUpdateUser,
    deleteTarget,
    onOpenDelete: setDeleteTarget,
    onCloseDelete: () => setDeleteTarget(null),
    onDeleteUser: handleDeleteUser,
    isDeleting,
    isLoading,
    statistics,
  }
}

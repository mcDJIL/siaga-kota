import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { USERS } from '../data/userData'
import { toggleStatus } from '../utils/statusColor'

const PAGE_SIZE = 5

export function useUsers() {
  const [users, setUsers] = useState(USERS)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [districtFilter, setDistrictFilter] = useState('Semua')
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput)
      setPage(1)
      if (searchInput) toast.success('Pencarian berhasil diperbarui.')
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    let results = users.filter((user) => {
      const matchesRole = roleFilter === 'Semua' || user.role === roleFilter
      const matchesStatus = statusFilter === 'Semua' || user.status === statusFilter
      const matchesDistrict = districtFilter === 'Semua' || user.district === districtFilter
      const matchesQuery =
        !normalized || [user.name, user.email, user.nip ?? ''].join(' ').toLowerCase().includes(normalized)
      return matchesRole && matchesStatus && matchesDistrict && matchesQuery
    })

    if (sort.key) {
      results = [...results].sort((a, b) => {
        const compare = String(a[sort.key]).localeCompare(String(b[sort.key]))
        return sort.direction === 'asc' ? compare : -compare
      })
    }

    return results
  }, [users, query, roleFilter, statusFilter, districtFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSort(key) {
    setSort((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))
  }

  function handleToggleStatus(userId) {
    setUsers((current) => current.map((user) => (user.id === userId ? { ...user, status: toggleStatus(user.status) } : user)))
    toast.success('Status pengguna berhasil diperbarui.')
  }

  function handleAddOfficer(officer) {
    const newUser = {
      id: `user-${Date.now()}`,
      ...officer,
      dateJoined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setUsers((current) => [newUser, ...current])
    setIsAddOpen(false)
    toast.success('Petugas berhasil ditambahkan.')
  }

  function handleUpdateUser(userId, updates) {
    setUsers((current) => current.map((user) => (user.id === userId ? { ...user, ...updates } : user)))
    setEditTarget(null)
    toast.success('Data pengguna berhasil diperbarui.')
  }

  function handleDeleteUser(userId) {
    setUsers((current) => current.filter((user) => user.id !== userId))
    setDeleteTarget(null)
    toast.success('Pengguna berhasil dihapus.')
  }

  return {
    paginated,
    totalCount: filtered.length,
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
  }
}

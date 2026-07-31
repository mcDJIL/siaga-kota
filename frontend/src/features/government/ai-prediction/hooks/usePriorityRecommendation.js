import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

const PAGE_SIZE = 5

export function usePriorityRecommendation(initialRecommendations = []) {
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [assignTarget, setAssignTarget] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setRecommendations(initialRecommendations)
    setPage(1)
  }, [initialRecommendations])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    let results = recommendations.filter((item) => {
      const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter
      const matchesQuery =
        !normalized || [item.district, item.sector, item.recommendation].join(' ').toLowerCase().includes(normalized)
      return matchesRisk && matchesQuery
    })

    if (sort.key) {
      results = [...results].sort((a, b) => {
        const compare = String(a[sort.key]).localeCompare(String(b[sort.key]))
        return sort.direction === 'asc' ? compare : -compare
      })
    }

    return results
  }, [recommendations, query, riskFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSort(key) {
    setSort((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))
  }

  function handleAssignOfficer({ officerId, officerName, department, priority, responseTime, notes }) {
    if (!assignTarget) return

    setRecommendations((current) =>
      current.map((item) =>
        item.id === assignTarget.id
          ? { ...item, assignedOfficer: { officerId, officerName, department, priority, responseTime, notes } }
          : item
      )
    )
    setAssignTarget(null)
    toast.success('Petugas berhasil ditugaskan.')
  }

  return {
    paginated,
    totalCount: filtered.length,
    page,
    totalPages,
    onPageChange: setPage,
    searchInput,
    onSearchChange: setSearchInput,
    riskFilter,
    onRiskFilterChange: (value) => {
      setRiskFilter(value)
      setPage(1)
    },
    sort,
    onSort: handleSort,
    assignTarget,
    onOpenAssign: setAssignTarget,
    onCloseAssign: () => setAssignTarget(null),
    onAssignOfficer: handleAssignOfficer,
  }
}

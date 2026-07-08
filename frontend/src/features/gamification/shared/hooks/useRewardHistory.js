import { useEffect, useMemo, useState } from 'react'
import { historyData } from '../../citizen/gamification/data/historyData'

const PAGE_SIZE = 5

export function useRewardHistory() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return historyData
    return historyData.filter((item) => item.activity.toLowerCase().includes(normalized))
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [query])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  function goToPage(next) {
    setPage(Math.min(Math.max(1, next), totalPages))
  }

  return { query, setQuery, items: paginatedItems, page, totalPages, goToPage, totalItems: filtered.length }
}

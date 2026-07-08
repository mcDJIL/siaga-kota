import { useEffect, useMemo, useState } from 'react'

export function usePagination(items, pageSize = 7) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  function goToPage(next) {
    setPage(Math.min(Math.max(1, next), totalPages))
  }

  function resetPage() {
    setPage(1)
  }

  return { page, totalPages, paginatedItems, goToPage, resetPage, pageSize, totalItems: items.length }
}

import { useMemo, useState } from 'react'

export function useReportSearch(reports) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return reports

    return reports.filter((report) =>
      [report.id, report.title, report.category, report.status].join(' ').toLowerCase().includes(normalized)
    )
  }, [reports, query])

  return { query, setQuery, results }
}

import { useMemo, useState } from 'react'

export function useReportFilter(reports) {
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const results = useMemo(() => {
    return reports.filter((report) => {
      const matchesCategory = category === 'all' || report.category === category
      const matchesStatus = status === 'all' || report.status === status
      return matchesCategory && matchesStatus
    })
  }, [reports, category, status])

  return { category, setCategory, status, setStatus, results }
}

import { useEffect, useState } from 'react'
import { fetchFloodReports } from '../../../../services/officer.service'

export function useFloodReports({ status = '', search = '', page = 1, perPage = 50 } = {}) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 50,
    total: 0,
    totalPages: 1,
  })

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchFloodReports({ status, search, page, perPage })
        setReports(data.data || [])
        if (data.meta) {
          setPagination({
            page: data.meta.current_page || 1,
            perPage: data.meta.per_page || 50,
            total: data.meta.total || 0,
            totalPages: data.meta.last_page || 1,
          })
        }
      } catch (err) {
        console.error('Error loading flood reports:', err)
        setError(err.message || 'Gagal memuat laporan banjir')
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [status, search, page, perPage])

  return { reports, loading, error, pagination }
}

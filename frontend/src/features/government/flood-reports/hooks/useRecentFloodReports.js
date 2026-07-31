import { useEffect, useState } from 'react'
import { getRecentFloodReports } from '../../../../services/flood-report.service'

export function useRecentFloodReports(filters = {}) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ total: 0, completed: 0 })

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRecentFloodReports(filters)
        setReports(data.data?.reports || [])
        setStats({
          total: data.data?.total || 0,
          completed: data.data?.completed || 0,
        })
      } catch (err) {
        console.error('Error loading recent flood reports:', err)
        setError(err.message || 'Gagal memuat laporan banjir terbaru')
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [filters.district, filters.status, filters.waterLevel, filters.perPage])

  return { reports, loading, error, stats }
}

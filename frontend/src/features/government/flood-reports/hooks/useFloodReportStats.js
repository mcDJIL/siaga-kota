import { useEffect, useState } from 'react'
import { getFloodReportStats } from '../../../../services/flood-report.service'
import { mapIconsToComponents } from '../utils/iconMapper'

export function useFloodReportStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getFloodReportStats()
        setStats(mapIconsToComponents(data.data?.stats || []))
      } catch (err) {
        console.error('Error loading flood report stats:', err)
        setError(err.message || 'Gagal memuat statistik laporan banjir')
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading, error }
}

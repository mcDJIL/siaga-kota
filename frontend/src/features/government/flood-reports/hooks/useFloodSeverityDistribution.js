import { useEffect, useState } from 'react'
import { getFloodSeverityDistribution } from '../../../../services/flood-report.service'

export function useFloodSeverityDistribution(district = null) {
  const [severity, setSeverity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSeverity = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getFloodSeverityDistribution(district)
        setSeverity(data.data?.severity || [])
      } catch (err) {
        console.error('Error loading flood severity distribution:', err)
        setError(err.message || 'Gagal memuat data tingkat keparahan banjir')
        setSeverity([])
      } finally {
        setLoading(false)
      }
    }

    loadSeverity()
  }, [district])

  return { severity, loading, error }
}

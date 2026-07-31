import { useEffect, useState } from 'react'
import { getDistrictFloodDistribution } from '../../../../services/flood-report.service'

export function useDistrictFloodDistribution() {
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getDistrictFloodDistribution()
        setDistricts(data.data?.districts || [])
      } catch (err) {
        console.error('Error loading district flood distribution:', err)
        setError(err.message || 'Gagal memuat data distribusi banjir')
        setDistricts([])
      } finally {
        setLoading(false)
      }
    }

    loadDistricts()
  }, [])

  return { districts, loading, error }
}

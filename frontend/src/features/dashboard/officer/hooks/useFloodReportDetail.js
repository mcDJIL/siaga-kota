import { useEffect, useState, useCallback } from 'react'
import { fetchWasteReportDetail } from '../../../../services/officer.service'

export function useFloodReportDetail(reportId) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadReport = useCallback(async () => {
    if (!reportId) {
      setLoading(false)
      setError('ID laporan tidak valid')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchWasteReportDetail(reportId)
      if (!data || !data.data) {
        setError('Data laporan tidak ditemukan')
        setReport(null)
      } else {
        setReport(data.data)
      }
    } catch (err) {
      console.error('Error loading flood report detail:', err)
      const statusCode = err?.status
      if (statusCode === 404) {
        setError('Laporan tidak ditemukan')
      } else if (statusCode === 403) {
        setError('Anda tidak memiliki akses ke laporan ini')
      } else {
        setError(err.message || 'Gagal memuat detail laporan')
      }
      setReport(null)
    } finally {
      setLoading(false)
    }
  }, [reportId])

  useEffect(() => {
    loadReport()
  }, [loadReport])

  return { report, loading, error, refetch: loadReport }
}

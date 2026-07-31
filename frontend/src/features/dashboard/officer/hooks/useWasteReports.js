import { useEffect, useState, useRef } from 'react'
import { fetchWasteReports } from '../../../../services/officer.service'

export function useWasteReports({ page = 1, perPage = 20, status = '', search = '' } = {}) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(page)
  const debounceTimerRef = useRef(null)

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    const loadReports = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Map filter status dari component format ke API format
        const apiStatus = mapFilterStatusToApi(status)
        
        const data = await fetchWasteReports({
          page: currentPage,
          perPage,
          status: apiStatus,
          search: search || '',
        })

        const formattedReports = (data.data || []).map(report => ({
          id: report.id,
          code: report.code,
          title: report.title,
          location: report.location?.address || '-',
          priority: report.priority,
          status: report.status,
          date: new Date(report.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          fullData: report,
        }))

        setReports(formattedReports)
        setTotalCount(data.meta?.total || formattedReports.length)
        setTotalPages(data.meta?.last_page || 1)
      } catch (err) {
        setError(err.message || 'Gagal memuat laporan sampah')
        console.error('Error loading waste reports:', err)
      } finally {
        setLoading(false)
      }
    }

    // Debounce: wait 500ms before making API call for better UX
    debounceTimerRef.current = setTimeout(() => {
      loadReports()
    }, 500)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [currentPage, perPage, status, search])

  // Map filter dropdown status ke API format
  const mapFilterStatusToApi = (filterStatus) => {
    const statusMap = {
      'pending': 'menunggu',
      'processing': 'diproses',
      'completed': 'selesai',
    }
    return statusMap[filterStatus] || ''
  }

  return {
    reports,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
  }
}

import { useEffect, useState } from 'react'
import { fetchOfficerReports } from '../../../../services/officer.service'

export function useOfficerDashboardData() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchOfficerReports({ perPage: 100 })
        setReports(data.data || [])
      } catch (err) {
        setError(err.message || 'Gagal memuat laporan')
        console.error('Error loading reports:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  // Calculate statistics
  const statistics = {
    totalWaste: reports.filter(r => r.waste_type === 'sampah' || r.category?.slug === 'sampah').length,
    totalFlood: reports.filter(r => r.waste_type === 'banjir' || r.category?.slug === 'banjir').length,
    processing: reports.filter(r => r.status === 'diproses').length,
    completed: reports.filter(r => r.status === 'selesai').length,
  }

  // Get weekly data (last 7 days)
  const getWeeklyData = () => {
    const days = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN']
    const weeklyData = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1
      const day = days[dayIndex]

      const dateStr = date.toISOString().split('T')[0]
      const dayReports = reports.filter(r => {
        const reportDate = new Date(r.created_at).toISOString().split('T')[0]
        return reportDate === dateStr
      })

      weeklyData.push({
        day,
        sampah: dayReports.filter(r => r.waste_type === 'sampah' || r.category?.slug === 'sampah').length,
        banjir: dayReports.filter(r => r.waste_type === 'banjir' || r.category?.slug === 'banjir').length,
      })
    }

    return weeklyData
  }

  // Map status to component status format
  const mapStatus = (status) => {
    const statusMap = {
      'menunggu': 'pending',
      'diverifikasi': 'pending',
      'diproses': 'processing',
      'selesai': 'completed',
      'ditolak': 'rejected',
    }
    return statusMap[status] || 'pending'
  }

  // Map priority to component priority format
  const mapPriority = (priority) => {
    const priorityMap = {
      'rendah': 'low',
      'sedang': 'medium',
      'tinggi': 'high',
      'mendesak': 'high',
    }
    return priorityMap[priority] || 'medium'
  }

  // Get recent reports (last 5)
  const recentReports = reports.slice(0, 5).map(report => ({
    id: report.code,
    category: report.category?.slug || report.waste_type || 'sampah',
    title: report.title,
    location: report.location?.address || report.address || '-',
    priority: mapPriority(report.priority),
    status: mapStatus(report.status),
    date: new Date(report.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    }),
  }))

  // Get map locations
  const mapLocations = reports
    .filter(r => {
      const lat = parseFloat(r.location?.latitude)
      const lng = parseFloat(r.location?.longitude)
      return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
    })
    .map(report => {
      const category = report.category?.slug || report.waste_type || 'sampah'
      const priorityLabel =
        report.priority === 'tinggi'
          ? 'Tinggi'
          : report.priority === 'sedang'
            ? 'Sedang'
            : report.priority === 'mendesak'
              ? 'Mendesak'
              : 'Rendah'

      const lat = parseFloat(report.location.latitude)
      const lng = parseFloat(report.location.longitude)

      return {
        id: report.code,
        position: [lat, lng],
        title: report.title,
        description: `${report.location.address || '-'} · Prioritas ${priorityLabel}`,
        type: category === 'sampah' ? 'report' : 'task',
        category: category,
        status: report.status,
      }
    })

  return {
    reports,
    loading,
    error,
    statistics,
    recentReports,
    weeklyData: getWeeklyData(),
    mapLocations,
  }
}

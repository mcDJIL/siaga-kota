import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft, Calendar, MapPin, Tag, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { fetchReport } from '../../../../../services/report.service'

const STATUS_COLORS = {
  menunggu: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Menunggu' },
  diverifikasi: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Terverifikasi' },
  diproses: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Sedang Diproses' },
  selesai: { bg: 'bg-green-100', text: 'text-green-800', label: 'Selesai' },
  ditolak: { bg: 'bg-red-100', text: 'text-red-800', label: 'Ditolak' },
}

const PRIORITY_COLORS = {
  rendah: 'text-blue-600',
  sedang: 'text-yellow-600',
  tinggi: 'text-orange-600',
  mendesak: 'text-red-600',
}

export function CitizenReportDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadReport() {
      try {
        if (!id) {
          if (mounted) {
            setIsLoading(false)
            setReport(null)
          }
          return
        }

        const data = await fetchReport(id)
        if (mounted) {
          setReport(data?.data || null)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error loading report:', err)
        toast.error(err?.message || 'Gagal memuat detail laporan')
        if (mounted) {
          setIsLoading(false)
          setReport(null)
        }
      }
    }

    loadReport()
    return () => {
      mounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 p-4 sm:p-8">
        <div className="h-64 animate-pulse rounded-xl bg-border-muted" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex flex-col gap-8 p-4 sm:p-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/citizen/reports')}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-bg-blue-soft"
          >
            <ArrowLeft className="h-5 w-5 text-navy" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-navy">Laporan tidak ditemukan</h1>
            <p className="text-text-muted">ID: {id}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-text-body">Laporan dengan ID ini tidak ditemukan atau tidak dapat diakses.</p>
          <button
            type="button"
            onClick={() => navigate('/citizen/reports')}
            className="mt-4 px-4 py-2 rounded-lg bg-navy text-white font-semibold hover:bg-navy/90"
          >
            Kembali ke Daftar Laporan
          </button>
        </div>
      </div>
    )
  }

  const statusColor = STATUS_COLORS[report.status] || STATUS_COLORS.menunggu

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/citizen/reports')}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-bg-blue-soft"
        >
          <ArrowLeft className="h-5 w-5 text-navy" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-navy">{report.title}</h1>
          <p className="text-text-muted">{report.code}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Photo */}
          {report.photo_url && (
            <div className="overflow-hidden rounded-xl">
              <img src={report.photo_url} alt={report.title} className="h-96 w-full object-cover" />
            </div>
          )}

          {/* Description */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-navy">Deskripsi</h2>
            <p className="whitespace-pre-wrap text-text-body">{report.description}</p>
          </div>

          {/* Location */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-navy" />
              <h2 className="text-xl font-semibold text-navy">Lokasi</h2>
            </div>
            <div className="space-y-2">
              <p className="text-text-body">
                <span className="font-semibold">Alamat:</span> {report.location?.address}
              </p>
              <p className="text-text-body">
                <span className="font-semibold">Koordinat:</span> {report.location?.latitude}, {report.location?.longitude}
              </p>
            </div>
          </div>

          {/* Status History */}
          {report.status_histories && report.status_histories.length > 0 && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-navy">Riwayat Status</h2>
              <div className="space-y-3">
                {report.status_histories.map((history, idx) => (
                  <div key={idx} className="border-l-2 border-navy pl-4">
                    <p className="font-semibold text-navy">
                      {history.from_status ? `${history.from_status} → ` : ''}
                      {history.to_status}
                    </p>
                    {history.note && <p className="text-sm text-text-muted">{history.note}</p>}
                    <p className="text-xs text-text-muted">{new Date(history.created_at).toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Status Card */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-text-muted">STATUS</h3>
            <div className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
              {statusColor.label}
            </div>
          </div>

          {/* Category & Type */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-text-muted">KATEGORI</p>
                <div className="mt-2 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-navy" />
                  <span className="font-semibold text-navy">{report.category?.name}</span>
                </div>
              </div>

              {report.waste_type && (
                <div>
                  <p className="text-sm font-semibold text-text-muted">TIPE SAMPAH</p>
                  <p className="mt-1 text-navy">{report.waste_type}</p>
                </div>
              )}

              {report.water_level_cm && (
                <div>
                  <p className="text-sm font-semibold text-text-muted">KETINGGIAN AIR</p>
                  <p className="mt-1 text-navy">{report.water_level_cm} cm</p>
                </div>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-text-muted">PRIORITAS</p>
            <p className={`mt-2 font-semibold ${PRIORITY_COLORS[report.priority]}`}>{report.priority_label}</p>
          </div>

          {/* Timeline */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-muted">
              <Calendar className="h-4 w-4" />
              TIMELINE
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-text-muted">Dibuat</p>
                <p className="font-semibold text-navy">{new Date(report.created_at).toLocaleString('id-ID')}</p>
              </div>
              {report.accepted_at && (
                <div>
                  <p className="text-text-muted">Diterima</p>
                  <p className="font-semibold text-navy">{new Date(report.accepted_at).toLocaleString('id-ID')}</p>
                </div>
              )}
              {report.resolved_at && (
                <div>
                  <p className="text-text-muted">Selesai</p>
                  <p className="font-semibold text-navy">{new Date(report.resolved_at).toLocaleString('id-ID')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Info */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-text-muted">PELAPOR</p>
            <p className="mt-2 font-semibold text-navy">{report.reporter?.name}</p>
          </div>

          {/* Emergency Alert */}
          {report.is_emergency && (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-600">Laporan Darurat</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

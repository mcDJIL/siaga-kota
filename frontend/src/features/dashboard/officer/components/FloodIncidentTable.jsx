import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { DataTable } from '../../shared/table/DataTable'
import { DangerBadge } from '../../shared/table/DangerBadge'
import { StatusBadge } from '../../shared/table/StatusBadge'
import { FloodFilterBar } from './FloodFilterBar'
import { FloodTableRowSkeleton } from './FloodTableRowSkeleton'
import { cn } from '../../../../lib/cn'

const getColumns = (onViewDetail) => [
  { key: 'id', label: 'ID Laporan', render: (row) => <span className="text-navy font-semibold">{row.code || row.id}</span> },
  { key: 'priority', label: 'Bahaya', render: (row) => <DangerBadge level={row.priority || row.danger} /> },
  { key: 'location', label: 'Lokasi', render: (row) => <span className="text-text-body">{row.location?.address || row.location}</span> },
  {
    key: 'waterHeight',
    label: 'Tinggi Air (cm)',
    render: (row) => (
      <span className={cn('font-bold', (row.priority === 'tinggi' || row.danger === 'tinggi') ? 'text-[#BA1A1A]' : 'text-navy')}>
        {row.water_level_cm || row.waterHeight || '-'} cm
      </span>
    ),
  },
  { key: 'reporter', label: 'Pelapor', render: (row) => <span className="text-text-muted">{row.reporter?.name || row.reporter || '-'}</span> },
  { key: 'status', label: 'Status', render: (row) => {
    console.log('Row status:', row.status, 'Full row:', row)
    return <StatusBadge status={row.status} />
  }},
  {
    key: 'action',
    label: 'Aksi',
    render: (row) => (
      <button
        type="button"
        aria-label={`Lihat detail laporan ${row.id}`}
        onClick={() => onViewDetail(row.id)}
        className="rounded-full p-2 text-navy hover:bg-bg-blue-soft"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
      </button>
    ),
  },
]

export function FloodIncidentTable({
  reports,
  totalCount,
  dangerLevel,
  onDangerLevelChange,
  region,
  onRegionChange,
  onDownload,
  loading = false,
}) {
  const navigate = useNavigate()
  
  const handleViewDetail = (reportId) => {
    const normalizedReportId = typeof reportId === 'object' ? reportId?.id : reportId
    navigate(`/officer/reports/flood/${normalizedReportId}`)
  }

  const columns = getColumns(handleViewDetail)

  const filteredReports = reports.filter((report) => {
    const matchesDanger = dangerLevel === 'semua' || (report.priority || report.danger) === dangerLevel
    return matchesDanger
  })

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="flood-incident-heading"
      className="flex flex-col rounded-xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-muted px-6 py-5 print:hidden">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-[18px] w-[18px] text-navy" aria-hidden="true" />
          <h2 id="flood-incident-heading" className="text-base font-normal text-navy">
            Laporan Insiden Banjir ({filteredReports.length})
          </h2>
        </div>

        <FloodFilterBar
          dangerLevel={dangerLevel}
          onDangerLevelChange={onDangerLevelChange}
          region={region}
          onRegionChange={onRegionChange}
          onDownload={onDownload}
        />
      </div>

      {loading ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border-muted bg-bg-soft">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">ID Laporan</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Bahaya</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Lokasi</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Tinggi Air (cm)</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Pelapor</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Status</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <FloodTableRowSkeleton />
              <FloodTableRowSkeleton />
              <FloodTableRowSkeleton />
              <FloodTableRowSkeleton />
            </tbody>
          </table>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredReports} emptyMessage="Tidak ada laporan banjir." />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-muted px-6 py-4 print:hidden">
        <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">
          Menampilkan 1-{filteredReports.length} dari {totalCount} laporan
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            aria-label="Halaman sebelumnya"
            className="rounded-lg p-2 text-[#0B1C30] opacity-30"
          >
            <ChevronLeft className="h-3 w-3" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Halaman berikutnya" className="rounded-lg p-2 text-[#0B1C30]">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

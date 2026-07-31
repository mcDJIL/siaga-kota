import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, ChevronLeft, ChevronRight, Eye, Download } from 'lucide-react'
import { DataTable } from '../../shared/table/DataTable'
import { FilterDropdown } from '../../shared/table/FilterDropdown'
import { Button } from '../../../../components/ui/Button'
import { cn } from '../../../../lib/cn'
import { exportWasteReportsToPdf } from '../utils/exportToPdf'

const PRIORITY_COLORS = {
  high: 'bg-[#BA1A1A]/10 text-[#BA1A1A]',
  medium: 'bg-[#C9A82C]/10 text-[#715C00]',
  low: 'bg-brand-green-light text-[#007243]',
}

const STATUS_COLORS = {
  pending: 'bg-[#FFE17C] text-[#4D3E00]',
  processing: 'bg-bg-blue-lighter text-navy',
  completed: 'bg-brand-green-light text-[#007243]',
}

const PRIORITY_OPTIONS = [
  { value: 'semua', label: 'Semua Prioritas' },
  { value: 'high', label: 'Tinggi' },
  { value: 'medium', label: 'Sedang' },
  { value: 'low', label: 'Rendah' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'processing', label: 'Sedang Diproses' },
  { value: 'completed', label: 'Selesai' },
]

const STATUS_LABEL_MAP = {
  'menunggu': 'Menunggu',
  'diverifikasi': 'Terverifikasi',
  'diproses': 'Sedang Diproses',
  'selesai': 'Selesai',
  'ditolak': 'Ditolak',
}

function mapStatusToKey(status) {
  const statusMap = {
    'menunggu': 'pending',
    'diverifikasi': 'pending',
    'diproses': 'processing',
    'selesai': 'completed',
    'ditolak': 'processing',
  }
  return statusMap[status] || 'pending'
}

function mapPriorityToKey(priority) {
  const priorityMap = {
    'rendah': 'low',
    'sedang': 'medium',
    'tinggi': 'high',
    'mendesak': 'high',
  }
  return priorityMap[priority] || 'medium'
}

const COLUMNS = [
  { key: 'code', label: 'ID', render: (row) => <span className="font-medium text-navy">{row.code}</span> },
  { key: 'title', label: 'Judul', render: (row) => <span className="font-semibold text-text-body">{row.title}</span> },
  { key: 'location', label: 'Lokasi', render: (row) => <span className="text-text-muted">{row.location}</span> },
  {
    key: 'priority',
    label: 'Prioritas',
    render: (row) => {
      const priorityKey = mapPriorityToKey(row.priority)
      const priorityLabel = {
        'high': 'Tinggi',
        'medium': 'Sedang',
        'low': 'Rendah',
      }
      return (
        <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', PRIORITY_COLORS[priorityKey])}>
          {priorityLabel[priorityKey] || row.priority}
        </span>
      )
    },
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => {
      const statusDisplay = STATUS_LABEL_MAP[row.status] || row.status
      const statusKey = mapStatusToKey(row.status)
      return (
        <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', STATUS_COLORS[statusKey])}>
          {statusDisplay}
        </span>
      )
    },
  },
  { key: 'date', label: 'Tanggal', render: (row) => <span className="text-sm text-text-body">{row.date}</span> },
  {
    key: 'action',
    label: 'Aksi',
    render: (row) => <ActionButton reportId={row.id} />,
  },
]

function ActionButton({ reportId }) {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/officer/reports/waste/${reportId}`)}
      aria-label={`Lihat detail laporan ${reportId}`}
      className="rounded-full p-2 text-navy hover:bg-bg-blue-soft"
    >
      <Eye className="h-4 w-4" aria-hidden="true" />
    </motion.button>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-2 p-6">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="h-12 bg-slate-200 rounded animate-pulse" />
      ))}
    </div>
  )
}

export function WasteReportsTable({ reports, totalCount, loading = false, error = null, onStatusChange, currentPage = 1, onPageChange }) {
  const [priority, setPriority] = useState('semua')
  const [exporting, setExporting] = useState(false)

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority)
  }

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) onStatusChange(newStatus)
  }

  const filteredReports = reports.filter((report) => {
    const reportPriorityKey = mapPriorityToKey(report.priority)
    const matchesPriority = priority === 'semua' || reportPriorityKey === priority
    return matchesPriority
  })

  const handleExport = async () => {
    try {
      setExporting(true)
      exportWasteReportsToPdf(filteredReports, 'laporan-sampah')
    } catch (err) {
      console.error('Error exporting to PDF:', err)
      alert('Gagal mengekspor ke PDF. Silakan coba lagi.')
    } finally {
      setExporting(false)
    }
  }

  if (error) {
    return (
      <motion.section className="flex flex-col rounded-xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]">
        <div className="px-6 py-8 text-center text-red-600">
          <p className="text-sm font-medium">{error}</p>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="waste-reports-heading"
      className="flex flex-col rounded-xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-muted px-6 py-5 print:hidden">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-[18px] w-[18px] text-navy" aria-hidden="true" />
          <h2 id="waste-reports-heading" className="text-base font-normal text-navy">
            Laporan Sampah
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="Prioritas"
            value={priority}
            options={PRIORITY_OPTIONS}
            onChange={handlePriorityChange}
            disabled={loading}
          />
          <FilterDropdown
            label="Status"
            value=""
            options={STATUS_OPTIONS}
            onChange={handleStatusChange}
            disabled={loading}
          />
          <Button
            variant="navy"
            size="sm"
            disabled={loading || exporting || filteredReports.length === 0}
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {exporting ? 'Mengekspor...' : loading ? 'Memproses...' : 'Ekspor'}
          </Button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={COLUMNS} data={filteredReports} emptyMessage="Tidak ada laporan sesuai filter." />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-muted px-6 py-4 print:hidden">
            <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">
              Menampilkan 1-{filteredReports.length} dari {totalCount} laporan
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange?.(currentPage - 1)}
                aria-label="Halaman sebelumnya"
                className="rounded-lg p-2 text-[#0B1C30] disabled:opacity-30"
              >
                <ChevronLeft className="h-3 w-3" aria-hidden="true" />
              </button>
              <button 
                type="button" 
                onClick={() => onPageChange?.(currentPage + 1)}
                aria-label="Halaman berikutnya" 
                className="rounded-lg p-2 text-[#0B1C30]"
              >
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.section>
  )
}

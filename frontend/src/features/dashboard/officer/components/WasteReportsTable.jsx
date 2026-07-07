import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { DataTable } from '../../shared/table/DataTable'
import { FilterDropdown } from '../../shared/table/FilterDropdown'
import { Button } from '../../../../components/ui/Button'
import { cn } from '../../../../lib/cn'

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
  { value: 'semua', label: 'Semua Status' },
  { value: 'pending', label: 'Tertunda' },
  { value: 'processing', label: 'Diproses' },
  { value: 'completed', label: 'Selesai' },
]

const COLUMNS = [
  { key: 'id', label: 'ID', render: (row) => <span className="font-medium text-navy">{row.id}</span> },
  { key: 'title', label: 'Judul', render: (row) => <span className="font-semibold text-text-body">{row.title}</span> },
  { key: 'location', label: 'Lokasi', render: (row) => <span className="text-text-muted">{row.location}</span> },
  {
    key: 'priority',
    label: 'Prioritas',
    render: (row) => (
      <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', PRIORITY_COLORS[row.priority])}>
        {row.priority === 'high' ? 'Tinggi' : row.priority === 'medium' ? 'Sedang' : 'Rendah'}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', STATUS_COLORS[row.status])}>
        {row.status === 'pending' ? 'Tertunda' : row.status === 'processing' ? 'Diproses' : 'Selesai'}
      </span>
    ),
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

export function WasteReportsTable({ reports, totalCount }) {
  const [priority, setPriority] = useState('semua')
  const [status, setStatus] = useState('semua')

  const filteredReports = reports.filter((report) => {
    const matchesPriority = priority === 'semua' || report.priority === priority
    const matchesStatus = status === 'semua' || report.status === status
    return matchesPriority && matchesStatus
  })

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
            onChange={setPriority}
          />
          <FilterDropdown
            label="Status"
            value={status}
            options={STATUS_OPTIONS}
            onChange={setStatus}
          />
          <Button variant="navy" size="sm">
            Ekspor
          </Button>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filteredReports} emptyMessage="Tidak ada laporan sesuai filter." />

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

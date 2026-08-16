import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowUpDown, Eye, Waves, Trash2, FileText } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { SearchInput } from '../../../../reports/shared/components/SearchInput'
import { Pagination } from '../../../../reports/shared/components/Pagination'
import { ReportDetailModal } from './ReportDetailModal'
import { getGovernmentReportDetail } from '../../../../../services/government-dashboard.service'

const PAGE_SIZE = 5

const TYPE_ICONS = { waste: Trash2, flood: Waves }

const STATUS_STYLES = {
  mendesak: 'bg-[#FFDAD6] text-[#93000A]',
  'dalam-proses': 'bg-brand-green-light text-brand-green-dark',
  menunggu: 'bg-bg-blue-lighter text-text-body',
}

const STATUS_LABELS = {
  mendesak: 'Mendesak',
  'dalam-proses': 'Dalam Proses',
  menunggu: 'Menunggu',
}

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'typeLabel', label: 'Type' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'time', label: 'Time' },
]

export function RecentReportTable({ reports = [] }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    let results = reports.filter((report) =>
      [report.id, report.typeLabel, report.location].join(' ').toLowerCase().includes(normalized)
    )

    if (sort.key) {
      results = [...results].sort((a, b) => {
        const compare = String(a[sort.key]).localeCompare(String(b[sort.key]))
        return sort.direction === 'asc' ? compare : -compare
      })
    }

    return results
  }, [query, sort, reports])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSort(key) {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  async function handleOpenReport(report) {
    if (!report.id) {
      toast.error('ULID laporan tidak tersedia.')
      return
    }

    setSelectedReport(report)

    try {
      const response = await getGovernmentReportDetail(report.id)
      const detail = response?.data

      if (!detail) {
        throw new Error('Data detail laporan tidak tersedia.')
      }

      const histories = Array.isArray(detail.status_histories) ? detail.status_histories : []
      const attachments = Array.isArray(detail.attachments) ? detail.attachments : []
      const statusTimeline = histories.map((history) => ({
        title: history.to_status || 'Status diperbarui',
        description: history.note || history.created_at || '-',
        status: history.to_status === detail.status ? 'current' : 'completed',
      }))

      setSelectedReport({
        ...report,
        id: detail.code || report.id,
        ulid: detail.id || report.ulid,
        type: detail.category?.slug || report.type,
        typeLabel: detail.category?.name || report.typeLabel,
        location: detail.location?.address || report.location || '-',
        status: detail.status || report.status,
        reporter: detail.reporter?.name || report.reporter || '-',
        category: detail.category?.name || report.category || report.typeLabel,
        description: detail.description || report.description || '-',
        assignedDepartment: detail.assigned_operator?.name || report.assignedDepartment || 'Not assigned',
        photos: attachments.length || (detail.photo_url ? 1 : 0),
        statusTimeline,
      })
      toast.success('Detail laporan berhasil dimuat.')
    } catch (error) {
      toast.error(error.message || 'Gagal memuat detail laporan.')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col overflow-hidden rounded-xl border border-bg-blue-lighter bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
      >
        <div className="flex flex-col gap-4 border-b border-border-muted bg-bg-blue-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-text-body">Laporan Terbaru</h3>
          <button type="button" className="text-sm font-medium tracking-[0.14px] text-navy">
            Lihat Semua
          </button>
        </div>

        <div className="p-4 sm:p-6 sm:pb-0">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari ID, tipe, atau lokasi laporan..." />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead className="bg-bg-blue-soft">
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column.key} scope="col" className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase"
                    >
                      {column.label}
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                ))}
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length + 1} className="px-6 py-10 text-center text-sm text-badge-neutral">
                    Tidak ada laporan yang cocok.
                  </td>
                </tr>
              ) : (
                paginated.map((report) => {
                  const TypeIcon = TYPE_ICONS[report.type] || FileText
                  return (
                    <tr
                      key={report.id}
                      onClick={() => handleOpenReport(report)}
                      className="cursor-pointer border-t border-bg-blue-light hover:bg-bg-soft"
                    >
                      <td className="px-6 py-4 text-base font-medium text-text-muted">{report.id}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-base text-text-body">
                          <TypeIcon className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
                          {report.typeLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-base text-text-body">{report.location}</td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                            STATUS_STYLES[report.status]
                          )}
                        >
                          {STATUS_LABELS[report.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-text-muted">{report.time}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleOpenReport(report)
                          }}
                          aria-label={`Lihat detail laporan ${report.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-navy hover:bg-bg-blue-soft"
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </motion.div>

      <ReportDetailModal report={selectedReport} isOpen={Boolean(selectedReport)} onClose={() => setSelectedReport(null)} />
    </>
  )
}

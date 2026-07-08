import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { ExportStatusBadge } from './ExportStatusBadge'
import { DownloadExportButton } from './DownloadExportButton'
import { FORMAT_ICONS } from '../../utils/formatColor'
import { formatExportTimestamp } from '../../utils/exportFormatter'
import { cn } from '../../../../../lib/cn'

const PAGE_SIZE = 10

export function ExportHistoryTable({ items, totalCount, page, totalPages, onPageChange, onRefresh, onDownload }) {
  const shownFrom = items.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const shownTo = (page - 1) * PAGE_SIZE + items.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-[#DCE9FF] bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-[#C4C6CF] p-6">
        <h2 className="text-xl font-semibold text-navy">Riwayat Ekspor</h2>
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Segarkan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="bg-bg-blue-soft/50">
            <tr>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Tanggal Ekspor
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Jenis Data
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Format
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Status
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-right text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-text-muted">
                  Belum ada riwayat ekspor.
                </td>
              </tr>
            ) : (
              items.map((record, index) => {
                const FormatIcon = FORMAT_ICONS[record.format]

                return (
                  <tr key={record.id} className={cn(index > 0 && 'border-t border-[#C4C6CF]/30')}>
                    <td className="px-6 py-4 text-base text-text-body">{formatExportTimestamp(record.exportedAt)}</td>
                    <td className="px-6 py-4 text-base font-medium text-navy">{record.dataType}</td>
                    <td className="px-6 py-4 text-base text-text-body">
                      <span className="flex items-center gap-2">
                        <FormatIcon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                        {record.format}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ExportStatusBadge status={record.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <DownloadExportButton record={record} onDownload={onDownload} />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#C4C6CF]/30 p-6 sm:flex-row">
        <p className="text-sm text-text-muted">
          Menampilkan {shownFrom}-{shownTo} dari {totalCount} riwayat ekspor
        </p>
        <nav className="flex items-center gap-2" aria-label="Navigasi halaman riwayat ekspor">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          <span className="px-2 text-sm font-medium text-text-body">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </motion.div>
  )
}

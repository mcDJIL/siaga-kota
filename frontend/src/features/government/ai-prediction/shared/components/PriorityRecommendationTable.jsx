import { motion } from 'framer-motion'
import { ArrowUpDown, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { Button } from '../../../../../components/ui/Button'
import { Select } from '../../../../../components/ui/Select'
import { RISK_BADGE_STYLES, RISK_LABELS } from '../../utils/predictionColor'

const COLUMNS = [
  { key: 'district', label: 'Distrik / Area' },
  { key: 'riskPercentage', label: 'Tingkat Risiko' },
  { key: 'recommendation', label: 'Rekomendasi Tindakan' },
  { key: 'deadline', label: 'Batas Waktu' },
]

const RISK_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Risiko' },
  { value: 'high', label: 'Tinggi' },
  { value: 'medium', label: 'Sedang' },
  { value: 'low', label: 'Rendah' },
]

export function PriorityRecommendationTable({
  items,
  totalCount,
  page,
  totalPages,
  onPageChange,
  searchInput,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  onSort,
  onOpenAssign,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-xl border border-[#C4C6CF]/30 bg-white shadow-[0_4px_14px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex flex-col gap-4 border-b border-[#C4C6CF]/30 bg-bg-blue-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-text-body">Rekomendasi Prioritas Tindakan</h3>
          <p className="text-sm text-text-muted">Daftar tindakan mitigasi diurutkan berdasarkan tingkat urgensi.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-52">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <label htmlFor="recommendation-search" className="sr-only">
              Cari distrik
            </label>
            <input
              id="recommendation-search"
              type="search"
              value={searchInput}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari distrik atau area..."
              className="h-[38px] w-full rounded-md border border-[#C4C6CF]/30 bg-white py-2 pr-3 pl-10 text-sm text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
            />
          </div>

          <Select
            aria-label="Filter tingkat risiko"
            value={riskFilter}
            onChange={(event) => onRiskFilterChange(event.target.value)}
            className="w-full py-2 pr-8 pl-3 text-sm sm:w-40"
          >
            {RISK_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead className="bg-bg-blue-soft">
            <tr>
              {COLUMNS.map((column) => (
                <th key={column.key} scope="col" className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className="flex items-center gap-1 text-sm font-medium text-text-muted"
                  >
                    {column.label}
                    <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-5 py-3 text-right text-sm font-medium text-text-muted">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-5 py-10 text-center text-sm text-text-muted">
                  Tidak ada rekomendasi yang cocok.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-[#C4C6CF]/10 hover:bg-bg-soft">
                  <td className="px-5 py-4">
                    <p className="text-base font-semibold text-text-body">{item.district}</p>
                    <p className="text-sm text-text-muted">{item.sector}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', RISK_BADGE_STYLES[item.riskLevel])}
                    >
                      {RISK_LABELS[item.riskLevel]} ({item.riskPercentage}%)
                    </span>
                  </td>
                  <td className="px-5 py-4 text-base text-text-body">{item.recommendation}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'flex items-center gap-1.5 text-base font-medium',
                        item.deadlineUrgent ? 'text-[#BA1A1A]' : 'text-text-muted'
                      )}
                    >
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.deadline}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {item.assignedOfficer ? (
                      <span className="text-sm font-semibold text-brand-green">{item.assignedOfficer.officerName}</span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-md px-4 py-1.5 text-xs text-navy"
                        onClick={() => onOpenAssign(item)}
                      >
                        Tugaskan
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-[#C4C6CF]/20 p-6 sm:flex-row">
        <p className="text-sm font-medium tracking-[0.14px] text-text-muted">
          Menampilkan {items.length} dari {totalCount} rekomendasi
        </p>

        <nav className="flex items-center gap-2" aria-label="Navigasi halaman rekomendasi">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C4C6CF]/30 text-text-body disabled:opacity-40"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <span className="px-2 text-sm font-medium text-text-body">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C4C6CF]/30 text-text-body disabled:opacity-40"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </motion.div>
  )
}

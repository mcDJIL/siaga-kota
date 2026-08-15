import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useRecentFloodReports } from '../../hooks/useRecentFloodReports'
import { verifyFloodReport } from '../../../../../services/flood-report.service'
import { FloodReportDetailModal } from './FloodReportDetailModal'
import { FloodReportFilterModal, DEFAULT_FLOOD_FILTERS } from './FloodReportFilterModal'
import { VerifyConfirmationModal } from './VerifyConfirmationModal'
import { FloodReportTableRows, STATUS_STYLES } from './FloodReportTableRows'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

function matchesWaterLevel(level, filter) {
  if (filter === '0-30 cm') return level <= 30
  if (filter === '31-70 cm') return level > 30 && level <= 70
  if (filter === '71 cm+') return level > 70
  return true
}

function useFilteredReports(reports, query, sort, appliedFilters) {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase()

    let results = reports.filter((report) => {
      const statusLabel = STATUS_STYLES[report.status]?.label || 'Unknown'
      const matchesQuery =
        !normalized ||
        [report.code, report.id, report.location, String(report.waterLevel), statusLabel].join(' ').toLowerCase().includes(normalized)
      const matchesStatus = appliedFilters.status === 'Semua Status' || statusLabel === appliedFilters.status
      const matchesSeverity = appliedFilters.severity === 'Semua Keparahan' || report.severity === appliedFilters.severity
      const matchesWater = matchesWaterLevel(report.waterLevel, appliedFilters.waterLevel)
      const matchesDistrict = appliedFilters.district === 'Semua District' || report.location.includes(appliedFilters.district)
      return matchesQuery && matchesStatus && matchesSeverity && matchesWater && matchesDistrict
    })

    if (sort.key) {
      results = [...results].sort((a, b) => {
        const compare = String(a[sort.key]).localeCompare(String(b[sort.key]), undefined, { numeric: true })
        return sort.direction === 'asc' ? compare : -compare
      })
    }

    return results
  }, [reports, query, sort, appliedFilters])
}

export function FloodReportTable({ filters = {} }) {
  const { reports: apiReports, loading } = useRecentFloodReports(filters)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportPendingVerify, setReportPendingVerify] = useState(null)
  const [verifyingReportId, setVerifyingReportId] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FLOOD_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FLOOD_FILTERS)
  const [reports, setReports] = useState([])

  useEffect(() => {
    setReports(apiReports)
  }, [apiReports])

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput)
      setPage(1)
      if (searchInput) toast.success('Pencarian berhasil diperbarui.')
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const filtered = useFilteredReports(reports, query, sort, appliedFilters)
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const shownStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1
  const shownEnd = Math.min(page * pageSize, filtered.length)

  function handleSort(key) {
    setSort((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))
  }

  function handleOpenDetail(report) {
    setSelectedReport(report)
    toast.success('Detail laporan berhasil dimuat.')
  }

  async function handleConfirmVerify() {
    const reportId = reportPendingVerify?.id

    if (!reportId || verifyingReportId) {
      if (!reportId) {
        toast.error('ID laporan tidak tersedia. Muat ulang data laporan terlebih dahulu.')
      }
      return
    }

    setVerifyingReportId(reportId)

    try {
      const result = await verifyFloodReport(reportId)
      if (result.success) {
        const status = result.data?.status || 'diverifikasi'
        setReports((prev) =>
          prev.map((item) => (item.id === reportId ? { ...item, status } : item))
        )
        setReportPendingVerify(null)
        toast.success(result.message || 'Laporan berhasil diverifikasi.')
      } else {
        toast.error(result.message || 'Gagal memverifikasi laporan')
      }
    } catch (error) {
      console.error('Error verifying report:', error)
      toast.error(error.message || 'Gagal memverifikasi laporan')
    } finally {
      setVerifyingReportId(null)
    }
  }

  function handleApplyFilters() {
    setAppliedFilters(draftFilters)
    setPage(1)
    setIsFilterOpen(false)
    toast.success('Filter berhasil diterapkan.')
  }

  function handleResetFilters() {
    setDraftFilters(DEFAULT_FLOOD_FILTERS)
    setAppliedFilters(DEFAULT_FLOOD_FILTERS)
    setPage(1)
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col overflow-hidden rounded-2xl border border-border-muted/20 bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
      >
        <div className="flex flex-col gap-4 border-b border-border-muted/30 p-6">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4 p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col overflow-hidden rounded-2xl border border-border-muted/20 bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
      >
        <div className="flex flex-col gap-4 border-b border-border-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-text-body">Daftar Laporan Terbaru</h3>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <label htmlFor="flood-report-search" className="sr-only">
                Cari laporan
              </label>
              <input
                id="flood-report-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Cari laporan ID atau lokasi..."
                className="h-11 w-full rounded-lg border border-border-muted bg-bg-soft py-2.5 pr-3 pl-9 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setDraftFilters(appliedFilters)
                setIsFilterOpen(true)
              }}
              className="flex items-center gap-2 rounded-lg border border-border-muted bg-bg-soft px-4 py-2.5 text-sm font-medium text-text-body"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <FloodReportTableRows
            reports={paginated}
            onSort={handleSort}
            onVerify={setReportPendingVerify}
            onOpenDetail={handleOpenDetail}
            verifyingReportId={verifyingReportId}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-bg-blue-light p-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium tracking-[0.14px] text-text-muted">
              Menampilkan {shownStart}-{shownEnd} dari {filtered.length} laporan
            </p>
            <label className="flex items-center gap-2 text-sm text-text-muted">
              Baris
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value))
                  setPage(1)
                }}
                className="rounded-md border border-border-muted bg-bg-soft px-2 py-1 text-sm text-text-body"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <nav className="flex items-center gap-2" aria-label="Navigasi halaman laporan">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-muted text-text-body disabled:opacity-40"
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
              onClick={() => setPage((prev) => prev + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-muted text-text-body disabled:opacity-40"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </motion.div>

      <FloodReportFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={draftFilters}
        onFiltersChange={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <VerifyConfirmationModal
        report={reportPendingVerify}
        onClose={() => {
          if (!verifyingReportId) {
            setReportPendingVerify(null)
          }
        }}
        onConfirm={handleConfirmVerify}
        isLoading={Boolean(verifyingReportId)}
      />

      <FloodReportDetailModal report={selectedReport} isOpen={Boolean(selectedReport)} onClose={() => setSelectedReport(null)} />
    </>
  )
}

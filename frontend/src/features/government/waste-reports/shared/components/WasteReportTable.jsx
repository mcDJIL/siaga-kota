import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowUpDown, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { Button } from '../../../../../components/ui/Button'
import { WasteReportDetailModal } from './WasteReportDetailModal'
import { verifyWasteReport } from '../../../../../services/waste-report.service'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

const STATUS_STYLES = {
  menunggu: { label: 'Menunggu', className: 'bg-badge-gold/20 text-[#715C00]' },
  diverifikasi: { label: 'Diverifikasi', className: 'bg-navy/10 text-navy' },
  selesai: { label: 'Selesai', className: 'bg-accent-green/10 text-accent-green' },
  kritis: { label: 'Kritis', className: 'bg-[#BA1A1A]/10 text-[#BA1A1A]' },
}

const COLUMNS = [
  { key: 'id', label: 'ID Laporan' },
  { key: 'location', label: 'Lokasi' },
  { key: 'category', label: 'Jenis' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Tanggal' },
]

export function WasteReportTable({ reports = [], districtFilter = 'Semua Kecamatan', onReportVerified = () => {} }) {
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selectedReport, setSelectedReport] = useState(null)
  const [verifyingReportId, setVerifyingReportId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput)
      setPage(1)
      if (searchInput) toast.success('Pencarian berhasil diperbarui.')
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    let results = reports.filter((report) => {
      const matchesDistrict = !districtFilter || districtFilter === 'Semua Kecamatan' || report.location.includes(districtFilter)
      const matchesQuery =
        !normalized || [report.id, report.location, report.category, report.status].join(' ').toLowerCase().includes(normalized)
      return matchesDistrict && matchesQuery
    })

    if (sort.key) {
      results = [...results].sort((a, b) => {
        const compare = String(a[sort.key]).localeCompare(String(b[sort.key]))
        return sort.direction === 'asc' ? compare : -compare
      })
    }

    return results
  }, [query, sort, districtFilter, reports])

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

  async function handleVerify(report) {
    if (verifyingReportId) {
      return
    }

    if (!report?.ulid) {
      toast.error('ULID laporan tidak tersedia. Muat ulang data laporan terlebih dahulu.')
      return
    }

    setVerifyingReportId(report.ulid)

    try {
      const response = await verifyWasteReport(report.ulid)
      const status = response?.data?.status || 'diverifikasi'
      onReportVerified(report.ulid, status)
      toast.success(response?.message || 'Laporan sampah berhasil diverifikasi.')
    } catch (error) {
      toast.error(error.message || 'Gagal memverifikasi laporan sampah.')
    } finally {
      setVerifyingReportId(null)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)] backdrop-blur-[5px]"
      >
        <div className="flex flex-col gap-4 border-b border-border-muted bg-bg-blue-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-text-body">Daftar Laporan Terkini</h3>
          <div className="relative w-full sm:w-48">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <label htmlFor="waste-report-search" className="sr-only">
              Cari ID Laporan
            </label>
            <input
              id="waste-report-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari ID Laporan..."
              className="h-[38px] w-full rounded-md border border-border-muted bg-bg-blue-soft py-2 pr-3 pl-10 text-sm text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="bg-bg-blue-soft">
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column.key} scope="col" className="px-6 py-3">
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 text-sm font-medium text-text-muted"
                    >
                      {column.label}
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-text-muted">
                  Aksi
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
                paginated.map((report) => (
                  <tr key={report.id} className="border-t border-bg-blue-light hover:bg-bg-soft">
                    <td className="px-6 py-4 text-base font-medium text-text-body">{report.id}</td>
                    <td className="px-6 py-4 text-base text-text-body">{report.location}</td>
                    <td className="px-6 py-4 text-base text-text-body">{report.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                          STATUS_STYLES[report.status]?.className || 'bg-gray-100 text-gray-800'
                        )}
                      >
                        {STATUS_STYLES[report.status]?.label || report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{report.date}</td>
                    <td className="px-6 py-4 text-right">
                      {report.status === 'menunggu' ? (
                        <Button
                          variant="navy"
                          size="sm"
                          className="rounded-md px-4 py-1.5 text-xs"
                          onClick={() => handleVerify(report)}
                          disabled={verifyingReportId === report.ulid}
                        >
                          {verifyingReportId === report.ulid && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                          {verifyingReportId === report.ulid ? 'Memverifikasi...' : 'Verifikasi'}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-md border border-border-muted px-4 py-1.5 text-xs"
                          onClick={() => handleOpenDetail(report)}
                        >
                          Detail
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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

      <WasteReportDetailModal report={selectedReport} isOpen={Boolean(selectedReport)} onClose={() => setSelectedReport(null)} />
    </>
  )
}

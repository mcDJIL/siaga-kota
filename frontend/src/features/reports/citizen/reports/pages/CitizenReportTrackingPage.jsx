import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReportToolbar } from '../components/ReportToolbar'
import { CitizenReportTable } from '../components/CitizenReportTable'
import { Pagination } from '../../../shared/components/Pagination'
import { CreateReportModal } from '../../../shared/components/CreateReportModal'
import { ReportSuccessDialog } from '../../../shared/components/ReportSuccessDialog'
import { useReportSearch } from '../../../shared/hooks/useReportSearch'
import { useReportFilter } from '../../../shared/hooks/useReportFilter'
import { usePagination } from '../../../shared/hooks/usePagination'
import { fetchReports } from '../../../../../services/report.service'

export function CitizenReportTrackingPage() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createdReport, setCreatedReport] = useState(null)

  const { query, setQuery, results: searchResults } = useReportSearch(reports)
  const { category, setCategory, status, setStatus, results: filteredResults } = useReportFilter(searchResults)
  const { page, totalPages, paginatedItems, goToPage, resetPage } = usePagination(filteredResults, 7)

  useEffect(() => {
    resetPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, status])

  useEffect(() => {
    let mounted = true

    async function load() {
      setIsLoading(true)
      try {
        const res = await fetchReports({ page: 1, perPage: 100 })
        const items = res?.data ?? []
        const mapped = items.map((r) => {
          const date = r.created_at ? new Date(r.created_at) : new Date()
          const formattedDate = date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })

          function mapStatus(s) {
            return (
              {
                menunggu: 'pending',
                diverifikasi: 'verification',
                diproses: 'in_progress',
                selesai: 'completed',
                ditolak: 'rejected',
              }[s] ?? s
            )
          }

          return {
            id: r.id,
            title: r.title,
            category: r.category?.slug ?? r.category?.name ?? 'sampah',
            date: formattedDate,
            status: mapStatus(r.status),
          }
        })

        if (mounted) {
          setReports(mapped)
          setIsLoading(false)
        }
      } catch {
        if (mounted) {
          setReports([])
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  function handleReportCreated(newReport) {
    setReports((prev) => [newReport, ...prev])
    setIsCreateOpen(false)
    setCreatedReport(newReport)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <ReportToolbar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-border-muted border-t-navy" />
              <p className="text-sm text-text-muted">Memuat laporan...</p>
            </div>
          </div>
        ) : (
          <>
            <CitizenReportTable reports={paginatedItems} />
            {filteredResults.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={goToPage}
                totalItems={filteredResults.length}
                pageSize={7}
              />
            )}
          </>
        )}
      </div>

      <CreateReportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleReportCreated}
      />

      <ReportSuccessDialog
        isOpen={Boolean(createdReport)}
        onClose={() => setCreatedReport(null)}
        message="Laporan Anda berhasil dibuat dan akan segera diverifikasi oleh petugas."
        primaryLabel="Lihat Detail"
        onPrimaryClick={() => {
          if (createdReport) navigate(`/citizen/reports/${createdReport.id}`)
          setCreatedReport(null)
        }}
        secondaryLabel="Tutup"
        onSecondaryClick={() => setCreatedReport(null)}
      />
    </div>
  )
}

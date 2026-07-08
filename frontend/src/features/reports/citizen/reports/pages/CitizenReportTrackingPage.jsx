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
import { reportData } from '../data/reportData'

export function CitizenReportTrackingPage() {
  const navigate = useNavigate()
  const [reports, setReports] = useState(reportData)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createdReport, setCreatedReport] = useState(null)

  const { query, setQuery, results: searchResults } = useReportSearch(reports)
  const { category, setCategory, status, setStatus, results: filteredResults } = useReportFilter(searchResults)
  const { page, totalPages, paginatedItems, goToPage, resetPage } = usePagination(filteredResults, 7)

  useEffect(() => {
    resetPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, status])

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
        <CitizenReportTable reports={paginatedItems} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={filteredResults.length}
          pageSize={7}
        />
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
          if (createdReport) navigate(`/citizen/reports/${createdReport.id.replace('#', '')}`)
          setCreatedReport(null)
        }}
        secondaryLabel="Tutup"
        onSecondaryClick={() => setCreatedReport(null)}
      />
    </div>
  )
}

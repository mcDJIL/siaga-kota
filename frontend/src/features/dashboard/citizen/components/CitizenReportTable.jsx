import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ReportTable } from '../../shared/tables/ReportTable'
import { CITIZEN_REPORTS } from '../data/reportData'

export function CitizenReportTable() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-bg-blue-light bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
      <div className="flex items-center justify-between border-b border-bg-blue-light px-6 py-6">
        <h2 className="font-display text-xl font-semibold text-navy">Daftar Laporan Terbaru</h2>
        <button
          type="button"
          onClick={() => navigate('/citizen/reports')}
          className="flex items-center gap-1 text-base text-navy"
        >
          Lihat Semua
          <ChevronRight className="h-[11px] w-[11px]" aria-hidden="true" />
        </button>
      </div>

      <ReportTable
        reports={CITIZEN_REPORTS}
        onRowClick={(report) => navigate(`/citizen/reports/${report.id}`)}
      />
    </section>
  )
}

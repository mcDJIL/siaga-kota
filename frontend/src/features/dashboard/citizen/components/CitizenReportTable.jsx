import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ReportTable } from '../../shared/tables/ReportTable'
import { fetchReports } from '../../../../services/report.service'

export function CitizenReportTable() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetchReports({ page: 1, perPage: 5 })
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
            id: r.code ?? r.id,
            reportId: r.id,
            title: r.title,
            category: r.category?.slug ?? r.category?.name ?? 'sampah',
            date: formattedDate,
            status: mapStatus(r.status),
          }
        })

        if (mounted) setReports(mapped)
      } catch {
        // keep empty list on error
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

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
        reports={reports}
        onRowClick={(report) => navigate(`/citizen/reports/${report.reportId}`)}
      />
    </section>
  )
}

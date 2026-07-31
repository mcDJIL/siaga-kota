import { useState } from 'react'
import { toast } from 'sonner'
import { FloodStatisticCards } from '../components/FloodStatisticCards'
import { FloodMonitoringCard } from '../components/FloodMonitoringCard'
import { FloodIncidentTable } from '../components/FloodIncidentTable'
import { PrintReportDialog } from '../../shared/print/PrintReportDialog'
import { FloodReportPrintTemplate } from '../../shared/print/FloodReportPrintTemplate'
import { useFloodReports } from '../hooks/useFloodReports'
import { FLOOD_STATISTICS } from '../data/floodStatistics'

export function OfficerFloodReportsPage() {
  const [dangerLevel, setDangerLevel] = useState('semua')
  const [region, setRegion] = useState('semua')
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  
  const { reports, loading, error } = useFloodReports({
    page,
    perPage: 50,
  })

  console.log('Flood reports data:', reports)

  const filteredReports = reports.filter((report) => {
    const matchesDanger = dangerLevel === 'semua' || report.priority === dangerLevel
    return matchesDanger
  })

  const handleConfirmPrint = () => {
    setIsPrintDialogOpen(false)
    window.setTimeout(() => window.print(), 200)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <p className="text-text-muted">Gagal memuat data laporan banjir</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <h1 className="text-xl font-semibold text-navy print:hidden">Laporan Banjir</h1>

      <FloodStatisticCards reports={reports} loading={loading} />

      <FloodMonitoringCard reports={reports} loading={loading} />

      <FloodIncidentTable
        reports={filteredReports}
        totalCount={reports.length}
        dangerLevel={dangerLevel}
        onDangerLevelChange={setDangerLevel}
        region={region}
        onRegionChange={setRegion}
        onDownload={() => setIsPrintDialogOpen(true)}
        loading={loading}
      />

      <PrintReportDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        onConfirm={handleConfirmPrint}
      />

      <FloodReportPrintTemplate
        reports={filteredReports}
        statistics={FLOOD_STATISTICS}
        dangerLevel={dangerLevel}
        region={region}
      />
    </div>
  )
}

import { useState } from 'react'
import { FloodStatisticCards } from '../components/FloodStatisticCards'
import { FloodMonitoringCard } from '../components/FloodMonitoringCard'
import { FloodIncidentTable } from '../components/FloodIncidentTable'
import { PrintReportDialog } from '../../shared/print/PrintReportDialog'
import { FloodReportPrintTemplate } from '../../shared/print/FloodReportPrintTemplate'
import { FLOOD_REPORTS, FLOOD_REPORTS_TOTAL } from '../data/floodReports'
import { FLOOD_STATISTICS } from '../data/floodStatistics'

export function OfficerFloodReportsPage() {
  const [dangerLevel, setDangerLevel] = useState('semua')
  const [region, setRegion] = useState('semua')
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)

  const handleConfirmPrint = () => {
    setIsPrintDialogOpen(false)
    window.setTimeout(() => window.print(), 200)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <h1 className="text-xl font-semibold text-navy print:hidden">Laporan Banjir</h1>

      <FloodStatisticCards />

      <FloodMonitoringCard />

      <FloodIncidentTable
        reports={FLOOD_REPORTS}
        totalCount={FLOOD_REPORTS_TOTAL}
        dangerLevel={dangerLevel}
        onDangerLevelChange={setDangerLevel}
        region={region}
        onRegionChange={setRegion}
        onDownload={() => setIsPrintDialogOpen(true)}
      />

      <PrintReportDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        onConfirm={handleConfirmPrint}
      />

      <FloodReportPrintTemplate
        reports={FLOOD_REPORTS}
        statistics={FLOOD_STATISTICS}
        dangerLevel={dangerLevel}
        region={region}
      />
    </div>
  )
}

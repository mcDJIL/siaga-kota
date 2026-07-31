import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Download, MapPin, Percent } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'
import { FloodPredictionMap } from '../shared/components/FloodPredictionMap'
import { PredictionAlertCard } from '../shared/components/PredictionAlertCard'
import { PredictionStatisticCard } from '../shared/components/PredictionStatisticCard'
import { PredictionAccuracyChart } from '../shared/components/PredictionAccuracyChart'
import { PriorityRecommendationTable } from '../shared/components/PriorityRecommendationTable'
import { AssignOfficerModal } from '../shared/components/AssignOfficerModal'
import { PredictionDetailCard } from '../shared/components/PredictionDetailCard'
import { PredictionDetailModal } from '../shared/components/PredictionDetailModal'
import { ExportPredictionModal } from '../shared/components/ExportPredictionModal'
import { useFloodPrediction } from '../hooks/useFloodPrediction'
import { usePriorityRecommendation } from '../hooks/usePriorityRecommendation'
import { CRITICAL_ALERT } from '../data/predictionStatistics'

export function GovernmentAIPredictionPage() {
  const mapCaptureRef = useRef(null)

  const {
    zones,
    recommendations,
    mapCenter,
    mapZoom,
    statistics,
    period,
    isLoading,
    isDetailModalOpen,
    onOpenDetail,
    onCloseDetail,
    isExportModalOpen,
    onOpenExportModal,
    onCloseExportModal,
  } = useFloodPrediction()

  const {
    paginated,
    totalCount,
    page,
    totalPages,
    onPageChange,
    searchInput,
    onSearchChange,
    riskFilter,
    onRiskFilterChange,
    onSort,
    assignTarget,
    onOpenAssign,
    onCloseAssign,
    onAssignOfficer,
  } = usePriorityRecommendation(recommendations)

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
            Prediksi Banjir &amp; Rekomendasi Prioritas
          </h1>
          <p className="max-w-2xl text-base text-text-muted">
            Analisis prediktif 7 hari ke depan berbasis AI untuk mitigasi risiko banjir proaktif.
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="border border-[#C4C6CF] bg-[#E5EEFF]">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {isLoading ? 'Memuat...' : period}
          </Button>
          <Button variant="navy" size="sm" onClick={onOpenExportModal}>
            <Download className="h-3 w-3" aria-hidden="true" />
            Export Laporan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex lg:col-span-8">
          <FloodPredictionMap mapRef={mapCaptureRef} center={mapCenter} zoom={mapZoom} zones={zones} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <PredictionAlertCard title={CRITICAL_ALERT.title} description={CRITICAL_ALERT.description} />

          <div className="flex gap-4">
            <PredictionStatisticCard
              icon={MapPin}
              label="Area Berisiko"
              value={statistics.areaAtRisk.value}
              valueColor="text-navy"
              trendText={statistics.areaAtRisk.trend.text}
            />
            <PredictionStatisticCard
              icon={Percent}
              label="Rata-rata Risiko"
              value={statistics.averageRisk.value}
              suffix="%"
              valueColor="text-[#C9A82C]"
              description={statistics.averageRisk.label}
            />
          </div>

          <PredictionAccuracyChart period={period} />
        </div>
      </div>

      <PriorityRecommendationTable
        items={paginated}
        totalCount={totalCount}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        riskFilter={riskFilter}
        onRiskFilterChange={onRiskFilterChange}
        onSort={onSort}
        onOpenAssign={onOpenAssign}
      />

      <PredictionDetailCard onOpenDetail={onOpenDetail} />

      <AssignOfficerModal target={assignTarget} onClose={onCloseAssign} onAssign={onAssignOfficer} />
      <PredictionDetailModal isOpen={isDetailModalOpen} onClose={onCloseDetail} />
      <ExportPredictionModal
        isOpen={isExportModalOpen}
        onClose={onCloseExportModal}
        statistics={statistics}
        recommendations={paginated}
        mapRef={mapCaptureRef}
        period={period}
      />
    </div>
  )
}

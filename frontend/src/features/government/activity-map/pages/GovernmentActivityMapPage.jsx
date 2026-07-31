import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { HeatmapControlTabs } from '../shared/components/HeatmapControlTabs'
import { GovernmentHeatmap } from '../shared/components/GovernmentHeatmap'
import { HighRiskSidebar } from '../shared/components/HighRiskSidebar'
import { ExportReportCard } from '../shared/components/ExportReportCard'
import { ExportReportModal } from '../shared/components/ExportReportModal'
import { useGovernmentHeatmap } from '../hooks/useGovernmentHeatmap'

export function GovernmentActivityMapPage() {
  const navigate = useNavigate()

  const {
    activeLayer,
    onLayerChange,
    focusPosition,
    heatPoints,
    visibleMarkers,
    aiRiskZones,
    districts,
    selectedDistrictId,
    onSelectDistrict,
    onSelectMarker,
    isExportModalOpen,
    onOpenExportModal,
    onCloseExportModal,
    mapCenter,
    mapZoom,
  } = useGovernmentHeatmap()

  function handleOpenMarkerDetail(marker) {
    onSelectMarker(marker)
    if (marker.type === 'waste') navigate('/government/waste-reports')
    if (marker.type === 'flood') navigate('/government/flood-reports')
    if (marker.type === 'ai') toast.success('Area berhasil difokuskan.')
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-1"
        >
          <h1 className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.8px] text-text-body">
            Heatmap Kepadatan Laporan &amp; Titik Rawan
          </h1>
          <p className="text-base text-text-muted">
            Visualisasi real-time kepadatan laporan lingkungan dan potensi risiko di Kabupaten Jember.
          </p>
        </motion.div>

        <HeatmapControlTabs activeLayer={activeLayer} onChange={onLayerChange} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex min-h-[500px] lg:col-span-8">
          <GovernmentHeatmap
            center={mapCenter}
            zoom={mapZoom}
            heatPoints={heatPoints}
            markers={visibleMarkers}
            riskZones={aiRiskZones}
            focusPosition={focusPosition}
            onOpenMarkerDetail={handleOpenMarkerDetail}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <HighRiskSidebar
            districts={districts}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={onSelectDistrict}
          />

          <ExportReportCard updateTime="10 menit lalu" onExportClick={onOpenExportModal} />
        </div>
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={onCloseExportModal}
        activeLayer={activeLayer}
        districts={districts}
        wasteMarkers={visibleMarkers.filter((m) => m.type === 'waste')}
        floodMarkers={visibleMarkers.filter((m) => m.type === 'flood')}
      />
    </div>
  )
}

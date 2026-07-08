import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AI_HOTSPOTS, AI_RISK_ZONES, FLOOD_POINTS, JEMBER_CENTER, JEMBER_ZOOM, WASTE_POINTS } from '../data/heatmapData'
import { HIGH_RISK_DISTRICTS } from '../data/riskDistricts'
import { buildHeatPoints, buildVisibleMarkers } from '../utils/heatmapGenerator'

export function useGovernmentHeatmap() {
  const [activeLayer, setActiveLayer] = useState('both')
  const [focusPosition, setFocusPosition] = useState(null)
  const [selectedDistrictId, setSelectedDistrictId] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const heatPoints = useMemo(() => buildHeatPoints(activeLayer, WASTE_POINTS, FLOOD_POINTS), [activeLayer])

  const visibleMarkers = useMemo(
    () => buildVisibleMarkers(activeLayer, WASTE_POINTS, FLOOD_POINTS, AI_HOTSPOTS),
    [activeLayer]
  )

  function handleLayerChange(layer) {
    setActiveLayer(layer)
    toast.success('Layer berhasil diperbarui.')
  }

  function handleSelectDistrict(districtId) {
    const district = HIGH_RISK_DISTRICTS.find((item) => item.id === districtId)
    if (!district) return
    setSelectedDistrictId(districtId)
    setFocusPosition(district.position)
    toast.success('Area berhasil difokuskan.')
  }

  function handleResetView() {
    setFocusPosition(JEMBER_CENTER)
    setSelectedDistrictId(null)
  }

  return {
    activeLayer,
    onLayerChange: handleLayerChange,
    focusPosition,
    heatPoints,
    visibleMarkers,
    aiRiskZones: AI_RISK_ZONES,
    districts: HIGH_RISK_DISTRICTS,
    selectedDistrictId,
    onSelectDistrict: handleSelectDistrict,
    onResetView: handleResetView,
    selectedMarker,
    onSelectMarker: setSelectedMarker,
    isExportModalOpen,
    onOpenExportModal: () => setIsExportModalOpen(true),
    onCloseExportModal: () => setIsExportModalOpen(false),
    mapCenter: JEMBER_CENTER,
    mapZoom: JEMBER_ZOOM,
  }
}

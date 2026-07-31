import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { JEMBER_CENTER, JEMBER_ZOOM } from '../data/heatmapData'
import { buildHeatPoints, buildVisibleMarkers, buildAIRiskZones } from '../utils/heatmapGenerator'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const axiosClient = axios.create({ baseURL: API_BASE_URL })

export function useGovernmentHeatmap() {
  const [activeLayer, setActiveLayer] = useState('both')
  const [focusPosition, setFocusPosition] = useState(null)
  const [selectedDistrictId, setSelectedDistrictId] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const [mapData, setMapData] = useState({
    waste: [],
    flood: [],
    ai: [],
    districts: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMapData()
  }, [])

  async function fetchMapData(skipCache = false) {
    try {
      setIsLoading(true)
      const token = window.localStorage.getItem('siagakota_auth_token')
      const params = skipCache ? { skip_cache: true } : {}
      const response = await axiosClient.get('/api/v1/government/activity-map/data', {
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
      if (response.data?.data) {
        setMapData({
          waste: response.data.data.waste || [],
          flood: response.data.data.flood || [],
          ai: response.data.data.ai || [],
          districts: response.data.data.districts || [],
        })
      }
    } catch (error) {
      console.error('Error fetching map data:', error)
      // Set default empty data on error so component doesn't break
      setMapData({
        waste: [],
        flood: [],
        ai: [],
        districts: [],
      })
      // Only show toast on real errors, not on first load
      if (mapData.districts.length > 0) {
        toast.error('Gagal memperbarui data peta')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const heatPoints = useMemo(() => buildHeatPoints(activeLayer, mapData.waste, mapData.flood), [activeLayer, mapData])

  const visibleMarkers = useMemo(
    () => buildVisibleMarkers(activeLayer, mapData.waste, mapData.flood, mapData.ai),
    [activeLayer, mapData]
  )

  const aiRiskZones = useMemo(() => buildAIRiskZones(mapData.ai), [mapData.ai])

  function handleLayerChange(layer) {
    setActiveLayer(layer)
    toast.success('Layer berhasil diperbarui.')
  }

  function handleSelectDistrict(districtId) {
    const district = mapData.districts.find((item) => item.id === districtId)
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
    aiRiskZones,
    districts: mapData.districts,
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
    isLoading,
    refreshData: fetchMapData,
  }
}

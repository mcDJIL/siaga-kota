import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { SmartMap } from '../../../shared/components/SmartMap'
import { SearchBar } from '../../../shared/components/SearchBar'
import { FilterTabs } from '../../../shared/components/FilterTabs'
import { FilterButton } from '../../../shared/components/FilterButton'
import { MapLegend } from '../../../shared/components/MapLegend'
import { MapControlButtons } from '../../../shared/components/MapControlButtons'
import { MapLoadingSkeleton } from '../../../shared/components/MapLoadingSkeleton'
import { useMapFilters } from '../../../shared/hooks/useMapFilters'
import { useMapLayers } from '../../../shared/hooks/useMapLayers'
import { useMapSearch } from '../../../shared/hooks/useMapSearch'
import { useMarkerSelection } from '../../../shared/hooks/useMarkerSelection'
import { buildSearchIndex, filterMarkersByTab } from '../../../shared/utils/markerHelpers'
import { focusMapOnPosition } from '../../../shared/utils/mapHelpers'
import { fetchMapPoints } from '../../../../../services/report.service'
import { getMapFloodPredictions } from '../../../../../services/ai-prediction.service'
import { tpsMarkers } from '../data/tpsMarkers'
import { riskZones } from '../data/riskZones'
import { evacuationRoutes } from '../data/evacuationRoutes'

const PREDICTION_COLORS = {
  high: '#BA1A1A',
  medium: '#C9A82C',
  low: '#006D40',
}

function buildPredictionPolygon(center, radius) {
  return Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2
    return [
      center[0] + Math.sin(angle) * radius,
      center[1] + Math.cos(angle) * radius * 1.15,
    ]
  })
}

function mapPredictionZone(prediction) {
  const [latitude, longitude] = prediction.center ?? []
  const riskLevel = String(prediction.riskLevel ?? 'low').toLowerCase()

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null
  }

  const radius = riskLevel === 'high' ? 0.015 : riskLevel === 'medium' ? 0.012 : 0.009
  const riskLabel = riskLevel === 'high' ? 'Tinggi' : riskLevel === 'medium' ? 'Sedang' : 'Rendah'
  const riskScore = Math.round(Number(prediction.riskScore) || 0)

  return {
    id: `ai-${prediction.id}`,
    positions: buildPredictionPolygon([latitude, longitude], radius),
    title: prediction.district || 'Prediksi Banjir AI',
    level: `${riskLabel} (${riskScore}%)`,
    description: prediction.recommendedAction || 'Prediksi risiko banjir dari sistem AI.',
    color: PREDICTION_COLORS[riskLevel] || PREDICTION_COLORS.low,
  }
}

function mapReportFeature(feature) {
  const [longitude, latitude] = feature.geometry?.coordinates ?? []
  const properties = feature.properties ?? {}

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null
  }

  const createdAt = properties.created_at ? new Date(properties.created_at) : null
  const hoursAgo = createdAt ? Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 3600000)) : 0
  const isWasteReport = properties.category?.slug === 'sampah'

  return {
    id: properties.id,
    position: { lat: latitude, lng: longitude },
    title: properties.title ?? properties.name ?? (isWasteReport ? 'Laporan Sampah' : 'Laporan Banjir'),
    category: isWasteReport ? 'Sampah' : 'Banjir',
    address: properties.address,
    status: properties.status,
    statusLabel: properties.status_label,
    priority: properties.priority,
    description: properties.description,
    waterLevel: properties.water_level_cm,
    hoursAgo,
    createdAt: properties.created_at,
  }
}

export function CitizenMapPage() {
  const [map, setMap] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiWasteMarkers, setApiWasteMarkers] = useState([])
  const [apiFloodMarkers, setApiFloodMarkers] = useState([])
  const [aiPredictions, setAiPredictions] = useState([])

  const { activeTab, setActiveTab, advancedFilters, setAdvancedFilter } = useMapFilters()
  const { layers, toggleLayer } = useMapLayers()
  const { selectedObject, selectObject } = useMarkerSelection()

  // Fetch reports dari API
  useEffect(() => {
    let mounted = true

    async function loadReports() {
      try {
        const [features, predictionResponse] = await Promise.all([
          fetchMapPoints(),
          getMapFloodPredictions().catch((error) => {
            console.error('Error fetching AI flood predictions:', error)
            return null
          }),
        ])
        const reports = features
          .filter((feature) => feature.properties?.layer === 'report')
          .map(mapReportFeature)
          .filter(Boolean)
        const predictions = (predictionResponse?.data?.predictions ?? []).map(mapPredictionZone).filter(Boolean)
        const wasteData = reports.filter((report) => report.category === 'Sampah')
        const floodData = reports.filter((report) => report.category === 'Banjir')

        if (mounted) {
          setApiWasteMarkers(wasteData)
          setApiFloodMarkers(floodData)
          setAiPredictions(predictions)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error fetching reports:', err)
        if (mounted) setIsLoading(false)
      }
    }

    loadReports()
    return () => {
      mounted = false
    }
  }, [])

  const searchIndex = useMemo(
    () => buildSearchIndex({ wasteMarkers: apiWasteMarkers, floodMarkers: apiFloodMarkers, tpsMarkers, evacuationRoutes, riskZones }),
    [apiWasteMarkers, apiFloodMarkers]
  )
  const { query, setQuery, results } = useMapSearch(searchIndex)

  const filteredWasteMarkers = useMemo(() => filterMarkersByTab(apiWasteMarkers, activeTab), [apiWasteMarkers, activeTab])
  const filteredFloodMarkers = useMemo(() => filterMarkersByTab(apiFloodMarkers, activeTab), [apiFloodMarkers, activeTab])
  const predictionZones = aiPredictions.length > 0 ? aiPredictions : riskZones

  function handleSelectSearchResult(result) {
    selectObject(result)
    setQuery('')
    focusMapOnPosition(map, result.position)
  }

  function handleSelectMarker(marker) {
    selectObject(marker)
    focusMapOnPosition(map, marker.position)
  }

  function handleLocationError(message) {
    toast.error(message)
  }

  return (
    <div
      className="relative h-[calc(100vh-4rem)] min-h-[560px] w-full overflow-hidden bg-bg-blue-lighter"
      aria-label="Peta Aktivitas Kota"
    >
      {!isLoading && (
        <div className="absolute inset-0 z-0">
          <SmartMap
            mapRef={setMap}
            wasteMarkers={filteredWasteMarkers}
            floodMarkers={filteredFloodMarkers}
            tpsMarkers={tpsMarkers}
            riskZones={predictionZones}
            evacuationRoutes={evacuationRoutes}
            layers={layers}
            selectedObject={selectedObject}
            onSelectMarker={handleSelectMarker}
          />
        </div>
      )}

      {isLoading && <MapLoadingSkeleton />}

      {!isLoading && <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        <div className="flex flex-col gap-3 p-4 sm:p-6 sm:max-w-md pointer-events-none">
          <div className="flex items-start gap-2 pointer-events-auto">
            <div className="min-w-0 flex-1">
              <SearchBar
                query={query}
                onQueryChange={setQuery}
                results={results}
                onSelectResult={handleSelectSearchResult}
              />
            </div>
            <FilterButton
              layers={layers}
              onToggleLayer={toggleLayer}
              advancedFilters={advancedFilters}
              onChangeAdvancedFilter={setAdvancedFilter}
            />
          </div>
          <div className="pointer-events-auto">
            <FilterTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>
        </div>

        <div className="flex items-end justify-between p-4 sm:p-6 pointer-events-none">
          <div className="pointer-events-auto">
            <MapLegend
              className="w-52 sm:w-64"
              wasteCount={apiWasteMarkers.length}
              floodCount={apiFloodMarkers.length}
            />
          </div>
          <div className="pointer-events-auto">
            <MapControlButtons
              map={map}
              layers={layers}
              onToggleLayer={toggleLayer}
              onLocationError={handleLocationError}
            />
          </div>
        </div>
      </div>}
    </div>
  )
}

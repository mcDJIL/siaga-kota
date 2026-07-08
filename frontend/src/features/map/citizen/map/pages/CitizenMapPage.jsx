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
import { wasteMarkers } from '../data/wasteMarkers'
import { floodMarkers } from '../data/floodMarkers'
import { tpsMarkers } from '../data/tpsMarkers'
import { riskZones } from '../data/riskZones'
import { evacuationRoutes } from '../data/evacuationRoutes'

export function CitizenMapPage() {
  const [map, setMap] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { activeTab, setActiveTab, advancedFilters, setAdvancedFilter } = useMapFilters()
  const { layers, toggleLayer } = useMapLayers()
  const { selectedObject, selectObject } = useMarkerSelection()

  const searchIndex = useMemo(
    () => buildSearchIndex({ wasteMarkers, floodMarkers, tpsMarkers, evacuationRoutes, riskZones }),
    []
  )
  const { query, setQuery, results } = useMapSearch(searchIndex)

  const filteredWasteMarkers = useMemo(() => filterMarkersByTab(wasteMarkers, activeTab), [activeTab])
  const filteredFloodMarkers = useMemo(() => filterMarkersByTab(floodMarkers, activeTab), [activeTab])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

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
    <section
      className="relative h-[calc(100vh-4rem)] min-h-[560px] w-full overflow-hidden bg-bg-blue-lighter"
      aria-label="Peta Aktivitas Kota"
    >
      {isLoading && <MapLoadingSkeleton />}

      <SmartMap
        mapRef={setMap}
        wasteMarkers={filteredWasteMarkers}
        floodMarkers={filteredFloodMarkers}
        tpsMarkers={tpsMarkers}
        riskZones={riskZones}
        evacuationRoutes={evacuationRoutes}
        layers={layers}
        selectedObject={selectedObject}
        onSelectMarker={handleSelectMarker}
      />

      <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-3 sm:top-6 sm:left-6 sm:max-w-md">
        <div className="pointer-events-auto flex items-start gap-2">
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

      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 sm:right-6">
        <MapControlButtons
          map={map}
          layers={layers}
          onToggleLayer={toggleLayer}
          onLocationError={handleLocationError}
        />
      </div>

      <div className="pointer-events-none absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
        <MapLegend className="w-52 sm:w-64" />
      </div>
    </section>
  )
}

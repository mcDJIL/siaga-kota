import { MapContainer as LeafletMap, TileLayer, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { WasteMarker } from './WasteMarker'
import { FloodMarker } from './FloodMarker'
import { TPSMarker } from './TPSMarker'
import { FloodRiskPolygon } from './FloodRiskPolygon'
import { EvacuationRouteLayer } from './EvacuationRouteLayer'
import { CITIZEN_MAP_CENTER, CITIZEN_MAP_ZOOM } from '../utils/mapHelpers'

export function SmartMap({
  mapRef,
  wasteMarkers,
  floodMarkers,
  tpsMarkers,
  riskZones,
  evacuationRoutes,
  layers,
  selectedObject,
  onSelectMarker,
}) {
  return (
    <LeafletMap
      ref={mapRef}
      center={CITIZEN_MAP_CENTER}
      zoom={CITIZEN_MAP_ZOOM}
      zoomControl={false}
      scrollWheelZoom
      className="h-full w-full"
      aria-label="Peta aktivitas kota interaktif"
    >
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      {layers.riskZones && (
        <LayerGroup>
          {riskZones.map((zone) => (
            <FloodRiskPolygon key={zone.id} zone={zone} />
          ))}
        </LayerGroup>
      )}

      {layers.evacuation && (
        <LayerGroup>
          {evacuationRoutes.map((route) => (
            <EvacuationRouteLayer key={route.id} route={route} />
          ))}
        </LayerGroup>
      )}

      {layers.waste && (
        <LayerGroup>
          {wasteMarkers.map((marker) => (
            <WasteMarker
              key={marker.id}
              marker={marker}
              isSelected={selectedObject?.id === marker.id}
              onSelect={onSelectMarker}
            />
          ))}
        </LayerGroup>
      )}

      {layers.flood && (
        <LayerGroup>
          {floodMarkers.map((marker) => (
            <FloodMarker
              key={marker.id}
              marker={marker}
              isSelected={selectedObject?.id === marker.id}
              onSelect={onSelectMarker}
            />
          ))}
        </LayerGroup>
      )}

      {layers.tps && (
        <LayerGroup>
          {tpsMarkers.map((marker) => (
            <TPSMarker key={marker.id} marker={marker} />
          ))}
        </LayerGroup>
      )}
    </LeafletMap>
  )
}

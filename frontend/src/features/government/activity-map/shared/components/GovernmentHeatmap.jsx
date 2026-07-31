import { useEffect, useRef, useState } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'
import { Crosshair, LocateFixed } from 'lucide-react'
import { HeatmapMarkerPopup } from './HeatmapMarkerPopup'
import { HeatmapLegend } from './HeatmapLegend'
import { MARKER_COLORS } from '../../utils/heatmapColors'

function createMarkerIcon(type) {
  const color = MARKER_COLORS[type] ?? '#74777F'
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.35)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

function HeatLayer({ points }) {
  const map = useMap()

  useEffect(() => {
    if (!map || typeof L.heatLayer !== 'function') return undefined

    const layer = L.heatLayer(points, {
      radius: 28,
      blur: 22,
      maxZoom: 16,
      gradient: { 0.2: '#006D40', 0.4: '#8EF5B5', 0.6: '#C9A82C', 0.8: '#E58A2A', 1.0: '#BA1A1A' },
    })
    layer.addTo(map)

    return () => {
      map.removeLayer(layer)
    }
  }, [map, points])

  return null
}

function MapFlyTo({ position }) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 0.8 })
    }
  }, [position, map])

  return null
}

function MapControlsInternal({ homeCenter, homeZoom }) {
  const map = useMap()
  const [isLocating, setIsLocating] = useState(false)

  function handleLocate() {
    setIsLocating(true)
    map.locate({ setView: true, maxZoom: 15 })
    map.once('locationfound', () => setIsLocating(false))
    map.once('locationerror', () => setIsLocating(false))
  }

  function handleReset() {
    map.flyTo(homeCenter, homeZoom, { duration: 0.6 })
  }

  return (
    <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
      <button
        type="button"
        onClick={handleLocate}
        disabled={isLocating}
        aria-label="Temukan lokasi saya"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C4C6CF] bg-white text-navy shadow-sm transition-colors hover:bg-bg-blue-soft disabled:opacity-50"
      >
        <LocateFixed className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleReset}
        aria-label="Reset tampilan peta"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C4C6CF] bg-white text-navy shadow-sm transition-colors hover:bg-bg-blue-soft"
      >
        <Crosshair className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function GovernmentHeatmap({
  center,
  zoom,
  heatPoints,
  markers,
  riskZones,
  focusPosition,
  onOpenMarkerDetail,
}) {
  return (
    <div className="flex z-10 flex-1 flex-col overflow-hidden rounded-xl border border-[#C4C6CF] bg-bg-soft shadow-[0_4px_16px_0_rgba(26,54,93,0.08)]">
      <div className="relative flex-1">
        <MapContainer center={center} zoom={zoom} zoomControl={false} scrollWheelZoom className="h-full w-full z-10">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <ZoomControl position="bottomright" />
          <HeatLayer points={heatPoints} />
          <MapFlyTo position={focusPosition} />
          <MapControlsInternal homeCenter={center} homeZoom={zoom} />

          {riskZones.map((zone) => (
            <Circle
              key={zone.id}
              center={zone.position}
              radius={zone.radius}
              pathOptions={{ color: '#BA1A1A', fillColor: '#BA1A1A', fillOpacity: 0.18, weight: 1 }}
            />
          ))}

          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} icon={createMarkerIcon(marker.type)}>
              <Popup>
                <HeatmapMarkerPopup marker={marker} onOpenDetail={onOpenMarkerDetail} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <HeatmapLegend />
    </div>
  )
}

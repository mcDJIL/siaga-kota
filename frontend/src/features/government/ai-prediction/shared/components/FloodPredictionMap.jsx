import { useRef } from 'react'
import { MapContainer, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Compass, Minus, Plus } from 'lucide-react'
import { PredictionLegend } from './PredictionLegend'
import { RISK_COLORS, RISK_LABELS } from '../../utils/predictionColor'
import { formatPercentage, formatPopulation } from '../../utils/predictionFormatter'

function MapZoomButtons() {
  const map = useMap()

  return (
    <div className="absolute right-4 bottom-4 z-[400] flex flex-col gap-2">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        aria-label="Perbesar peta"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-[#C4C6CF]/30 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
      >
        <Plus className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        aria-label="Perkecil peta"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-[#C4C6CF]/30 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
      >
        <Minus className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
      </button>
    </div>
  )
}

export function FloodPredictionMap({ mapRef, center, zoom, zones }) {
  const containerRef = useRef(null)

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (mapRef) mapRef.current = node
      }}
      className="relative flex min-h-[500px] flex-1 overflow-hidden rounded-xl border border-[#C4C6CF]/30 bg-white shadow-[0_4px_14px_0_rgba(26,54,93,0.08)]"
    >
      <MapContainer center={center} zoom={zoom} zoomControl={false} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <MapZoomButtons />

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.polygon}
            pathOptions={{
              color: RISK_COLORS[zone.riskLevel],
              fillColor: RISK_COLORS[zone.riskLevel],
              fillOpacity: 0.35,
              weight: 1.5,
            }}
          >
            <Popup>
              <div className="flex min-w-[220px] flex-col gap-2 p-1">
                <h4 className="text-sm font-bold text-text-body">{zone.district}</h4>
                <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-text-muted">
                  <dt>Prediksi</dt>
                  <dd className="text-right font-semibold text-text-body">{formatPercentage(zone.prediction)}</dd>
                  <dt>Tingkat Risiko</dt>
                  <dd className="text-right font-semibold text-text-body">{RISK_LABELS[zone.riskLevel]}</dd>
                  <dt>Curah Hujan</dt>
                  <dd className="text-right font-semibold text-text-body">{zone.expectedRainfall}</dd>
                  <dt>Tinggi Genangan</dt>
                  <dd className="text-right font-semibold text-text-body">{zone.floodHeight}</dd>
                  <dt>Populasi Terdampak</dt>
                  <dd className="text-right font-semibold text-text-body">{formatPopulation(zone.affectedPopulation)}</dd>
                  <dt>Pembaruan</dt>
                  <dd className="text-right font-semibold text-text-body">{zone.lastUpdated}</dd>
                </dl>
                <p className="text-xs text-text-muted">
                  <span className="font-bold text-text-body">Rekomendasi:</span> {zone.recommendedAction}
                </p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute top-4 left-4 z-[400] flex items-center gap-2 rounded-md border border-[#C4C6CF]/20 bg-white/80 px-3 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] backdrop-blur-sm">
        <Compass className="h-5 w-5 text-navy" aria-hidden="true" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-body">Zona Prediksi Banjir</span>
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Peta interaktif 7-hari ke depan</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-[400]">
        <PredictionLegend />
      </div>
    </div>
  )
}

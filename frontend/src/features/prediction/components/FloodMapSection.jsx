import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import { Plus, Minus } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { mapMarkers, mapLegend, mapLayers } from '../data/predictionData'
import { LocateIcon } from './icons'

const STATUS_COLOR = {
  aman: '#006D40',
  waspada: '#715C00',
  bahaya: '#BA1A1A',
}

export function FloodMapSection() {
  const [activeLayer, setActiveLayer] = useState(mapLayers[0])

  return (
    <section id="peta-status" className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:py-20">
      <div className="flex flex-col items-center gap-4 pb-10 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Status Peta Saat Ini
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-text-muted">
          Visualisasi real-time kondisi genangan dan level air di seluruh penjuru kota Jakarta Selatan.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border-muted/30 bg-bg-blue-soft shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[560px] lg:h-[700px]"
      >
        <MapContainer
          center={[-6.2665, 106.8156]}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkers.map((marker) => (
            <CircleMarker
              key={marker.id}
              center={marker.position}
              radius={marker.status === 'bahaya' ? 14 : 12}
              pathOptions={{
                color: '#fff',
                weight: 2,
                fillColor: STATUS_COLOR[marker.status],
                fillOpacity: 1,
              }}
            />
          ))}
        </MapContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
          <div className="pointer-events-auto flex flex-wrap gap-1 self-start rounded-xl border border-border-muted/30 bg-white/90 p-1 backdrop-blur-[4px]">
            {mapLayers.map((layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => setActiveLayer(layer)}
                className={
                  layer === activeLayer
                    ? 'rounded-lg bg-navy px-6 py-2 text-xs font-bold tracking-[0.6px] text-white'
                    : 'rounded-lg px-6 py-2 text-xs font-bold tracking-[0.6px] text-navy'
                }
              >
                {layer}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/80 p-5 backdrop-blur-[6px]">
              <h3 className="border-b border-navy/10 pb-2 text-sm font-bold tracking-[0.7px] text-navy uppercase">
                Keterangan Status
              </h3>
              {mapLegend.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-semibold tracking-[0.14px] text-text-body">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="pointer-events-auto flex flex-col gap-3">
              <button
                type="button"
                aria-label="Pusatkan peta"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-navy shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] backdrop-blur-[4px]"
              >
                <LocateIcon className="h-[22px] w-[22px]" />
              </button>
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] backdrop-blur-[4px]">
                <button type="button" aria-label="Perbesar peta" className="flex h-12 w-12 items-center justify-center text-navy">
                  <Plus size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Perkecil peta"
                  className="flex h-12 w-12 items-center justify-center border-t border-border-muted/30 text-navy"
                >
                  <Minus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

import { useState } from 'react'
import { Plus, Minus, LocateFixed, RotateCcw, Layers } from 'lucide-react'
import { LayerSwitcher } from './LayerSwitcher'
import { locateUser, resetMapView } from '../utils/mapHelpers'

export function MapControlButtons({ map, layers, onToggleLayer, onLocationError }) {
  const [isLayerSwitcherOpen, setIsLayerSwitcherOpen] = useState(false)

  return (
    <div className="pointer-events-auto flex flex-col gap-2">
      <button
        type="button"
        aria-label="Perbesar peta"
        onClick={() => map?.zoomIn()}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/85 text-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md transition-transform hover:scale-105"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Perkecil peta"
        onClick={() => map?.zoomOut()}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/85 text-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md transition-transform hover:scale-105"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Gunakan lokasi saat ini"
        onClick={() => locateUser(map, onLocationError)}
        className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/85 text-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md transition-transform hover:scale-105"
      >
        <LocateFixed size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Reset tampilan peta"
        onClick={() => resetMapView(map)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/85 text-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md transition-transform hover:scale-105"
      >
        <RotateCcw size={18} aria-hidden="true" />
      </button>
      <div className="relative">
        <button
          type="button"
          aria-label="Tampilkan pilihan layer"
          aria-expanded={isLayerSwitcherOpen}
          onClick={() => setIsLayerSwitcherOpen((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/85 text-navy shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md transition-transform hover:scale-105"
        >
          <Layers size={18} aria-hidden="true" />
        </button>
        <LayerSwitcher isOpen={isLayerSwitcherOpen} layers={layers} onToggleLayer={onToggleLayer} />
      </div>
    </div>
  )
}

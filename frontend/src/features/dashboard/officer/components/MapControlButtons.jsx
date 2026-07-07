import { useMap } from 'react-leaflet'
import { LocateFixed, Minus, Plus } from 'lucide-react'

export function MapControlButtons({ homeCenter, homeZoom }) {
  const map = useMap()

  return (
    <div className="absolute top-6 right-6 z-[400] flex flex-col gap-3">
      <div className="flex flex-col overflow-hidden rounded-xl border border-border-muted bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <button
          type="button"
          aria-label="Perbesar peta"
          onClick={() => map.zoomIn()}
          className="border-b border-border-muted p-3 text-text-body"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Perkecil peta" onClick={() => map.zoomOut()} className="p-3 text-text-body">
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        aria-label="Kembali ke lokasi awal"
        onClick={() => map.flyTo(homeCenter, homeZoom, { duration: 0.6 })}
        className="rounded-xl border border-border-muted bg-white p-3 text-text-body shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
      >
        <LocateFixed className="h-[22px] w-[22px]" aria-hidden="true" />
      </button>
    </div>
  )
}

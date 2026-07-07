import { Plus, Minus } from 'lucide-react'

export function MapControls({ map }) {
  return (
    <div className="pointer-events-auto absolute top-4 left-4 flex flex-col gap-2 sm:top-6 sm:left-6">
      <button
        type="button"
        aria-label="Perbesar peta"
        onClick={() => map?.zoomIn()}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
      >
        <Plus size={14} />
      </button>
      <button
        type="button"
        aria-label="Perkecil peta"
        onClick={() => map?.zoomOut()}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
      >
        <Minus size={14} />
      </button>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { LAYER_OPTIONS } from '../hooks/useMapLayers'

export function FilterButton({ layers, onToggleLayer, advancedFilters, onChangeAdvancedFilter }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Buka filter tambahan"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] transition-transform hover:scale-105"
      >
        <SlidersHorizontal size={18} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 z-10 mt-2 w-64 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10)] backdrop-blur-md"
          >
            <p className="mb-2 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Layer</p>
            <div className="mb-4 flex flex-col gap-2">
              {LAYER_OPTIONS.map((option) => (
                <label key={option.key} className="flex items-center gap-2 text-sm text-text-body">
                  <input
                    type="checkbox"
                    checked={layers[option.key]}
                    onChange={() => onToggleLayer(option.key)}
                    className="h-4 w-4 rounded border-border-muted text-navy focus:ring-brand-green"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <label className="mb-3 block text-sm text-text-body">
              <span className="mb-1 block text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Priority</span>
              <select
                value={advancedFilters.priority}
                onChange={(event) => onChangeAdvancedFilter('priority', event.target.value)}
                className="w-full rounded-lg bg-bg-blue-soft px-3 py-2 text-sm text-text-body focus:outline-2 focus:outline-brand-green"
              >
                <option value="all">Semua</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </label>

            <label className="block text-sm text-text-body">
              <span className="mb-1 block text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Status</span>
              <select
                value={advancedFilters.status}
                onChange={(event) => onChangeAdvancedFilter('status', event.target.value)}
                className="w-full rounded-lg bg-bg-blue-soft px-3 py-2 text-sm text-text-body focus:outline-2 focus:outline-brand-green"
              >
                <option value="all">Semua</option>
                <option value="waiting">Menunggu</option>
                <option value="in_progress">Diproses</option>
                <option value="resolved">Selesai</option>
              </select>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

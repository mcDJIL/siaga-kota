import { AnimatePresence, motion } from 'framer-motion'
import { LAYER_OPTIONS } from '../hooks/useMapLayers'

export function LayerSwitcher({ isOpen, layers, onToggleLayer }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 right-full mr-2 w-48 rounded-2xl border border-white/30 bg-white/95 p-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10)] backdrop-blur-md"
        >
          <p className="mb-2 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Layers</p>
          <div className="flex flex-col gap-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

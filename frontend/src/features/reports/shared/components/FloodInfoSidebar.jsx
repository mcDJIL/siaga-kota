import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../../../lib/cn'
import { FloodPointCard } from './FloodPointCard'

export function FloodInfoSidebar({ markers, selectedId, onSelect, className }) {
  const navigate = useNavigate()
  const selectedMarker = markers.find((marker) => marker.id === selectedId)

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className={cn('pointer-events-auto flex w-56 flex-col gap-2', className)}
    >
      <p className="text-[10px] font-bold tracking-[0.6px] text-text-muted uppercase">Laporan Terbaru</p>
      <div className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
        {markers.map((marker) => (
          <FloodPointCard key={marker.id} marker={marker} isSelected={marker.id === selectedId} onSelect={onSelect} />
        ))}
      </div>

      <AnimatePresence>
        {selectedMarker && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => navigate(`/citizen/reports/${selectedMarker.id}`)}
            className="rounded-lg bg-navy px-3 py-2 text-xs font-bold text-white"
          >
            Lihat Detail
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

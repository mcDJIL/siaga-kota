import { motion } from 'framer-motion'
import { Navigation, MapPin } from 'lucide-react'
import { DashboardMapContainer } from './DashboardMapContainer'
import { useDashboardContext } from '../../context/DashboardContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import { MapSkeleton } from '../skeletons/MapSkeleton'

export function ActivityMapCard() {
  const { mapLocations, loading } = useDashboardContext()
  const { location: geoLocation, loading: geoLoading } = useGeolocation()
  const activeCount = mapLocations.length

  if (loading) {
    return <MapSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-80 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-bg-blue-light px-4 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-navy">Pantauan Peta Tugas</h3>
          {geoLoading && (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <MapPin className="h-3 w-3 animate-pulse" />
            </span>
          )}
          {geoLocation && !geoLoading && (
            <span className="inline-flex items-center gap-1 text-xs text-brand-green font-semibold">
              <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              Live
            </span>
          )}
        </div>
        <span className="rounded-full bg-brand-green-lighter px-2 py-0.5 text-[10px] font-bold text-[#002110]">
          {activeCount} AKTIF
        </span>
      </div>

      <div className="relative flex-1 bg-bg-blue-lighter">
        <DashboardMapContainer />

        {activeCount > 0 && (
          <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-lg border border-navy/10 bg-white/90 p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
              <span className="text-[11px] font-bold text-text-body">Laporan tersedia</span>
            </span>
            <button
              type="button"
              className="pointer-events-auto rounded bg-navy px-3 py-1 text-[10px] font-bold tracking-[0.25px] text-white uppercase"
            >
              Mulai
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

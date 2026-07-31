import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Image, MapPin } from 'lucide-react'
import { DashboardMap } from '../../shared/map/DashboardMap'
import { FloodMarker } from '../../shared/map/FloodMarker'
import { SensorMarker } from '../../shared/map/SensorMarker'
import { PriorityMarker } from '../../shared/map/PriorityMarker'
import { RoutePolyline } from '../../shared/map/RoutePolyline'
import { MapLegend } from '../../shared/map/MapLegend'
import { FloodMonitoringCardSkeleton } from './FloodMonitoringCardSkeleton'
import { useGeolocation } from '../hooks/useGeolocation'
import {
  FLOOD_INCIDENT_MARKERS,
  FLOOD_MAP_CENTER,
  FLOOD_MAP_ZOOM,
  MONITORING_ROUTE,
  PRIORITY_AREA,
  SENSOR_MARKERS,
} from '../data/floodMapData'

export function FloodMonitoringCard({ reports = [], loading = false }) {
  const { location: userLocation, error: geoError, loading: geoLoading } = useGeolocation()

  // Use user location as map center if available, otherwise use default
  const mapCenter = useMemo(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      return [userLocation.latitude, userLocation.longitude]
    }
    return FLOOD_MAP_CENTER
  }, [userLocation])

  if (loading) {
    return <FloodMonitoringCardSkeleton />
  }

  // Convert API reports to map markers with correct format for LeafletMarker
  const floodMarkers = reports
    .map(report => {
      const lat = report.location?.latitude
      const lng = report.location?.longitude

      if (!lat || !lng) return null

      return {
        id: report.id,
        code: report.code,
        position: [lat, lng],
        title: report.title || report.code,
        priority: report.priority,
        status: report.status,
        waterHeight: report.water_level_cm,
        location: report.location?.address || 'Lokasi tidak diketahui',
      }
    })
    .filter(Boolean) // Remove null entries

  const displayMarkers = floodMarkers.length > 0 ? floodMarkers : FLOOD_INCIDENT_MARKERS

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="flood-monitoring-heading"
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] print:hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-muted bg-bg-soft px-6 py-4">
        <div className="flex items-center gap-2">
          <Image className="h-[18px] w-[18px] text-navy" aria-hidden="true" />
          <h2 id="flood-monitoring-heading" className="text-base font-normal text-navy">
            Titik Banjir Langsung ({displayMarkers.length})
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#BA1A1A]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-body">Prioritas Tinggi</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-navy" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-body">Pemantauan</span>
          </span>
          {userLocation && !geoLoading && (
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-green">
              <MapPin className="h-3 w-3" />
              Lokasi Anda
            </span>
          )}
          {geoLoading && (
            <span className="flex items-center gap-1 text-xs font-semibold text-text-muted">
              <MapPin className="h-3 w-3 animate-pulse" />
              Mendeteksi lokasi...
            </span>
          )}
          {geoError && (
            <span className="flex items-center gap-1 text-xs font-semibold text-text-muted" title={geoError}>
              <MapPin className="h-3 w-3" />
              Lokasi default
            </span>
          )}
          <button
            type="button"
            className="rounded-lg bg-bg-blue-light px-4 py-2 text-base text-navy-light"
          >
            Tampilan Luas
          </button>
        </div>
      </div>

      <div className="relative h-[450px] bg-bg-blue-lighter">
        <DashboardMap center={mapCenter} zoom={FLOOD_MAP_ZOOM} className="h-full w-full">
          <PriorityMarker area={PRIORITY_AREA} />
          <RoutePolyline route={MONITORING_ROUTE} />
          {SENSOR_MARKERS.map((sensor) => (
            <SensorMarker key={sensor.id} sensor={sensor} />
          ))}
          {displayMarkers.map((report) => (
            <FloodMarker key={report.id} report={report} />
          ))}
        </DashboardMap>

        <MapLegend />
      </div>
    </motion.section>
  )
}

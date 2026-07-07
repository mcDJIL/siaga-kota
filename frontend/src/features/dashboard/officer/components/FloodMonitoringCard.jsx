import { motion } from 'framer-motion'
import { Image } from 'lucide-react'
import { DashboardMap } from '../../shared/map/DashboardMap'
import { FloodMarker } from '../../shared/map/FloodMarker'
import { SensorMarker } from '../../shared/map/SensorMarker'
import { PriorityMarker } from '../../shared/map/PriorityMarker'
import { RoutePolyline } from '../../shared/map/RoutePolyline'
import { MapLegend } from '../../shared/map/MapLegend'
import {
  FLOOD_INCIDENT_MARKERS,
  FLOOD_MAP_CENTER,
  FLOOD_MAP_ZOOM,
  MONITORING_ROUTE,
  PRIORITY_AREA,
  SENSOR_MARKERS,
} from '../data/floodMapData'

export function FloodMonitoringCard() {
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
            Titik Banjir Langsung
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
          <button
            type="button"
            className="rounded-lg bg-bg-blue-light px-4 py-2 text-base text-navy-light"
          >
            Tampilan Luas
          </button>
        </div>
      </div>

      <div className="relative h-[450px] bg-bg-blue-lighter">
        <DashboardMap center={FLOOD_MAP_CENTER} zoom={FLOOD_MAP_ZOOM} className="h-full w-full">
          <PriorityMarker area={PRIORITY_AREA} />
          <RoutePolyline route={MONITORING_ROUTE} />
          {SENSOR_MARKERS.map((sensor) => (
            <SensorMarker key={sensor.id} sensor={sensor} />
          ))}
          {FLOOD_INCIDENT_MARKERS.map((report) => (
            <FloodMarker key={report.id} report={report} />
          ))}
        </DashboardMap>

        <MapLegend />
      </div>
    </motion.section>
  )
}

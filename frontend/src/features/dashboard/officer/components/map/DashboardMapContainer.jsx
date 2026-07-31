import { useEffect } from 'react'
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { OfficerMarker } from './OfficerMarker'
import { ReportMarker } from './ReportMarker'
import { TaskMarker } from './TaskMarker'
import { RoutePolyline } from './RoutePolyline'
import { MAP_CENTER, MAP_ZOOM, ROUTE_TO_ACTIVE_TASK } from '../../data/mapData'
import { useDashboardContext } from '../../context/DashboardContext'
import { useGeolocation } from '../../hooks/useGeolocation'

function MapUpdater({ location }) {
  const map = useMap()

  useEffect(() => {
    if (location) {
      const newCenter = [location.latitude, location.longitude]
      map.flyTo(newCenter, MAP_ZOOM, { duration: 2 })
    }
  }, [location, map])

  return null
}

export function DashboardMapContainer() {
  const { mapLocations } = useDashboardContext()
  const { location } = useGeolocation()

  const mapCenter = location ? [location.latitude, location.longitude] : MAP_CENTER
  const officerLocation = location
    ? {
        id: 'officer-current',
        position: [location.latitude, location.longitude],
        name: 'Lokasi Anda',
      }
    : null

  return (
    <LeafletMap
      center={mapCenter}
      zoom={MAP_ZOOM}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <MapUpdater location={location} />
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <RoutePolyline route={ROUTE_TO_ACTIVE_TASK} />
      {officerLocation && <OfficerMarker officer={officerLocation} />}
      {mapLocations.map((marker) =>
        marker.category === 'sampah' || marker.type === 'report' ? (
          <ReportMarker key={marker.id} report={marker} />
        ) : (
          <TaskMarker key={marker.id} task={marker} />
        )
      )}
    </LeafletMap>
  )
}

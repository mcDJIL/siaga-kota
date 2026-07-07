import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { OfficerMarker } from './OfficerMarker'
import { ReportMarker } from './ReportMarker'
import { TaskMarker } from './TaskMarker'
import { RoutePolyline } from './RoutePolyline'
import { MAP_CENTER, MAP_ZOOM, OFFICER_LOCATION, ROUTE_TO_ACTIVE_TASK, TASK_MARKERS } from '../../data/mapData'

export function DashboardMapContainer() {
  return (
    <LeafletMap
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <RoutePolyline route={ROUTE_TO_ACTIVE_TASK} />
      <OfficerMarker officer={OFFICER_LOCATION} />
      {TASK_MARKERS.map((marker) =>
        marker.type === 'report' ? (
          <ReportMarker key={marker.id} report={marker} />
        ) : (
          <TaskMarker key={marker.id} task={marker} />
        )
      )}
    </LeafletMap>
  )
}

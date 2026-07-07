import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export function DashboardMap({ center, zoom = 13, className, children }) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={false} className={className}>
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <ZoomControl position="bottomright" />
      {children}
    </MapContainer>
  )
}

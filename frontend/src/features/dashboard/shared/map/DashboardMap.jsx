import { useEffect } from 'react'
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapFlyTo({ position, zoom }) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom ?? map.getZoom(), { duration: 0.8 })
    }
  }, [position, zoom, map])

  return null
}

export function DashboardMap({
  center,
  zoom = 13,
  focusPosition,
  focusZoom,
  showZoomControl = true,
  className,
  children,
}) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={false} className={className}>
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {showZoomControl && <ZoomControl position="bottomright" />}
      <MapFlyTo position={focusPosition} zoom={focusZoom} />
      {children}
    </MapContainer>
  )
}

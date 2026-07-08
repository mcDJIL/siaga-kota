import { useEffect } from 'react'
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationMarker } from './LocationMarker'

function ClickHandler({ onChange }) {
  useMapEvents({
    click(event) {
      onChange({ lat: event.latlng.lat, lng: event.latlng.lng })
    },
  })
  return null
}

function MapRecenter({ position }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, map.getZoom(), { duration: 0.6 })
  }, [position, map])

  return null
}

export function LocationPickerMap({ position, onChange, className }) {
  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} zoomControl={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <ClickHandler onChange={onChange} />
      <MapRecenter position={position} />
      <LocationMarker position={position} onDragEnd={onChange} />
    </MapContainer>
  )
}

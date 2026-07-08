import { useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationMarker } from '../../../dashboard/shared/map/LocationMarker'

const SEVERITY_COLORS = {
  'very-low': '#2563EB',
  low: '#2563EB',
  medium: '#EAB308',
  high: '#F97316',
  critical: '#DC2626',
}

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

export function LocationPickerMap({
  position,
  onChange,
  floodMarkers = [],
  selectedMarkerId,
  onSelectMarker,
  className,
}) {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} zoomControl={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <ClickHandler onChange={onChange} />
      <MapRecenter position={position} />
      <LocationMarker position={position} onDragEnd={onChange} />

      {floodMarkers.map((marker) => (
        <CircleMarker
          key={marker.id}
          center={marker.position}
          radius={marker.id === selectedMarkerId ? 12 : 9}
          pathOptions={{
            color: '#fff',
            weight: 2,
            fillColor: SEVERITY_COLORS[marker.severity],
            fillOpacity: 0.9,
          }}
          eventHandlers={{ click: () => onSelectMarker?.(marker.id) }}
        >
          <Popup>
            <strong>{marker.areaName}</strong>
            <br />
            Tinggi air: {marker.waterHeightCm} cm
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

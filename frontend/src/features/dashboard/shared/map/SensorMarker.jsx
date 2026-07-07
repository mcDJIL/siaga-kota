import { CircleMarker } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function SensorMarker({ sensor }) {
  return (
    <CircleMarker
      center={sensor.position}
      radius={8}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#1A365D', fillOpacity: 1 }}
    >
      <MarkerPopup title={sensor.label} description="Sensor IoT aktif" />
    </CircleMarker>
  )
}

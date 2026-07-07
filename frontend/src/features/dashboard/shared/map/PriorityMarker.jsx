import { Circle } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function PriorityMarker({ area }) {
  return (
    <Circle
      center={area.position}
      radius={area.radius}
      pathOptions={{ color: '#BA1A1A', weight: 1, fillColor: '#BA1A1A', fillOpacity: 0.12 }}
    >
      <MarkerPopup title={area.label} description="Zona prioritas penanganan" />
    </Circle>
  )
}

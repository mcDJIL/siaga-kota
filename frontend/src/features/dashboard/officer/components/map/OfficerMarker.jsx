import { CircleMarker } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function OfficerMarker({ officer }) {
  return (
    <CircleMarker
      center={officer.position}
      radius={9}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#006D40', fillOpacity: 1 }}
    >
      <MarkerPopup title={officer.name} description="Lokasi petugas saat ini" />
    </CircleMarker>
  )
}

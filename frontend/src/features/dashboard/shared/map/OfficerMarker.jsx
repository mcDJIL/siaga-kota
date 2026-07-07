import { CircleMarker } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function OfficerMarker({ officer }) {
  return (
    <CircleMarker
      center={officer.position}
      radius={8}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#74777F', fillOpacity: 1 }}
    >
      <MarkerPopup title={officer.name} description={officer.currentTask ?? 'Tersedia untuk penugasan'} />
    </CircleMarker>
  )
}

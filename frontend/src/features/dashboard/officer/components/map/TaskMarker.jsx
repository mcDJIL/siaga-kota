import { CircleMarker } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function TaskMarker({ task }) {
  return (
    <CircleMarker
      center={task.position}
      radius={9}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#715C00', fillOpacity: 1 }}
    >
      <MarkerPopup title={`${task.id} · ${task.title}`} description={task.description} />
    </CircleMarker>
  )
}

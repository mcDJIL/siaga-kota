import { CircleMarker, Popup } from 'react-leaflet'
import { MarkerPopupCard } from './MarkerPopupCard'

export function FloodMarker({ marker, isSelected, onSelect }) {
  return (
    <CircleMarker
      center={marker.position}
      radius={isSelected ? 12 : 9}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#455F88', fillOpacity: 0.9 }}
      eventHandlers={{
        click: () => onSelect(marker),
      }}
    >
      <Popup>
        <MarkerPopupCard object={marker} />
      </Popup>
    </CircleMarker>
  )
}

import { CircleMarker, Popup } from 'react-leaflet'

export function MapMarker({ position, color, radius = 10, title, description }) {
  return (
    <CircleMarker
      center={position}
      radius={radius}
      pathOptions={{ color: '#fff', weight: 2, fillColor: color, fillOpacity: 1 }}
    >
      {(title || description) && (
        <Popup>
          <div className="flex flex-col gap-1">
            {title && <span className="font-sans text-sm font-semibold text-navy">{title}</span>}
            {description && <span className="text-xs text-text-muted">{description}</span>}
          </div>
        </Popup>
      )}
    </CircleMarker>
  )
}

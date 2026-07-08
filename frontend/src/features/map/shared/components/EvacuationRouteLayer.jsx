import { useState } from 'react'
import { Polyline, Popup } from 'react-leaflet'

export function EvacuationRouteLayer({ route }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <Polyline
      positions={route.positions}
      pathOptions={{
        color: '#00522F',
        weight: isActive ? 5 : 3,
        dashArray: isActive ? undefined : '8',
      }}
      eventHandlers={{
        click: () => setIsActive((prev) => !prev),
      }}
    >
      <Popup>
        <div className="flex w-56 flex-col gap-1">
          <h3 className="font-display text-sm font-semibold text-navy">{route.title}</h3>
          <p className="text-xs font-semibold text-brand-green-dark">Tujuan: {route.destination}</p>
          <p className="text-xs text-text-muted">{route.description}</p>
        </div>
      </Popup>
    </Polyline>
  )
}

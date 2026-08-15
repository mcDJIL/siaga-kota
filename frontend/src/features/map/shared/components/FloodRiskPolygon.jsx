import { useState } from 'react'
import { Polygon, Popup } from 'react-leaflet'

export function FloodRiskPolygon({ zone }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Polygon
      positions={zone.positions}
      pathOptions={{
        color: zone.color || '#BA1A1A',
        weight: 2,
        opacity: 0.7,
        fillColor: zone.color || '#BA1A1A',
        fillOpacity: isHovered ? 0.45 : 0.2,
      }}
      eventHandlers={{
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false),
      }}
    >
      <Popup>
        <div className="flex w-56 flex-col gap-1">
          <h3 className="font-display text-sm font-semibold text-navy">{zone.title}</h3>
          <p className="text-xs font-semibold text-[#BA1A1A]">Tingkat Risiko: {zone.level}</p>
          <p className="text-xs text-text-muted">{zone.description}</p>
        </div>
      </Popup>
    </Polygon>
  )
}

import { Polygon } from 'react-leaflet'

export function MapPolygon({ positions, color = '#BA1A1A', fillOpacity = 0.35 }) {
  return (
    <Polygon
      positions={positions}
      pathOptions={{ color, weight: 2, opacity: 0.6, fillColor: color, fillOpacity }}
    />
  )
}

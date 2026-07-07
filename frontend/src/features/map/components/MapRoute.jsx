import { Polyline } from 'react-leaflet'

export function MapRoute({ positions, color = '#BA1A1A' }) {
  return <Polyline positions={positions} pathOptions={{ color, weight: 3, dashArray: '8' }} />
}

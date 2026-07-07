import { Polyline } from 'react-leaflet'

export function RoutePolyline({ route }) {
  return <Polyline positions={route.positions} pathOptions={{ color: '#002045', weight: 3, dashArray: '6 6' }} />
}

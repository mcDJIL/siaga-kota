import { Polyline } from 'react-leaflet'

export function DispatchPolyline({ officerPosition, taskPosition }) {
  if (!officerPosition || !taskPosition) return null

  return (
    <Polyline
      positions={[officerPosition, taskPosition]}
      pathOptions={{ color: '#002045', weight: 3, dashArray: '6 6' }}
    />
  )
}

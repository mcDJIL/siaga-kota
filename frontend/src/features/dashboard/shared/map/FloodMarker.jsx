import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { MarkerPopup } from './MarkerPopup'

const floodIcon = L.divIcon({
  className: '',
  html: '<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#BA1A1A;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export function FloodMarker({ report }) {
  return (
    <Marker position={report.position} icon={floodIcon}>
      <MarkerPopup title={`${report.id} \u00b7 ${report.location}`} description={`Tinggi air: ${report.waterHeight} cm`} />
    </Marker>
  )
}

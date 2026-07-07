import { CircleMarker } from 'react-leaflet'
import { MarkerPopup } from './MarkerPopup'

export function ReportMarker({ report }) {
  return (
    <CircleMarker
      center={report.position}
      radius={9}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#002045', fillOpacity: 1 }}
    >
      <MarkerPopup title={`${report.id} · ${report.title}`} description={report.description} />
    </CircleMarker>
  )
}

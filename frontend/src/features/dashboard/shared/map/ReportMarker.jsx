import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { MarkerPopup } from './MarkerPopup'

const CATEGORY_COLORS = { sampah: '#006D40', banjir: '#002045' }

function createReportIcon(color, isSelected) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:${isSelected ? 20 : 16}px;height:${isSelected ? 20 : 16}px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></span>`,
    iconSize: [isSelected ? 20 : 16, isSelected ? 20 : 16],
    iconAnchor: [isSelected ? 10 : 8, isSelected ? 10 : 8],
  })
}

export function ReportMarker({ report, isSelected = false, onSelect }) {
  const color = CATEGORY_COLORS[report.category] ?? '#74777F'

  return (
    <Marker
      position={report.position}
      icon={createReportIcon(color, isSelected)}
      eventHandlers={{ click: () => onSelect?.(report.id) }}
    >
      <MarkerPopup title={report.title} description={`${report.location} \u00b7 ${report.reportedAt}`} />
    </Marker>
  )
}

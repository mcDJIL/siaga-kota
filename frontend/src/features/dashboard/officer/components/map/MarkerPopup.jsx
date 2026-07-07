import { Popup } from 'react-leaflet'

export function MarkerPopup({ title, description }) {
  return (
    <Popup>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-navy">{title}</span>
        {description && <span className="text-xs text-text-muted">{description}</span>}
      </div>
    </Popup>
  )
}

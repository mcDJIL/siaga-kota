import { Marker, Circle } from 'react-leaflet'
import L from 'leaflet'
import { MarkerPopup } from './MarkerPopup'

function createUserIcon(isSelected) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${isSelected ? 32 : 24}px;
        height: ${isSelected ? 32 : 24}px;
        border-radius: 9999px;
        background: #1A365D;
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        transition: all 0.2s ease;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
        </svg>
      </div>
    `,
    iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
    iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
    popupAnchor: [0, -20],
  })
}

export function UserMarker({ position, isSelected = false, accuracy = null }) {
  if (!position || !position[0] || !position[1]) {
    return null
  }

  return (
    <>
      <Marker
        position={position}
        icon={createUserIcon(isSelected)}
        zIndexOffset={1000}
      >
        <MarkerPopup
          title="Lokasi Anda"
          description={accuracy ? `Akurasi: ±${Math.round(accuracy)}m` : 'Posisi saat ini'}
        />
      </Marker>
      
      {accuracy && (
        <Circle
          center={position}
          radius={accuracy}
          pathOptions={{
            color: '#1A365D',
            fillColor: '#1A365D',
            fillOpacity: 0.05,
            weight: 1,
            opacity: 0.3,
            dashArray: '4 4',
          }}
        />
      )}
    </>
  )
}

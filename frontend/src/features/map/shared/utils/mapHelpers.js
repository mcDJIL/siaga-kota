export const CITIZEN_MAP_CENTER = [-8.1735, 113.6935]
export const CITIZEN_MAP_ZOOM = 15
export const CITIZEN_MAP_FOCUS_ZOOM = 17

export function focusMapOnPosition(map, position, zoom = CITIZEN_MAP_FOCUS_ZOOM) {
  if (!map || !position) return
  map.flyTo(position, zoom, { duration: 0.8 })
}

export function resetMapView(map) {
  if (!map) return
  map.flyTo(CITIZEN_MAP_CENTER, CITIZEN_MAP_ZOOM, { duration: 0.8 })
}

export function locateUser(map, onError) {
  if (!navigator.geolocation) {
    onError?.('Geolocation tidak didukung oleh perangkat ini.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (result) => {
      const position = [result.coords.latitude, result.coords.longitude]
      focusMapOnPosition(map, position, CITIZEN_MAP_FOCUS_ZOOM)
    },
    () => {
      onError?.('Gagal mengambil lokasi saat ini.')
    },
    { enableHighAccuracy: true, timeout: 8000 }
  )
}

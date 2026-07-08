import { useMemo, useState } from 'react'

export function useFloodMarkers(markers) {
  const [selectedId, setSelectedId] = useState(markers[0]?.id ?? null)

  const selectedMarker = useMemo(
    () => markers.find((marker) => marker.id === selectedId) ?? null,
    [markers, selectedId]
  )

  return { selectedId, selectedMarker, selectMarker: setSelectedId }
}

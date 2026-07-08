export function buildSearchIndex({ wasteMarkers, floodMarkers, tpsMarkers, evacuationRoutes, riskZones }) {
  return [
    ...wasteMarkers.map((marker) => ({ ...marker, kind: 'marker' })),
    ...floodMarkers.map((marker) => ({ ...marker, kind: 'marker' })),
    ...tpsMarkers.map((marker) => ({ ...marker, kind: 'marker' })),
    ...evacuationRoutes.map((route) => ({
      ...route,
      kind: 'route',
      position: route.positions[0],
    })),
    ...riskZones.map((zone) => ({
      ...zone,
      kind: 'zone',
      position: zone.positions[0],
    })),
  ]
}

export function searchMapObjects(objects, query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return objects.filter((object) => {
    const haystack = [object.title, object.address, object.category, object.destination]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(normalized)
  })
}

export function filterMarkersByTab(markers, tab) {
  if (tab === 'last24h') {
    return markers.filter((marker) => (marker.hoursAgo ?? 0) <= 24)
  }
  if (tab === 'inProgress') {
    return markers.filter((marker) => marker.status === 'in_progress')
  }
  return markers
}

export function getSeverityVariant(severity) {
  if (severity === 'Tinggi') return 'danger'
  if (severity === 'Sedang') return 'warning'
  return 'success'
}

export function getStatusVariant(status) {
  if (status === 'resolved') return 'success'
  if (status === 'in_progress') return 'warning'
  return 'danger'
}

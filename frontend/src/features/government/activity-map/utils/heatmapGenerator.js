export function buildHeatPoints(layer, wastePoints, floodPoints) {
  const source =
    layer === 'waste' ? wastePoints : layer === 'flood' ? floodPoints : [...wastePoints, ...floodPoints]

  return source.map((point) => [point.position[0], point.position[1], point.intensity])
}

export function buildVisibleMarkers(layer, wastePoints, floodPoints, aiHotspots) {
  const layerMarkers =
    layer === 'waste' ? wastePoints : layer === 'flood' ? floodPoints : [...wastePoints, ...floodPoints]

  return [...layerMarkers, ...aiHotspots]
}

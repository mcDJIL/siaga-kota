export function buildHeatPoints(layer, wastePoints = [], floodPoints = []) {
  const source =
    layer === 'waste' ? wastePoints : layer === 'flood' ? floodPoints : [...wastePoints, ...floodPoints]

  return source.map((point) => [point.position[0], point.position[1], point.intensity ?? 0.7])
}

export function buildVisibleMarkers(layer, wastePoints = [], floodPoints = [], aiHotspots = []) {
  const layerMarkers =
    layer === 'waste' ? wastePoints : layer === 'flood' ? floodPoints : [...wastePoints, ...floodPoints]

  return [...layerMarkers, ...aiHotspots]
}

export function buildAIRiskZones(aiPredictions = []) {
  return aiPredictions
    .filter((pred) => pred.riskLevel === 'Tinggi')
    .map((pred) => ({
      id: pred.id,
      position: pred.position,
      radius: 450 + Math.random() * 350,
    }))
}

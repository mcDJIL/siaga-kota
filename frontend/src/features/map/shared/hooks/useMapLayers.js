import { useState } from 'react'

const DEFAULT_LAYERS = {
  waste: true,
  flood: true,
  tps: true,
  evacuation: true,
  riskZones: true,
}

export const LAYER_OPTIONS = [
  { key: 'waste', label: 'Waste' },
  { key: 'flood', label: 'Flood' },
  { key: 'tps', label: 'TPS' },
  { key: 'evacuation', label: 'Evacuation' },
  { key: 'riskZones', label: 'Flood Risk' },
]

export function useMapLayers() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS)

  function toggleLayer(key) {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return { layers, toggleLayer }
}

export const JEMBER_CENTER = [-8.1724, 113.7008]
export const JEMBER_ZOOM = 13

const LOCATIONS = [
  { name: 'Alun-Alun Jember', position: [-8.1724, 113.7008] },
  { name: 'Universitas Jember', position: [-8.1631, 113.7219] },
  { name: 'Patrang', position: [-8.1523, 113.7024] },
  { name: 'Kaliwates', position: [-8.1795, 113.6947] },
  { name: 'Sumbersari', position: [-8.1668, 113.7157] },
  { name: 'Tegal Besar', position: [-8.1932, 113.7231] },
  { name: 'Ajung', position: [-8.2117, 113.6698] },
  { name: 'Mangli', position: [-8.1611, 113.6789] },
  { name: 'Arjasa', position: [-8.0864, 113.7422] },
  { name: 'Ambulu', position: [-8.3459, 113.6079] },
  { name: 'Balung', position: [-8.2814, 113.5638] },
  { name: 'Rambipuji', position: [-8.2231, 113.6142] },
]

function jitter(value, range = 0.012) {
  return value + (Math.random() - 0.5) * range
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function buildPoints(type, count, categories, riskLevels) {
  const points = []
  for (let i = 0; i < count; i += 1) {
    const location = randomFrom(LOCATIONS)
    const intensity = Number((0.3 + Math.random() * 0.7).toFixed(2))
    points.push({
      id: `${type}-${i + 1}`,
      type,
      location: location.name,
      position: [jitter(location.position[0]), jitter(location.position[1])],
      category: randomFrom(categories),
      riskLevel: randomFrom(riskLevels),
      reportCount: Math.floor(10 + Math.random() * 90),
      intensity,
      lastUpdated: `${Math.floor(1 + Math.random() * 23)} jam lalu`,
    })
  }
  return points
}

export const WASTE_POINTS = buildPoints(
  'waste',
  32,
  ['Sampah Organik', 'Sampah Plastik', 'Sampah B3', 'Tumpukan Liar'],
  ['Rendah', 'Sedang', 'Tinggi']
)

export const FLOOD_POINTS = buildPoints(
  'flood',
  28,
  ['Genangan', 'Luapan Sungai', 'Drainase Tersumbat'],
  ['Rendah', 'Sedang', 'Tinggi']
)

export const AI_HOTSPOTS = buildPoints(
  'ai',
  16,
  ['Prediksi Banjir', 'Prediksi Kepadatan Sampah'],
  ['Sedang', 'Tinggi']
)

export const AI_RISK_ZONES = AI_HOTSPOTS.filter((point) => point.riskLevel === 'Tinggi').map((point) => ({
  id: `zone-${point.id}`,
  position: point.position,
  radius: 450 + Math.random() * 350,
}))

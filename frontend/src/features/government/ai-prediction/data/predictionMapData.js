export const JEMBER_CENTER = [-8.1724, 113.7008]
export const JEMBER_ZOOM = 13

function buildCirclePolygon(center, radiusDeg, points = 24) {
  const coords = []
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2
    coords.push([center[0] + Math.sin(angle) * radiusDeg, center[1] + Math.cos(angle) * radiusDeg * 1.15])
  }
  return coords
}

export const PREDICTION_ZONES = [
  {
    id: 'manggala',
    district: 'Kecamatan Manggala',
    riskLevel: 'high',
    prediction: 89,
    expectedRainfall: '120 mm',
    floodHeight: '40-60 cm',
    affectedPopulation: 8400,
    recommendedAction: 'Pembersihan sedimen drainase utama & siapkan pompa mobile.',
    lastUpdated: '10 menit lalu',
    center: [-8.1724, 113.7008],
    polygon: buildCirclePolygon([-8.1724, 113.7008], 0.014),
  },
  {
    id: 'panakkukang',
    district: 'Kecamatan Panakkukang',
    riskLevel: 'high',
    prediction: 82,
    expectedRainfall: '105 mm',
    floodHeight: '30-50 cm',
    affectedPopulation: 6200,
    recommendedAction: 'Evakuasi dini aset dasar & pengecekan pintu air sektor 3.',
    lastUpdated: '18 menit lalu',
    center: [-8.1631, 113.7219],
    polygon: buildCirclePolygon([-8.1631, 113.7219], 0.011),
  },
  {
    id: 'biringkanaya',
    district: 'Kecamatan Biringkanaya',
    riskLevel: 'medium',
    prediction: 65,
    expectedRainfall: '80 mm',
    floodHeight: '15-30 cm',
    affectedPopulation: 4100,
    recommendedAction: 'Pembersihan tumpukan sampah liar di kanal sekunder.',
    lastUpdated: '32 menit lalu',
    center: [-8.1795, 113.6947],
    polygon: buildCirclePolygon([-8.1795, 113.6947], 0.013),
  },
  {
    id: 'tamalanrea',
    district: 'Kecamatan Tamalanrea',
    riskLevel: 'medium',
    prediction: 58,
    expectedRainfall: '75 mm',
    floodHeight: '10-25 cm',
    affectedPopulation: 3500,
    recommendedAction: 'Patroli kebersihan gorong-gorong dan himbauan warga.',
    lastUpdated: '45 menit lalu',
    center: [-8.1523, 113.7024],
    polygon: buildCirclePolygon([-8.1523, 113.7024], 0.012),
  },
  {
    id: 'ajung',
    district: 'Kecamatan Ajung',
    riskLevel: 'low',
    prediction: 28,
    expectedRainfall: '40 mm',
    floodHeight: '<10 cm',
    affectedPopulation: 1200,
    recommendedAction: 'Pemantauan rutin, tidak ada tindakan mendesak.',
    lastUpdated: '1 jam lalu',
    center: [-8.2117, 113.6698],
    polygon: buildCirclePolygon([-8.2117, 113.6698], 0.016),
  },
  {
    id: 'mangli',
    district: 'Kecamatan Mangli',
    riskLevel: 'low',
    prediction: 22,
    expectedRainfall: '35 mm',
    floodHeight: '<10 cm',
    affectedPopulation: 900,
    recommendedAction: 'Pemantauan rutin, tidak ada tindakan mendesak.',
    lastUpdated: '1 jam lalu',
    center: [-8.1611, 113.6789],
    polygon: buildCirclePolygon([-8.1611, 113.6789], 0.014),
  },
]

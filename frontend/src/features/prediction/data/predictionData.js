export const predictionStats = [
  {
    label: 'Probabilitas Risiko',
    value: '12.4%',
    trend: '2.1%',
    trendDirection: 'up',
  },
  {
    label: 'Puncak Prediksi',
    value: '22:45',
    caption: 'Hari Ini',
  },
]

export const warningData = {
  title: 'Peringatan: Curah Hujan Tinggi di Jakarta Selatan',
  description: 'Intensitas: 75mm/h. Estimasi kenaikan tinggi air di Sensor B-12: +45cm.',
  cta: 'Lihat Rencana Mitigasi',
}

export const mapMarkers = [
  { id: 'aman-1', status: 'aman', position: [-6.2615, 106.8106] },
  { id: 'waspada-1', status: 'waspada', position: [-6.2665, 106.8206] },
  { id: 'bahaya-1', status: 'bahaya', position: [-6.2715, 106.8156] },
]

export const mapLegend = [
  { label: 'Aman (Normal)', color: '#006D40' },
  { label: 'Waspada (Siaga)', color: '#715C00' },
  { label: 'Bahaya (Banjir)', color: '#BA1A1A' },
]

export const mapLayers = ['Tinggi Air', 'Topografi', 'Area Risiko']

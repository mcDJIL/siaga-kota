export const DATA_TYPE_OPTIONS = [
  { value: 'Semua Sektor', label: 'Semua Sektor (Waste & Flood)' },
  { value: 'Analitik Sampah', label: 'Analitik Sampah' },
  { value: 'Analitik Banjir', label: 'Analitik Banjir' },
  { value: 'Heatmap Aktivitas', label: 'Heatmap Aktivitas' },
  { value: 'Prediksi AI', label: 'Prediksi AI' },
  { value: 'Laporan Masyarakat', label: 'Laporan Masyarakat' },
]

export const FORMAT_OPTIONS = ['PDF', 'Excel', 'CSV']

const TEMPLATES = [
  { dataType: 'Semua Sektor (Okt 2023)', format: 'PDF', status: 'Selesai' },
  { dataType: 'Analitik Banjir (Q3 2023)', format: 'Excel', status: 'Selesai' },
  { dataType: 'Analitik Persampahan (Mingguan)', format: 'CSV', status: 'Memproses' },
  { dataType: 'Heatmap Aktivitas (Sep 2023)', format: 'PDF', status: 'Selesai' },
  { dataType: 'Prediksi AI (Q3 2023)', format: 'Excel', status: 'Gagal' },
  { dataType: 'Laporan Masyarakat (Okt 2023)', format: 'CSV', status: 'Selesai' },
  { dataType: 'Semua Sektor (Sep 2023)', format: 'Excel', status: 'Selesai' },
  { dataType: 'Analitik Banjir (Agu 2023)', format: 'PDF', status: 'Selesai' },
]

function buildTimestamp(index) {
  const base = new Date('2023-10-24T14:30:00')
  base.setHours(base.getHours() - index * 7)
  return base.toISOString()
}

export const EXPORT_HISTORY = Array.from({ length: 125 }, (_, index) => {
  const template = TEMPLATES[index % TEMPLATES.length]
  return {
    id: `exp-${index + 1}`,
    dataType: template.dataType,
    format: template.format,
    status: index < TEMPLATES.length ? template.status : index % 11 === 0 ? 'Gagal' : index % 6 === 0 ? 'Memproses' : 'Selesai',
    exportedAt: buildTimestamp(index),
  }
})

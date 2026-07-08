export const REGION_OPTIONS = ['Semua Region', 'Jakarta Utara', 'Jakarta Pusat', 'Jakarta Selatan']

export const DISTRICT_OPTIONS = [
  'Semua District',
  'Kelapa Gading',
  'Penjaringan',
  'Kemayoran',
  'Mampang Prapatan',
  'Kebayoran Baru',
  'Tebet',
  'Cengkareng',
]

export const DATE_RANGE_OPTIONS = ['7 Hari Terakhir', '30 Hari Terakhir', '90 Hari Terakhir']

export const DISTRICT_FLOOD_REPORTS = [
  { district: 'Kelapa Gading', reports: 140 },
  { district: 'Penjaringan', reports: 108 },
  { district: 'Kemayoran', reports: 85 },
  { district: 'Mampang P.', reports: 78 },
  { district: 'Kebayoran Baru', reports: 62 },
  { district: 'Tebet', reports: 50 },
  { district: 'Cengkareng', reports: 38 },
]

export const DISTRICT_ANALYTICS = {
  'Kelapa Gading': {
    completionRate: 82,
    monthlyTrend: [
      { month: 'Mar', value: 88 },
      { month: 'Apr', value: 102 },
      { month: 'Mei', value: 121 },
      { month: 'Jun', value: 140 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 38 },
      { name: 'Sedang', value: 34 },
      { name: 'Rendah', value: 28 },
    ],
  },
  Penjaringan: {
    completionRate: 76,
    monthlyTrend: [
      { month: 'Mar', value: 70 },
      { month: 'Apr', value: 84 },
      { month: 'Mei', value: 95 },
      { month: 'Jun', value: 108 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 30 },
      { name: 'Sedang', value: 40 },
      { name: 'Rendah', value: 30 },
    ],
  },
  Kemayoran: {
    completionRate: 88,
    monthlyTrend: [
      { month: 'Mar', value: 58 },
      { month: 'Apr', value: 66 },
      { month: 'Mei', value: 74 },
      { month: 'Jun', value: 85 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 22 },
      { name: 'Sedang', value: 36 },
      { name: 'Rendah', value: 42 },
    ],
  },
  'Mampang P.': {
    completionRate: 91,
    monthlyTrend: [
      { month: 'Mar', value: 52 },
      { month: 'Apr', value: 60 },
      { month: 'Mei', value: 68 },
      { month: 'Jun', value: 78 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 18 },
      { name: 'Sedang', value: 32 },
      { name: 'Rendah', value: 50 },
    ],
  },
  'Kebayoran Baru': {
    completionRate: 85,
    monthlyTrend: [
      { month: 'Mar', value: 40 },
      { month: 'Apr', value: 48 },
      { month: 'Mei', value: 55 },
      { month: 'Jun', value: 62 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 20 },
      { name: 'Sedang', value: 30 },
      { name: 'Rendah', value: 50 },
    ],
  },
  Tebet: {
    completionRate: 94,
    monthlyTrend: [
      { month: 'Mar', value: 32 },
      { month: 'Apr', value: 38 },
      { month: 'Mei', value: 44 },
      { month: 'Jun', value: 50 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 12 },
      { name: 'Sedang', value: 28 },
      { name: 'Rendah', value: 60 },
    ],
  },
  Cengkareng: {
    completionRate: 90,
    monthlyTrend: [
      { month: 'Mar', value: 24 },
      { month: 'Apr', value: 29 },
      { month: 'Mei', value: 33 },
      { month: 'Jun', value: 38 },
    ],
    severityDistribution: [
      { name: 'Tinggi', value: 10 },
      { name: 'Sedang', value: 26 },
      { name: 'Rendah', value: 64 },
    ],
  },
}

export const REGION_OPTIONS = ['Semua Wilayah', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara']

export const DISTRICT_OPTIONS = ['Semua Kecamatan', 'Menteng', 'Tebet', 'Kebayoran Baru', 'Senayan', 'Kuningan']

export const DISTRICT_REPORTS = [
  { district: 'Menteng', reports: 112 },
  { district: 'Tebet', reports: 320 },
  { district: 'Kebayoran Baru', reports: 226 },
  { district: 'Senayan', reports: 90 },
  { district: 'Kuningan', reports: 284 },
]

export const DISTRICT_DETAILS = {
  Menteng: {
    monthlyTrend: [
      { month: 'Mar', value: 78 },
      { month: 'Apr', value: 85 },
      { month: 'Mei', value: 96 },
      { month: 'Jun', value: 112 },
    ],
    topCategories: [
      { name: 'Organik', percentage: 48 },
      { name: 'Plastik', percentage: 30 },
      { name: 'B3', percentage: 10 },
    ],
  },
  Tebet: {
    monthlyTrend: [
      { month: 'Mar', value: 240 },
      { month: 'Apr', value: 268 },
      { month: 'Mei', value: 295 },
      { month: 'Jun', value: 320 },
    ],
    topCategories: [
      { name: 'Plastik', percentage: 42 },
      { name: 'Organik', percentage: 35 },
      { name: 'B3', percentage: 14 },
    ],
  },
  'Kebayoran Baru': {
    monthlyTrend: [
      { month: 'Mar', value: 180 },
      { month: 'Apr', value: 198 },
      { month: 'Mei', value: 210 },
      { month: 'Jun', value: 226 },
    ],
    topCategories: [
      { name: 'Organik', percentage: 40 },
      { name: 'Plastik', percentage: 33 },
      { name: 'Lainnya', percentage: 17 },
    ],
  },
  Senayan: {
    monthlyTrend: [
      { month: 'Mar', value: 62 },
      { month: 'Apr', value: 70 },
      { month: 'Mei', value: 81 },
      { month: 'Jun', value: 90 },
    ],
    topCategories: [
      { name: 'Organik', percentage: 50 },
      { name: 'Plastik', percentage: 27 },
      { name: 'B3', percentage: 9 },
    ],
  },
  Kuningan: {
    monthlyTrend: [
      { month: 'Mar', value: 210 },
      { month: 'Apr', value: 236 },
      { month: 'Mei', value: 258 },
      { month: 'Jun', value: 284 },
    ],
    topCategories: [
      { name: 'Plastik', percentage: 38 },
      { name: 'Organik', percentage: 36 },
      { name: 'B3', percentage: 12 },
    ],
  },
}

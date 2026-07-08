export const MONTH_OPTIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export const YEAR_OPTIONS = [2024, 2025, 2026]

export const REPORT_TYPE_OPTIONS = [
  { value: 'all', label: 'Semua Laporan' },
  { value: 'waste', label: 'Laporan Sampah' },
  { value: 'flood', label: 'Laporan Banjir' },
]

const BASE_TREND = [
  { month: 'Jan', waste: 58, flood: 52 },
  { month: 'Feb', waste: 72, flood: 68 },
  { month: 'Mar', waste: 95, flood: 88 },
  { month: 'Apr', waste: 130, flood: 98 },
  { month: 'Mei', waste: 165, flood: 112 },
  { month: 'Jun', waste: 210, flood: 205 },
  { month: 'Jul', waste: 198, flood: 180 },
  { month: 'Agu', waste: 225, flood: 190 },
  { month: 'Sep', waste: 250, flood: 175 },
  { month: 'Okt', waste: 270, flood: 160 },
  { month: 'Nov', waste: 230, flood: 140 },
  { month: 'Des', waste: 200, flood: 120 },
]

export function getMonthlyTrend(year) {
  const seed = year - 2024

  return BASE_TREND.map((item) => ({
    month: item.month,
    waste: Math.max(10, Math.round(item.waste * (1 + seed * 0.08))),
    flood: Math.max(10, Math.round(item.flood * (1 + seed * 0.05))),
  }))
}

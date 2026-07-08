export const REPORT_CATEGORY_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'sampah', label: 'Sampah' },
  { value: 'banjir', label: 'Banjir' },
  { value: 'drainase', label: 'Drainase' },
  { value: 'infrastruktur', label: 'Infrastruktur' },
  { value: 'darurat', label: 'Darurat' },
]

export const REPORT_TYPE_OPTIONS = [
  { value: 'waste', label: 'Laporan Sampah' },
  { value: 'flood', label: 'Laporan Banjir' },
]

export const CATEGORY_OPTIONS_BY_TYPE = {
  waste: [
    { value: 'sampah', label: 'Sampah Menumpuk' },
    { value: 'drainase', label: 'Drainase Tersumbat' },
    { value: 'infrastruktur', label: 'Infrastruktur Rusak' },
  ],
  flood: [
    { value: 'banjir', label: 'Genangan / Banjir' },
    { value: 'drainase', label: 'Drainase Meluap' },
    { value: 'darurat', label: 'Kondisi Darurat' },
  ],
}

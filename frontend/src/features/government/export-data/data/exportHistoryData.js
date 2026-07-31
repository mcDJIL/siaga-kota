// Nilai `value` harus sama dengan enum backend App\Enums\ExportDataType.
export const DATA_TYPE_OPTIONS = [
  { value: 'all', label: 'Semua Sektor (Waste & Flood)' },
  { value: 'waste', label: 'Analitik Sampah' },
  { value: 'flood', label: 'Analitik Banjir' },
  { value: 'analytics', label: 'Analitik Umum' },
]

// Nilai `value` harus sama dengan enum backend App\Enums\ExportFormat.
export const FORMAT_OPTIONS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' },
]

// Nilai status dari enum backend App\Enums\ExportStatus.
export const EXPORT_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

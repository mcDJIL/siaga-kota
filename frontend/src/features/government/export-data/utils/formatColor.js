import { FileSpreadsheet, FileText, Braces } from 'lucide-react'

// Kunci mengikuti enum backend App\Enums\ExportFormat.
export const FORMAT_ICONS = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: Braces,
}

export const FORMAT_EXTENSIONS = {
  pdf: 'pdf',
  excel: 'xls',
  csv: 'csv',
}

export const FORMAT_MIME_TYPES = {
  pdf: 'application/pdf',
  excel: 'application/vnd.ms-excel',
  csv: 'text/csv',
}

import { FileSpreadsheet, FileText, Braces } from 'lucide-react'

export const FORMAT_ICONS = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  CSV: Braces,
}

export const FORMAT_EXTENSIONS = {
  PDF: 'pdf',
  Excel: 'xlsx',
  CSV: 'csv',
}

export const FORMAT_MIME_TYPES = {
  PDF: 'application/pdf',
  Excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
}

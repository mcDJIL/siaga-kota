import { Download } from 'lucide-react'
import { STATUS_TOOLTIP } from '../../utils/statusColor'

export function DownloadExportButton({ record, onDownload }) {
  const isDisabled = record.status !== 'Selesai'

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onDownload(record)}
      aria-label={`Unduh ${record.dataType}`}
      title={STATUS_TOOLTIP[record.status]}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-navy transition-colors hover:bg-bg-blue-soft disabled:cursor-not-allowed disabled:text-text-muted/40 disabled:hover:bg-transparent"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

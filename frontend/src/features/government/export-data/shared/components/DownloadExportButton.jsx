import { Download, Loader2 } from 'lucide-react'
import { STATUS_TOOLTIP } from '../../utils/statusColor'

export function DownloadExportButton({ record, onDownload, isDownloading }) {
  const isDisabled = record.status !== 'Selesai' || isDownloading

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onDownload(record)}
      aria-label={`Unduh ${record.dataType}`}
      title={isDownloading ? 'Mengunduh...' : STATUS_TOOLTIP[record.status]}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-navy transition-colors hover:bg-bg-blue-soft disabled:cursor-not-allowed disabled:text-text-muted/40 disabled:hover:bg-transparent"
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

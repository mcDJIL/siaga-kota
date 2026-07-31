import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Badge } from '../../../../../components/ui/Badge'
import { EXPORT_STATUS } from '../../data/exportHistoryData'
import { STATUS_BADGE_STYLES, STATUS_LABELS } from '../../utils/statusColor'

const STATUS_ICONS = {
  [EXPORT_STATUS.COMPLETED]: CheckCircle2,
  [EXPORT_STATUS.PROCESSING]: Loader2,
  [EXPORT_STATUS.FAILED]: XCircle,
}

export function ExportStatusBadge({ status }) {
  const Icon = STATUS_ICONS[status] ?? Loader2
  const isProcessing = status === EXPORT_STATUS.PROCESSING

  return (
    <Badge className={`gap-1 ${STATUS_BADGE_STYLES[status] ?? ''}`}>
      <Icon className={`h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} aria-hidden="true" />
      {STATUS_LABELS[status] ?? status}
    </Badge>
  )
}

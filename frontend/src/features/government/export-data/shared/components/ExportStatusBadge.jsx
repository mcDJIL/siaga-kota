import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Badge } from '../../../../../components/ui/Badge'
import { STATUS_BADGE_STYLES } from '../../utils/statusColor'

const STATUS_ICONS = {
  Selesai: CheckCircle2,
  Memproses: Loader2,
  Gagal: XCircle,
}

export function ExportStatusBadge({ status }) {
  const Icon = STATUS_ICONS[status]

  return (
    <Badge className={`gap-1 ${STATUS_BADGE_STYLES[status]}`}>
      <Icon className={`h-3 w-3 ${status === 'Memproses' ? 'animate-spin' : ''}`} aria-hidden="true" />
      {status}
    </Badge>
  )
}

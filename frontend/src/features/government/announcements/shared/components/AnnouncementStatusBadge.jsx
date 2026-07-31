import { Badge } from '../../../../../components/ui/Badge'
import { STATUS_BADGE_STYLES, STATUS_LABELS } from '../../utils/statusColor'

export function AnnouncementStatusBadge({ status, label }) {
  return (
    <Badge className={STATUS_BADGE_STYLES[status] ?? ''}>
      {label ?? STATUS_LABELS[status] ?? status}
    </Badge>
  )
}

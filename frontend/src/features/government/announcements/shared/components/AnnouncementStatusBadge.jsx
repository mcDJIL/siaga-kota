import { Badge } from '../../../../../components/ui/Badge'
import { STATUS_BADGE_STYLES } from '../../utils/statusColor'

export function AnnouncementStatusBadge({ status }) {
  return <Badge className={STATUS_BADGE_STYLES[status]}>{status}</Badge>
}

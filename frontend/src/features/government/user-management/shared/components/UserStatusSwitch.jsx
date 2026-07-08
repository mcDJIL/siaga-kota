import { Switch } from '../../../../../components/ui/Switch'
import { isActiveStatus } from '../../utils/statusColor'

export function UserStatusSwitch({ user, onToggle }) {
  return (
    <Switch
      checked={isActiveStatus(user.status)}
      onChange={() => onToggle(user.id)}
      label={`Status ${user.name}`}
    />
  )
}

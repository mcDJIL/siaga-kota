import { NotificationTabs } from '../../../shared/notifications/components/NotificationTabs'
import { NOTIFICATION_TABS } from '../../data/notificationTabs'

export function NotificationCategoryTabs({ activeTab, onChange }) {
  return <NotificationTabs tabs={NOTIFICATION_TABS} activeTab={activeTab} onChange={onChange} />
}

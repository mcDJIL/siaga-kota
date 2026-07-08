import { LiveActivityCard } from '../../shared/cards/LiveActivityCard'
import { CITIZEN_LIVE_ACTIVITIES } from '../data/activityData'

export function LiveActivitySection() {
  return (
    <div className="flex flex-col gap-4" aria-label="Aktivitas terkini">
      {CITIZEN_LIVE_ACTIVITIES.map((activity) => (
        <LiveActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

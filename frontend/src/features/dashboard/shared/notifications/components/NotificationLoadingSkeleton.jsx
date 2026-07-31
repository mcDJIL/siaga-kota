import { NotificationSkeleton } from './NotificationSkeleton'

export function NotificationLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <NotificationSkeleton key={i} />
      ))}
    </div>
  )
}

export function NotificationSkeleton() {
  return (
    <div
      className="flex animate-pulse items-start gap-4 rounded-xl border-l-4 border-border-muted bg-bg-soft p-6 shadow-sm"
      aria-hidden="true"
    >
      <div className="h-12 w-12 shrink-0 rounded-full bg-bg-blue-light" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded-full bg-bg-blue-light" />
          <div className="h-3 w-16 rounded-full bg-bg-blue-light" />
        </div>
        <div className="h-4 w-full rounded-full bg-bg-blue-light" />
        <div className="h-4 w-2/3 rounded-full bg-bg-blue-light" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-24 rounded-lg bg-bg-blue-light" />
          <div className="h-8 w-24 rounded-lg bg-bg-blue-light" />
        </div>
      </div>
    </div>
  )
}

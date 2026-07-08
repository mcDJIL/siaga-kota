export function LiveActivityCard({ activity }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#D3E4FE] p-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#006D40]" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Live Activity</span>
      </div>
      <p className="text-sm font-medium tracking-[0.14px] text-navy">{activity.message}</p>
    </div>
  )
}

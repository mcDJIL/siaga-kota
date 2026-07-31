export function HistoricalComparisonSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <div className="mb-2 h-8 w-40 animate-pulse rounded bg-bg-blue-lighter" />
        <div className="h-5 w-60 animate-pulse rounded bg-bg-blue-lighter" />
      </div>

      <div className="flex h-80 flex-col gap-4 rounded-3xl border border-border-muted/30 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)] sm:p-10">
        <div className="flex items-center gap-4 self-start">
          <div className="h-4 w-24 animate-pulse rounded bg-bg-blue-lighter" />
          <div className="h-4 w-24 animate-pulse rounded bg-bg-blue-lighter" />
        </div>
        <div className="flex-1 animate-pulse rounded bg-bg-blue-lighter" />
      </div>
    </div>
  )
}

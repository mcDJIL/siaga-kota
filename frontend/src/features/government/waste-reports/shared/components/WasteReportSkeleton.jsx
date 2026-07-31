export function SummaryCardSkeleton() {
  return (
    <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
  )
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-bg-blue-lighter bg-white p-6 shadow-sm">
      <div className="mb-6 h-6 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-64 w-full animate-pulse rounded bg-gray-200" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-bg-blue-lighter bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-muted bg-bg-blue-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-11 w-56 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-11 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      <div className="p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-4 flex gap-4">
            <div className="h-12 flex-1 animate-pulse rounded bg-gray-200" />
            <div className="h-12 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

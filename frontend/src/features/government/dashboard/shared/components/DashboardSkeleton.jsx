export function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-8 w-80 animate-pulse rounded-lg bg-border-muted" />
      <div className="h-4 w-96 animate-pulse rounded-lg bg-border-muted" />
    </div>
  )
}

export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl border border-bg-blue-light p-6">
          <div className="h-5 w-24 animate-pulse rounded-lg bg-border-muted" />
          <div className="h-8 w-16 animate-pulse rounded-lg bg-border-muted" />
          <div className="h-4 w-20 animate-pulse rounded-lg bg-border-muted" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-bg-blue-light p-6">
      <div className="h-6 w-32 animate-pulse rounded-lg bg-border-muted" />
      <div className="h-64 w-full animate-pulse rounded-lg bg-border-muted" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-bg-blue-light bg-white">
      <div className="flex items-center justify-between border-b border-bg-blue-light px-6 py-6">
        <div className="h-6 w-48 animate-pulse rounded-lg bg-border-muted" />
        <div className="h-5 w-24 animate-pulse rounded-lg bg-border-muted" />
      </div>
      <div className="divide-y divide-bg-blue-light">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-border-muted" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 animate-pulse rounded-lg bg-border-muted" />
                <div className="h-3 w-24 animate-pulse rounded-lg bg-border-muted" />
              </div>
            </div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-border-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SidebarSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl border border-bg-blue-light p-6">
          <div className="h-5 w-32 animate-pulse rounded-lg bg-border-muted" />
          <div className="h-32 w-full animate-pulse rounded-lg bg-border-muted" />
        </div>
      ))}
    </div>
  )
}

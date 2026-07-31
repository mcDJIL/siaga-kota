export function InfrastructureHealthSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <div className="mb-2 h-8 w-48 animate-pulse rounded bg-bg-blue-lighter" />
        <div className="h-5 w-60 animate-pulse rounded bg-bg-blue-lighter" />
      </div>

      <ul className="flex flex-col overflow-hidden rounded-3xl border border-border-muted/30 bg-white shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)]">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className={
              i === 1
                ? 'flex items-center justify-between gap-4 p-6'
                : 'flex items-center justify-between gap-4 border-t border-border-muted/30 p-6'
            }
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-bg-blue-lighter" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-5 w-40 animate-pulse rounded bg-bg-blue-lighter" />
                <div className="h-4 w-56 animate-pulse rounded bg-bg-blue-lighter" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="h-6 w-20 animate-pulse rounded bg-bg-blue-lighter" />
              <div className="h-3 w-16 animate-pulse rounded bg-bg-blue-lighter" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

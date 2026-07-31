export function SystemMetricsSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-3 sm:px-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col items-center rounded-2xl border border-border-muted/30 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)]"
        >
          <div className="mb-4 h-16 w-16 animate-pulse rounded-full bg-bg-blue-lighter" />
          <div className="mb-2 h-8 w-24 animate-pulse rounded bg-bg-blue-lighter" />
          <div className="h-5 w-32 animate-pulse rounded bg-bg-blue-lighter" />
        </div>
      ))}
    </div>
  )
}

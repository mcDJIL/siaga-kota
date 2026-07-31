export function ChartSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]">
      <div className="flex flex-col gap-2 pb-6">
        <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="h-40 w-full flex items-end justify-between gap-2 px-6">
        {Array(7).fill(0).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-1 flex-1">
            <div className="h-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

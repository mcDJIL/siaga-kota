export function MapSkeleton() {
  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]">
      <div className="flex items-center justify-between border-b border-bg-blue-light px-4 py-4">
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
      </div>

      <div className="relative flex-1 bg-bg-blue-lighter flex items-center justify-center">
        <div className="h-full w-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  )
}

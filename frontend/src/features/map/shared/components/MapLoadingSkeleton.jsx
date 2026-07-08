export function MapLoadingSkeleton() {
  return (
    <div className="absolute inset-0 z-20 flex animate-pulse flex-col gap-4 bg-bg-blue-soft p-6" role="status" aria-label="Memuat peta">
      <div className="h-12 w-full max-w-sm rounded-2xl bg-white/70" />
      <div className="h-10 w-2/3 max-w-xs rounded-full bg-white/70" />
      <div className="flex-1 rounded-2xl bg-white/50" />
    </div>
  )
}

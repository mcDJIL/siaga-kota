export function FloodMapSkeleton() {
  return (
    <section id="peta-status" className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:py-20">
      <div className="flex flex-col items-center gap-4 pb-10 text-center">
        <div className="h-10 w-64 animate-pulse rounded bg-bg-blue-lighter" />
        <div className="h-5 w-96 animate-pulse rounded bg-bg-blue-lighter" />
      </div>

      <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border-muted/30 bg-bg-blue-soft shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[560px] lg:h-[700px]">
        <div className="h-full w-full animate-pulse bg-gradient-to-br from-bg-blue-lighter to-bg-blue-soft" />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
          <div className="pointer-events-auto h-10 w-48 animate-pulse rounded-xl bg-white/80" />

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="h-40 w-40 animate-pulse rounded-2xl bg-white/80" />
            <div className="flex flex-col gap-2">
              <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/80" />
              <div className="h-24 w-12 animate-pulse rounded-2xl bg-white/80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

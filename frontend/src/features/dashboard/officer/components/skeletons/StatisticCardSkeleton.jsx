import { cn } from '../../../../../lib/cn'

export function StatisticCardSkeleton({ borderColor }) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-4 rounded-2xl border-l-4 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]',
        borderColor
      )}
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-24 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  )
}

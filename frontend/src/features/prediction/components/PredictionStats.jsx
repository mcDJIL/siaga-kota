import { predictionStats } from '../data/predictionData'
import { TrendArrowIcon } from './icons'

export function PredictionStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {predictionStats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-2 rounded-2xl border border-border-muted/30 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)]"
        >
          <span className="text-xs font-bold tracking-[-0.3px] text-text-muted uppercase">{stat.label}</span>
          <div className="flex items-end justify-between">
            <span className="font-sans text-3xl font-bold tracking-[-0.32px] text-navy">{stat.value}</span>
            {stat.trend && (
              <span className="flex items-center gap-1 text-xs font-bold tracking-[0.6px] text-brand-green">
                <TrendArrowIcon className="h-[11px] w-[11px]" />
                {stat.trend}
              </span>
            )}
            {stat.caption && <span className="text-xs font-medium tracking-[0.6px] text-text-muted">{stat.caption}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

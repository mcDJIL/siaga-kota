import { HEATMAP_LEGEND_ITEMS } from '../../utils/heatmapColors'

export function HeatmapLegend() {
  return (
    <div className="flex flex-col gap-3 border-t border-[#C4C6CF] bg-bg-soft p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Density Legend:</span>
        {HEATMAP_LEGEND_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <span className="text-sm font-medium text-text-body">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 self-start rounded-full border border-[#FFDAD6] bg-[#FFDAD6]/30 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#BA1A1A]" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-[0.6px] text-[#BA1A1A]">AI Predicted Risk Zone</span>
      </div>
    </div>
  )
}

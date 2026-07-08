import { RISK_LEGEND_ITEMS } from '../../utils/predictionColor'

export function PredictionLegend() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[#C4C6CF]/30 bg-white/90 p-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] backdrop-blur-md">
      <span className="text-xs font-semibold tracking-[0.6px] text-text-body uppercase">Tingkat Risiko</span>
      {RISK_LEGEND_ITEMS.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
          <span className="text-xs font-semibold text-text-muted">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

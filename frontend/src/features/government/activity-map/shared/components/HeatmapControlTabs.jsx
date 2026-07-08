import { cn } from '../../../../../lib/cn'

const TABS = [
  { id: 'waste', label: 'Waste' },
  { id: 'flood', label: 'Flood' },
  { id: 'both', label: 'Both' },
]

export function HeatmapControlTabs({ activeLayer, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Pilih lapisan peta"
      className="flex items-start gap-1 rounded-lg border border-[#C4C6CF] bg-bg-blue-soft p-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      {TABS.map((tab) => {
        const isActive = activeLayer === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium tracking-[0.14px] transition-colors',
              isActive ? 'bg-navy text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]' : 'text-text-muted hover:bg-white/60'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

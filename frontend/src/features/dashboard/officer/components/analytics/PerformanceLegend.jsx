const LEGEND_ITEMS = [
  { label: 'Sampah', color: '#006D40' },
  { label: 'Banjir', color: '#002045' },
]

export function PerformanceLegend() {
  return (
    <div className="flex items-center gap-4 pt-4">
      {LEGEND_ITEMS.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  )
}

import { cn } from '../../../../lib/cn'

const SEVERITY_STYLES = {
  'very-low': 'text-[#1D4ED8]',
  low: 'text-[#1D4ED8]',
  medium: 'text-[#A16207]',
  high: 'text-[#C2410C]',
  critical: 'text-[#BA1A1A]',
}

export function FloodPointCard({ marker, isSelected, onSelect }) {
  const reporter = typeof marker.reporter === 'string' ? marker.reporter : marker.reporter?.name || 'Warga'

  return (
    <button
      type="button"
      onClick={() => onSelect?.(marker.id)}
      className={cn(
        'flex w-full flex-col gap-1 rounded-lg border bg-white/95 p-2.5 text-left text-[11px] shadow-md backdrop-blur-sm transition-colors',
        isSelected ? 'border-navy' : 'border-white/50'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text-body">Waktu</span>
        <span className="text-text-muted">{marker.updatedAt}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text-body">Tingkat Banjir</span>
        <span className={cn('font-bold', SEVERITY_STYLES[marker.severity])}>{marker.waterHeightCm}cm</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text-body">Status</span>
        <span className="text-brand-green-dark">{marker.status}</span>
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-bg-blue-light text-[8px] font-bold text-navy">
          {reporter.charAt(0)}
        </span>
        <span className="text-text-muted">{reporter}</span>
      </div>
    </button>
  )
}

import { Star } from 'lucide-react'

export function CitizenPointsCard({ points }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border-muted/30 bg-bg-blue-lighter px-6 py-3 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-badge-gold">
        <Star className="h-5 w-5 text-[#4D3E00]" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{points.label}</span>
        <span className="text-xl font-bold text-navy">{points.value.toLocaleString('id-ID')} Poin</span>
      </div>
    </div>
  )
}

import { TrendingUp } from 'lucide-react'

export function ActivityStatistics({ total, trend }) {
  return (
    <div className="flex items-center justify-between bg-navy p-4">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold tracking-[0.5px] text-white/70 uppercase">Total Tugas Aktif</span>
        <span className="text-xl font-bold text-white">{total} Laporan</span>
      </div>
      <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-1 text-xs font-bold text-white">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
        {trend}
      </span>
    </div>
  )
}

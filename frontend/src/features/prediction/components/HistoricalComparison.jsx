import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { historicalComparison } from '../data/systemMetrics'

export function HistoricalComparison() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h3 className="font-sans text-2xl font-bold text-navy">Komparasi Historis</h3>
        <p className="text-base leading-6 text-text-muted">Deviasi ketinggian air dibandingkan rata-rata 5 tahun.</p>
      </div>

      <div className="flex h-80 flex-col gap-4 rounded-3xl border border-border-muted/30 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)] sm:p-10">
        <div className="flex items-center gap-4 self-start">
          <span className="flex items-center gap-2">
            <span className="h-1 w-3 rounded-full bg-navy" />
            <span className="text-xs font-bold tracking-[0.6px] text-navy">Saat Ini</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-3 rounded-full bg-border-muted" />
            <span className="text-xs font-bold tracking-[0.6px] text-text-muted">Rata-rata</span>
          </span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={historicalComparison} barGap={4}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E' }} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="average" fill="#C4C6CF" radius={[8, 8, 0, 0]} />
            <Bar dataKey="current" fill="#002045" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

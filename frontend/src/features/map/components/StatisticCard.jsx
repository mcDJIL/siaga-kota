export function StatisticCard({ label, value, valueColor }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-border-muted/30 bg-white p-8 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
      <span className={`font-heading text-4xl font-bold ${valueColor}`}>{value}</span>
      <span className="text-sm font-semibold tracking-[0.7px] text-text-muted uppercase">{label}</span>
    </div>
  )
}

import { FloodStatisticCard } from './FloodStatisticCard'
import { FLOOD_STATISTICS } from '../data/floodStatistics'

export function FloodStatisticCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
      {FLOOD_STATISTICS.map((statistic) => (
        <FloodStatisticCard key={statistic.id} statistic={statistic} />
      ))}
    </div>
  )
}

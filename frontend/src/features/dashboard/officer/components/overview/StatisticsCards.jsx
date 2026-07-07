import { StatisticCard } from './StatisticCard'
import { STATISTICS } from '../../data/dashboardData'

export function StatisticsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {STATISTICS.map((statistic) => (
        <StatisticCard key={statistic.id} statistic={statistic} />
      ))}
    </div>
  )
}

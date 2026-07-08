import { StatisticCard } from '../../shared/cards/StatisticCard'
import { CITIZEN_STATISTICS } from '../data/dashboardData'

export function CitizenStatistics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Statistik laporan warga">
      {CITIZEN_STATISTICS.map((statistic) => (
        <StatisticCard key={statistic.id} {...statistic} />
      ))}
    </div>
  )
}

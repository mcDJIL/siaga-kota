import { useMemo } from 'react'
import { FloodStatisticCard } from './FloodStatisticCard'
import { FloodStatisticCardSkeleton } from './FloodStatisticCardSkeleton'
import { FLOOD_STATISTICS } from '../data/floodStatistics'

export function FloodStatisticCards({ reports = [], loading = false }) {
  const statistics = useMemo(() => {
    if (reports.length === 0) {
      return FLOOD_STATISTICS
    }

    // Calculate from API data
    const total = reports.length
    const high = reports.filter(r => r.priority === 'tinggi').length
    const medium = reports.filter(r => r.priority === 'sedang').length
    const lowRisk = reports.filter(r => r.priority === 'rendah').length

    return [
      {
        id: 'total',
        label: 'Total Laporan',
        value: total,
        icon: 'alertTriangle',
        trendVariant: 'danger',
        helper: `Total dari semua laporan banjir`,
      },
      {
        id: 'high-risk',
        label: 'Risiko Tinggi',
        value: high,
        icon: 'alertTriangle',
        trendVariant: 'danger',
        helper: `${high} laporan dengan prioritas tinggi`,
      },
      {
        id: 'medium-risk',
        label: 'Risiko Sedang',
        value: medium,
        icon: 'radio',
        trendVariant: 'neutral',
        helper: `${medium} laporan dengan prioritas sedang`,
      },
      {
        id: 'low-risk',
        label: 'Risiko Rendah',
        value: lowRisk,
        icon: 'waves',
        trendVariant: 'success',
        helper: `${lowRisk} laporan dengan prioritas rendah`,
      },
    ]
  }, [reports])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
      {loading ? (
        <>
          <FloodStatisticCardSkeleton />
          <FloodStatisticCardSkeleton />
          <FloodStatisticCardSkeleton />
          <FloodStatisticCardSkeleton />
        </>
      ) : (
        statistics.map((statistic) => (
          <FloodStatisticCard key={statistic.id} statistic={statistic} />
        ))
      )}
    </div>
  )
}

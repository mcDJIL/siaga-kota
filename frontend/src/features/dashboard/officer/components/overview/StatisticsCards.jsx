import { useDashboardContext } from '../../context/DashboardContext'
import { StatisticCard } from './StatisticCard'
import { StatisticCardSkeleton } from '../skeletons/StatisticCardSkeleton'

const DEFAULT_STATISTICS = [
  {
    id: 'total-sampah',
    icon: 'trash',
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    borderColor: 'border-l-brand-green',
    badgeText: '+12% minggu ini',
    badgeColor: 'text-brand-green',
    label: 'Total Laporan Sampah',
    value: 0,
  },
  {
    id: 'total-banjir',
    icon: 'flood',
    iconBg: 'bg-[#D3E4FE]',
    iconColor: 'text-navy',
    borderColor: 'border-l-navy',
    badgeText: '+5% minggu ini',
    badgeColor: 'text-navy',
    label: 'Total Laporan Banjir',
    value: 0,
  },
  {
    id: 'sedang-diproses',
    icon: 'pending',
    iconBg: 'bg-[#FFE17C]',
    iconColor: 'text-[#231B00]',
    borderColor: 'border-l-[#715C00]',
    badgeText: 'Perlu Tindakan',
    badgeColor: 'text-[#715C00]',
    label: 'Sedang Diproses',
    value: 0,
  },
  {
    id: 'selesai',
    icon: 'completed',
    iconBg: 'bg-brand-green-lighter',
    iconColor: 'text-[#002110]',
    borderColor: 'border-l-[#74DB9D]',
    badgeText: 'Tingkat 92%',
    badgeColor: 'text-[#74DB9D]',
    label: 'Selesai',
    value: 0,
  },
]

export function StatisticsCards() {
  const { statistics, loading } = useDashboardContext()

  const stats = [
    { ...DEFAULT_STATISTICS[0], value: statistics.totalWaste },
    { ...DEFAULT_STATISTICS[1], value: statistics.totalFlood },
    { ...DEFAULT_STATISTICS[2], value: statistics.processing },
    { ...DEFAULT_STATISTICS[3], value: statistics.completed },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {DEFAULT_STATISTICS.map((stat) => (
          <StatisticCardSkeleton key={stat.id} borderColor={stat.borderColor} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((statistic) => (
        <StatisticCard key={statistic.id} statistic={statistic} />
      ))}
    </div>
  )
}

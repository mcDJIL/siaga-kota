import { StatisticCard } from '../../shared/cards/StatisticCard'
import { CheckCircle2, FileText, Trophy } from 'lucide-react'

export function CitizenStatistics({ statistics }) {
  const stats = [
    {
      id: 'total-laporan',
      icon: FileText,
      iconBg: 'bg-[#D6E3FF]',
      iconColor: 'text-navy',
      label: 'Total Laporan Saya',
      value: statistics.totalReports,
    },
    {
      id: 'laporan-selesai',
      icon: CheckCircle2,
      iconBg: 'bg-brand-green-light',
      iconColor: 'text-brand-green-dark',
      label: 'Laporan Selesai',
      value: statistics.completedReports,
    },
    {
      id: 'rank-warga',
      icon: Trophy,
      iconBg: 'bg-[#FFE17C]',
      iconColor: 'text-[#231B00]',
      label: 'Rank Warga',
      value: statistics.userRank,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Statistik laporan warga">
      {stats.map((statistic) => (
        <StatisticCard key={statistic.id} {...statistic} />
      ))}
    </div>
  )
}

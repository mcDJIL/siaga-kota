import { useState } from 'react'
import { motion } from 'framer-motion'
import { SummaryStatisticCard } from '../shared/components/SummaryStatisticCard'
import { FloodReportFilter } from '../shared/components/FloodReportFilter'
import { DistrictFloodBarChart } from '../shared/components/DistrictFloodBarChart'
import { FloodSeverityDonutChart } from '../shared/components/FloodSeverityDonutChart'
import { FloodReportTable } from '../shared/components/FloodReportTable'
import { mapIconsToComponents } from '../utils/iconMapper'
import { useFloodReportStats } from '../hooks/useFloodReportStats'

export function GovernmentFloodReportPage() {
  const [region, setRegion] = useState('Semua Region')
  const [district, setDistrict] = useState('Semua District')
  const [dateRange, setDateRange] = useState('7 Hari Terakhir')
  const { stats, loading } = useFloodReportStats()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.96px] text-navy sm:text-5xl sm:leading-[56px]">
            Analitik Laporan Banjir
          </h1>
          <p className="text-lg text-text-muted">Pemantauan real-time dan analisis historis insiden banjir.</p>
        </motion.div>

        <FloodReportFilter
          region={region}
          onRegionChange={setRegion}
          district={district}
          onDistrictChange={setDistrict}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-200" />
          ))
        ) : stats && stats.length > 0 ? (
          mapIconsToComponents(stats).map((statistic) => (
            <SummaryStatisticCard key={statistic.id} statistic={statistic} />
          ))
        ) : (
          <p className="text-text-muted">Tidak ada data statistik</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DistrictFloodBarChart district={district} />
        <FloodSeverityDonutChart district={district} />
      </div>

      <FloodReportTable filters={{ district }} />
    </div>
  )
}

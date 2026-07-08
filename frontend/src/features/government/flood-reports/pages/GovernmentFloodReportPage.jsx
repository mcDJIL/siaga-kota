import { useState } from 'react'
import { motion } from 'framer-motion'
import { SummaryStatisticCard } from '../shared/components/SummaryStatisticCard'
import { FloodReportFilter } from '../shared/components/FloodReportFilter'
import { DistrictFloodBarChart } from '../shared/components/DistrictFloodBarChart'
import { FloodSeverityDonutChart } from '../shared/components/FloodSeverityDonutChart'
import { FloodReportTable } from '../shared/components/FloodReportTable'
import { SUMMARY_STATS } from '../data/summaryData'

export function GovernmentFloodReportPage() {
  const [region, setRegion] = useState('Semua Region')
  const [district, setDistrict] = useState('Semua District')
  const [dateRange, setDateRange] = useState('7 Hari Terakhir')

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
        {SUMMARY_STATS.map((statistic) => (
          <SummaryStatisticCard key={statistic.id} statistic={statistic} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DistrictFloodBarChart />
        <FloodSeverityDonutChart />
      </div>

      <FloodReportTable />
    </div>
  )
}

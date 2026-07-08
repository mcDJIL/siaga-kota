import { useState } from 'react'
import { motion } from 'framer-motion'
import { SummaryStatisticCard } from '../shared/components/SummaryStatisticCard'
import { WasteReportFilter } from '../shared/components/WasteReportFilter'
import { WasteCategoryDonutChart } from '../shared/components/WasteCategoryDonutChart'
import { DistrictBarChart } from '../shared/components/DistrictBarChart'
import { WasteReportTable } from '../shared/components/WasteReportTable'
import { SUMMARY_STATS } from '../data/summaryData'

export function GovernmentWasteReportPage() {
  const [region, setRegion] = useState('Semua Wilayah')
  const [district, setDistrict] = useState('Semua Kecamatan')
  const [date, setDate] = useState('2023-10-01')

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-heading text-[32px] leading-10 font-bold tracking-[-0.96px] text-text-body sm:text-5xl sm:leading-[56px]">
            Analitik Laporan Sampah
          </h1>
          <p className="text-lg text-text-muted">Tinjauan komprehensif data manajemen limbah kota.</p>
        </motion.div>

        <WasteReportFilter
          region={region}
          onRegionChange={setRegion}
          district={district}
          onDistrictChange={setDistrict}
          date={date}
          onDateChange={setDate}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_STATS.map((statistic) => (
          <SummaryStatisticCard key={statistic.id} statistic={statistic} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <WasteCategoryDonutChart />
        <DistrictBarChart />
      </div>

      <WasteReportTable districtFilter={district} />
    </div>
  )
}

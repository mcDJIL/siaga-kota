import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { SummaryStatisticCard } from '../shared/components/SummaryStatisticCard'
import { WasteReportFilter } from '../shared/components/WasteReportFilter'
import { WasteCategoryDonutChart } from '../shared/components/WasteCategoryDonutChart'
import { DistrictBarChart } from '../shared/components/DistrictBarChart'
import { WasteReportTable } from '../shared/components/WasteReportTable'
import { SummaryCardSkeleton, ChartSkeleton, TableSkeleton } from '../shared/components/WasteReportSkeleton'
import { mapIconsToComponents } from '../utils/iconMapper'
import {
  getWasteReportStats,
  getWasteCategoryDistribution,
  getDistrictReportStats,
  getRecentWasteReports
} from '../../../../services/waste-report.service'

export function GovernmentWasteReportPage() {
  const [region, setRegion] = useState('Semua Wilayah')
  const [district, setDistrict] = useState('Semua Kecamatan')
  const [date, setDate] = useState('2023-10-01')
  const [isLoading, setIsLoading] = useState(true)
  
  const [summaryStats, setSummaryStats] = useState([])
  const [categories, setCategories] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [recentReports, setRecentReports] = useState([])

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        const [statsRes, catRes, distRes, reportRes] = await Promise.all([
          getWasteReportStats(),
          getWasteCategoryDistribution(),
          getDistrictReportStats(),
          getRecentWasteReports(district),
        ])

        if (mounted) {
          setSummaryStats(mapIconsToComponents(statsRes?.data?.stats || []))
          setCategories(catRes?.data?.categories || [])
          setDistrictData(distRes?.data?.districts || [])
          setRecentReports(reportRes?.data?.reports || [])
          setIsLoading(false)
        }
      } catch (error) {
        if (mounted) {
          console.error('Error loading waste report data:', error)
          toast.error(error.message || 'Gagal memuat data laporan sampah')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [district])

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict)
  }

  const handleReportVerified = (reportId, status) => {
    setRecentReports((currentReports) =>
      currentReports.map((report) =>
        report.ulid === reportId ? { ...report, status } : report
      )
    )
  }

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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SummaryCardSkeleton key={i} />
          ))
        ) : summaryStats.length > 0 ? (
          summaryStats.map((statistic) => (
            <SummaryStatisticCard key={statistic.id} statistic={statistic} />
          ))
        ) : (
          <div className="col-span-full text-center text-text-muted py-8">
            Tidak ada data statistik
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <WasteCategoryDonutChart categories={categories} />
            <DistrictBarChart districts={districtData} />
          </>
        )}
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <WasteReportTable
          reports={recentReports}
          districtFilter={district}
          onReportVerified={handleReportVerified}
        />
      )}
    </div>
  )
}

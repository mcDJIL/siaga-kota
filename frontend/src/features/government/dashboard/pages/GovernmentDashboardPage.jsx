import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DashboardSummaryCard } from '../shared/components/DashboardSummaryCard'
import { CompletionCard } from '../shared/components/CompletionCard'
import { MonthlyTrendChart } from '../shared/components/MonthlyTrendChart'
import { RecentReportTable } from '../shared/components/RecentReportTable'
import { DepartmentPerformanceCard } from '../shared/components/DepartmentPerformanceCard'
import { AnnouncementCard } from '../shared/components/AnnouncementCard'
import { HeaderSkeleton, SummaryCardsSkeleton, ChartSkeleton, TableSkeleton, SidebarSectionSkeleton } from '../shared/components/DashboardSkeleton'
import { mapIconsToComponents } from '../utils/iconMapper'
import { getDashboardStats, getMonthlyTrend, getRecentReports, getDepartmentPerformance, getAnnouncements } from '../../../../services/government-dashboard.service'

export function GovernmentDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [summaryStats, setSummaryStats] = useState([])
  const [completionStat, setCompletionStat] = useState(null)
  const [monthlyTrendData, setMonthlyTrendData] = useState([])
  const [recentReports, setRecentReports] = useState([])
  const [departmentPerformance, setDepartmentPerformance] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        const [statsRes, trendsRes, reportsRes, deptRes, announcRes] = await Promise.all([
          getDashboardStats(),
          getMonthlyTrend(selectedYear),
          getRecentReports(),
          getDepartmentPerformance(),
          getAnnouncements(),
        ])

        if (mounted) {
          setSummaryStats(mapIconsToComponents(statsRes?.data?.stats || []))
          setCompletionStat(statsRes?.data?.completion || null)
          setMonthlyTrendData(trendsRes?.data?.trend || [])
          setRecentReports(reportsRes?.data?.reports || [])
          setDepartmentPerformance(deptRes?.data?.departments || [])
          setAnnouncements(announcRes?.data?.announcements || [])
          setIsLoading(false)
        }
      } catch (error) {
        if (mounted) {
          console.error('Error loading dashboard data:', error)
          toast.error(error.message || 'Gagal memuat data dashboard')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [selectedYear])

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-1"
        >
          <h1 className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
            Dasbor Pemerintah Kota
          </h1>
          <p className="text-base text-text-muted">Tinjauan operasional kota dan laporan warga.</p>
        </motion.div>
      )}

      {isLoading ? (
        <SummaryCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryStats.map((statistic) => (
            <DashboardSummaryCard key={statistic.id} statistic={statistic} />
          ))}
          {completionStat && <CompletionCard stat={completionStat} />}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <MonthlyTrendChart data={monthlyTrendData} selectedYear={selectedYear} onYearChange={setSelectedYear} />
          )}
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <RecentReportTable reports={recentReports} />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <SidebarSectionSkeleton />
          ) : (
            <>
              <DepartmentPerformanceCard departments={departmentPerformance} />
              <AnnouncementCard announcements={announcements} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

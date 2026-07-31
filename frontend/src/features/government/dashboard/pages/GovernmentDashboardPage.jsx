import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardSummaryCard } from '../shared/components/DashboardSummaryCard'
import { CompletionCard } from '../shared/components/CompletionCard'
import { MonthlyTrendChart } from '../shared/components/MonthlyTrendChart'
import { RecentReportTable } from '../shared/components/RecentReportTable'
import { DepartmentPerformanceCard } from '../shared/components/DepartmentPerformanceCard'
import { AnnouncementCard } from '../shared/components/AnnouncementCard'
import { HeaderSkeleton, SummaryCardsSkeleton, ChartSkeleton, TableSkeleton, SidebarSectionSkeleton } from '../shared/components/DashboardSkeleton'
import { COMPLETION_STAT, SUMMARY_STATS } from '../data/dashboardData'

export function GovernmentDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        // Simulate data loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (mounted) setIsLoading(false)
      } catch {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

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
          {SUMMARY_STATS.map((statistic) => (
            <DashboardSummaryCard key={statistic.id} statistic={statistic} />
          ))}
          <CompletionCard stat={COMPLETION_STAT} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <MonthlyTrendChart />
          )}
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <RecentReportTable />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <SidebarSectionSkeleton />
          ) : (
            <>
              <DepartmentPerformanceCard />
              <AnnouncementCard />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

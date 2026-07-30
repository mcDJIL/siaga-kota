import { useEffect, useState } from 'react'
import { CitizenDashboardHeader } from '../components/CitizenDashboardHeader'
import { CitizenStatistics } from '../components/CitizenStatistics'
import { CitizenReportTable } from '../components/CitizenReportTable'
import { CitizenBadgeProgress } from '../components/CitizenBadgeProgress'
import { AnnouncementSection } from '../components/AnnouncementSection'
import { LiveActivitySection } from '../components/LiveActivitySection'
import { QuickReportButton } from '../components/QuickReportButton'
import { HeaderSkeleton, StatisticsSkeleton, ReportTableSkeleton, SidebarSectionSkeleton } from '../components/DashboardSkeleton'
import { CITIZEN_POINTS } from '../data/dashboardData'
import { fetchReports } from '../../../../services/report.service'

const POINTS_PER_REPORT = 100

export function CitizenDashboardPage() {
  const [userName, setUserName] = useState('User')
  const [totalPoints, setTotalPoints] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    completedReports: 0,
    userRank: 'Pemula',
  })

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        // Get user from localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          if (mounted) setUserName(user.name || 'User')
        }

        // Fetch reports from API
        const res = await fetchReports({ page: 1, perPage: 100 })
        const items = res?.data ?? []

        if (mounted) {
          // Calculate statistics
          const total = items.length
          const completed = items.filter((r) => r.status === 'selesai').length
          const calculatedPoints = total * POINTS_PER_REPORT

          setStatistics({
            totalReports: total,
            completedReports: completed,
            userRank: completed >= 20 ? 'Platinum' : completed >= 15 ? 'Emas' : completed >= 10 ? 'Perak' : 'Pemula',
          })
          setTotalPoints(calculatedPoints)
          setIsLoading(false)
        }
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
        <CitizenDashboardHeader name={userName} points={{ ...CITIZEN_POINTS, value: totalPoints }} />
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          {isLoading ? (
            <StatisticsSkeleton />
          ) : (
            <CitizenStatistics statistics={statistics} />
          )}
          {isLoading ? (
            <ReportTableSkeleton />
          ) : (
            <CitizenReportTable />
          )}
        </div>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <SidebarSectionSkeleton />
          ) : (
            <>
              <CitizenBadgeProgress totalReports={statistics.totalReports} />
              <AnnouncementSection />
              <LiveActivitySection />
            </>
          )}
        </div>
      </div>

      <QuickReportButton />
    </div>
  )
}

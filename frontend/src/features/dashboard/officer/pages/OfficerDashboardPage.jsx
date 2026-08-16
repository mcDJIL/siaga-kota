import { StatisticsCards } from '../components/overview/StatisticsCards'
import { RecentReportsTable } from '../components/reports/RecentReportsTable'
import { ActivityMapCard } from '../components/map/ActivityMapCard'
import { WeeklyPerformanceChart } from '../components/analytics/WeeklyPerformanceChart'
import { FloatingActionButton } from '../components/FloatingActionButton'
import { DashboardProvider } from '../context/DashboardContext'

export function OfficerDashboardPage() {
  return (
    <DashboardProvider>
      <div className="flex flex-col gap-8 p-4 sm:p-8">
        <StatisticsCards />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentReportsTable />
          </div>
          <div className="flex flex-col gap-8">
            <ActivityMapCard />
            <WeeklyPerformanceChart />
          </div>
        </div>
      </div>
    </DashboardProvider>
  )
}

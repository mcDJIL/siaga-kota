import { StatisticsCards } from '../components/overview/StatisticsCards'
import { RecentReportsTable } from '../components/reports/RecentReportsTable'
import { ActivityMapCard } from '../components/map/ActivityMapCard'
import { WeeklyPerformanceChart } from '../components/analytics/WeeklyPerformanceChart'
import { FloatingActionButton } from '../components/FloatingActionButton'

export function OfficerDashboardPage() {
  return (
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

      <FloatingActionButton onClick={() => {}} />
    </div>
  )
}

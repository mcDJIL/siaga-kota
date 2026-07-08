import { CitizenDashboardHeader } from '../components/CitizenDashboardHeader'
import { CitizenStatistics } from '../components/CitizenStatistics'
import { CitizenReportTable } from '../components/CitizenReportTable'
import { CitizenBadgeProgress } from '../components/CitizenBadgeProgress'
import { AnnouncementSection } from '../components/AnnouncementSection'
import { LiveActivitySection } from '../components/LiveActivitySection'
import { QuickReportButton } from '../components/QuickReportButton'
import { CITIZEN_PROFILE, CITIZEN_POINTS } from '../data/dashboardData'

export function CitizenDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <CitizenDashboardHeader name={CITIZEN_PROFILE.name} points={CITIZEN_POINTS} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <CitizenStatistics />
          <CitizenReportTable />
        </div>

        <div className="flex flex-col gap-6">
          <CitizenBadgeProgress />
          <AnnouncementSection />
          <LiveActivitySection />
        </div>
      </div>

      <QuickReportButton />
    </div>
  )
}

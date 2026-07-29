import { Menu } from 'lucide-react'
import { DashboardSearch } from './DashboardSearch'
import { NotificationDropdown } from './NotificationDropdown'
import { ProfileDropdown } from './ProfileDropdown'

export function DashboardTopbar({
  title = 'SiagaKota Dashboard',
  onOpenSidebar,
  searchPlaceholder,
  notifications,
  profile,
  profileHref,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border-muted bg-bg-soft/90 px-4 backdrop-blur-md sm:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Buka menu navigasi"
        className="text-navy lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center gap-4">
        <DashboardSearch placeholder={searchPlaceholder} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <NotificationDropdown notifications={notifications} />
          <ProfileDropdown profile={profile} profileHref={profileHref} />
        </div>
        <span className="hidden h-8 w-px bg-border-muted sm:block" aria-hidden="true" />
        <h1 className="hidden font-sans text-xl font-semibold text-navy sm:block">{title}</h1>
      </div>
    </header>
  )
}

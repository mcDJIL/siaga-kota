import { useState } from 'react'
import { DashboardSidebar } from '../features/dashboard/officer/components/layout/DashboardSidebar'
import { DashboardTopbar } from '../features/dashboard/officer/components/layout/DashboardTopbar'

export function DashboardLayout({
  children,
  title,
  navItems,
  profile,
  notifications,
  searchPlaceholder,
  profileHref,
  logoutHref,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg-soft">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
        profile={profile}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          title={title}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          searchPlaceholder={searchPlaceholder}
          notifications={notifications}
          profile={profile}
          profileHref={profileHref}
          logoutHref={logoutHref}
        />
        <main className="flex-1">{children}</main>
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-border-muted bg-bg-blue-soft px-4 py-6 sm:flex-row sm:px-8">
          <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">
            © 2026 SiagaKota City Management Platform. All rights reserved.
          </p>
          <nav className="flex items-center gap-6" aria-label="Tautan footer dashboard">
            {['Privacy Policy', 'Contact Support', 'Terms of Service'].map((link) => (
              <a key={link} href="#" className="text-xs font-semibold tracking-[0.6px] text-navy">
                {link}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  )
}

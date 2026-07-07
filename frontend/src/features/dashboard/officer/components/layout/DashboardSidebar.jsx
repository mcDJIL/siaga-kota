import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, LayoutGrid, MapPin, Trash2, User, Waves, X } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { OFFICER_PROFILE } from '../../data/dashboardData'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid, end: true },
  { label: 'Laporan Sampah', href: '/dashboard/laporan-sampah', icon: Trash2 },
  { label: 'Laporan Banjir', href: '/officer/reports/flood', icon: Waves },
  { label: 'Peta Aktivitas', href: '/officer/activity-map', icon: MapPin },
  { label: 'Notifikasi', href: '/officer/notifications', icon: Bell },
  { label: 'Profil', href: '/dashboard/profil', icon: User },
]

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-navy py-6">
      <div className="flex items-center gap-3 px-6 pb-8">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f7609681d8f41d3dc2cc5c620fdad1a661f18d8e?width=96"
          alt="Logo SiagaKota"
          className="h-12 w-12"
        />
        <div className="flex flex-col">
          <span className="font-heading text-2xl font-bold text-white">SiagaKota</span>
          <span className="text-xs font-semibold tracking-[0.6px] text-navy-lighter/60">CITY OFFICIAL PANEL</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-2" aria-label="Navigasi dashboard petugas">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium tracking-[0.14px]',
                isActive ? 'bg-[#D6E3FF] text-[#001B3C]' : 'text-navy-lighter/70 hover:bg-white/5'
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-navy-lighter/10 px-6 pt-6">
        <img
          src={OFFICER_PROFILE.avatar}
          alt={OFFICER_PROFILE.name}
          className="h-10 w-10 rounded-full border-2 border-[#D6E3FF] object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{OFFICER_PROFILE.name}</span>
          <span className="text-[10px] tracking-[-0.5px] text-navy-lighter/50 uppercase">{OFFICER_PROFILE.role}</span>
        </div>
      </div>
    </div>
  )
}

export function DashboardSidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed top-0 left-0 h-screen w-64">
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy/50 lg:hidden"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-64"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup menu"
                className="absolute top-4 right-4 text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

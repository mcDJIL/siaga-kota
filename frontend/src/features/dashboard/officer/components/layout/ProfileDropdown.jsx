import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Settings, User } from 'lucide-react'
import { OFFICER_PROFILE } from '../../data/dashboardData'

export function ProfileDropdown({ profile = OFFICER_PROFILE, profileHref = '/officer/profile', logoutHref = '/login' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Buka menu pengguna"
        aria-expanded={isOpen}
        className="flex items-center justify-center rounded-full p-2 text-text-muted hover:bg-bg-blue-soft"
      >
        <Settings className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Tutup menu pengguna"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border-muted/30 bg-white p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <img src={profile.avatar} alt={profile.name} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-navy">{profile.name}</span>
                  <span className="text-xs text-text-muted">{profile.role}</span>
                </div>
              </div>
              <Link
                to={profileHref}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-body hover:bg-bg-soft"
              >
                <User className="h-4 w-4" />
                Profil Saya
              </Link>
              <Link to={logoutHref} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#BA1A1A] hover:bg-bg-soft">
                <LogOut className="h-4 w-4" />
                Keluar
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

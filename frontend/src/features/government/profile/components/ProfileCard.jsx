import { motion } from 'framer-motion'
import { Briefcase, Building2, MapPin, Pencil } from 'lucide-react'
import { Badge } from '../../../../components/ui/Badge'

export function ProfileCard({ profile, onEditPhoto, isLoading }) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-[#DCE9FF] bg-white p-6 text-center shadow-sm"
      >
        <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="flex w-full flex-col gap-3 border-t border-[#C4C6CF]/50 pt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-[#DCE9FF] bg-white p-6 text-center shadow-sm"
    >
      <div className="relative">
        <img
          src={profile?.avatar_url || 'https://via.placeholder.com/96'}
          alt={profile?.name || 'Avatar'}
          className="h-24 w-24 rounded-full border-4 border-bg-blue-light object-cover"
        />
        <button
          type="button"
          onClick={onEditPhoto}
          aria-label="Ubah foto profil"
          className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white shadow-sm hover:bg-navy-light"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-navy">{profile?.name || '-'}</h2>
        <p className="text-sm text-text-muted">{profile?.email || '-'}</p>
      </div>

      {(profile?.role || profile?.agency_badge) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {profile?.role && (
            <Badge variant="neutral" className="rounded-lg px-3 py-1.5 text-xs normal-case">
              {profile.role}
            </Badge>
          )}
          {profile?.agency_badge && (
            <Badge variant="success" className="rounded-lg px-3 py-1.5 text-xs normal-case">
              {profile.agency_badge}
            </Badge>
          )}
        </div>
      )}

      {(profile?.id || profile?.institution || profile?.rt || profile?.rw) && (
        <div className="flex w-full flex-col gap-3 border-t border-[#C4C6CF]/50 pt-4 text-left">
          {profile?.id && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-muted">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                ID User
              </span>
              <span className="font-semibold text-text-body">{profile.id}</span>
            </div>
          )}
          {profile?.institution && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-muted">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Instansi
              </span>
              <span className="font-semibold text-text-body">{profile.institution}</span>
            </div>
          )}
          {(profile?.rt || profile?.rw) && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-muted">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Wilayah
              </span>
              <span className="font-semibold text-text-body">{profile.rt || ''} / {profile.rw || ''}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

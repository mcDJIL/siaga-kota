import { motion } from 'framer-motion'
import { Briefcase, Building2, MapPin, Pencil } from 'lucide-react'
import { Badge } from '../../../../components/ui/Badge'

export function ProfileCard({ profile, onEditPhoto }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-[#DCE9FF] bg-white p-6 text-center shadow-sm"
    >
      <div className="relative">
        <img
          src={profile.avatar}
          alt={profile.name}
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
        <h2 className="text-xl font-semibold text-navy">{profile.name}</h2>
        <p className="text-sm text-text-muted">{profile.email}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="neutral" className="rounded-lg px-3 py-1.5 text-xs normal-case">
          {profile.role}
        </Badge>
        <Badge variant="success" className="rounded-lg px-3 py-1.5 text-xs normal-case">
          {profile.agencyBadge}
        </Badge>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-[#C4C6CF]/50 pt-4 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-text-muted">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            ID Pegawai
          </span>
          <span className="font-semibold text-text-body">{profile.employeeId}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-text-muted">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Instansi
          </span>
          <span className="font-semibold text-text-body">{profile.institution}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Wilayah
          </span>
          <span className="font-semibold text-text-body">{profile.region}</span>
        </div>
      </div>
    </motion.div>
  )
}

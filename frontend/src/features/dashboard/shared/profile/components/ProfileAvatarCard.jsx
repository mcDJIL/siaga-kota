import { motion } from 'framer-motion'
import { ProfileImageUploader } from './ProfileImageUploader'

export function ProfileAvatarCard({ profile, avatar, onAvatarChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-1 rounded-xl bg-white p-6 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <ProfileImageUploader value={avatar} onChange={onAvatarChange} />

      <h2 className="pt-4 text-xl font-semibold text-text-body">{profile.displayName}</h2>
      <p className="text-base font-bold text-navy">{profile.employeeId}</p>

      <div className="flex w-full flex-col gap-2 pt-6">
        <div className="flex items-center justify-between rounded-lg bg-bg-blue-soft p-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Jabatan</span>
          <span className="text-xs font-bold tracking-[0.6px] text-text-body">{profile.jabatan}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-bg-blue-soft p-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Departemen</span>
          <span className="text-xs font-bold tracking-[0.6px] text-text-body">{profile.departemen}</span>
        </div>
      </div>
    </motion.div>
  )
}

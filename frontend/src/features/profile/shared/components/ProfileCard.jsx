import { motion } from 'framer-motion'
import { Badge } from '../../../../components/ui/Badge'
import { AvatarUploader } from './AvatarUploader'

export function ProfileCard({ profile, onAvatarChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-1 rounded-xl bg-white p-6 text-center shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <AvatarUploader value={profile.avatar} onChange={onAvatarChange} />

      <h2 className="pt-4 text-xl font-semibold text-text-body">{profile.fullName}</h2>
      <p className="text-base text-text-muted">{profile.role}</p>

      <div className="pt-4">
        <Badge variant="success" className="px-4 py-1 text-xs normal-case">
          Verified Account
        </Badge>
      </div>
    </motion.div>
  )
}

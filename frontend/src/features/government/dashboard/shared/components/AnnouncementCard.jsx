import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { MoreVertical } from 'lucide-react'
import { AnnouncementDetailModal } from './AnnouncementDetailModal'

const PRIORITY_BORDER = {
  urgent: 'border-[#BA1A1A]',
  normal: 'border-brand-green',
  info: 'border-navy',
}

export function AnnouncementCard({ announcements = [] }) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

  function handleOpen(announcement) {
    setSelectedAnnouncement(announcement)
    toast.success('Pengumuman berhasil dibuka.')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-col gap-6 rounded-xl border border-bg-blue-lighter bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-text-body">Pengumuman Terbaru</h3>
          <button type="button" aria-label="Opsi lainnya" className="text-text-muted hover:text-navy">
            <MoreVertical className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <button
                type="button"
                onClick={() => handleOpen(announcement)}
                className={`flex w-full flex-col gap-1 border-l-2 pl-3 text-left ${PRIORITY_BORDER[announcement.priority]}`}
              >
                <span className="text-sm font-medium tracking-[0.14px] text-text-body">{announcement.title}</span>
                <span className="text-sm text-text-muted">{announcement.description}</span>
                <span className="pt-1 text-xs font-semibold tracking-[0.6px] text-text-muted/70">
                  {announcement.publishDate}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Link
          to="/government/announcements"
          className="flex items-center justify-center rounded-lg border border-badge-neutral py-2 text-sm font-medium tracking-[0.14px] text-text-body"
        >
          Kelola Pengumuman
        </Link>
      </motion.div>

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={Boolean(selectedAnnouncement)}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </>
  )
}

import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { AnnouncementCard } from '../../shared/cards/AnnouncementCard'
import { AnnouncementDetailModal } from '../../shared/cards/AnnouncementDetailModal'
import { CITIZEN_ANNOUNCEMENTS } from '../data/announcementData'

export function AnnouncementSection() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
        <Megaphone className="h-5 w-5 text-[#715C00]" aria-hidden="true" />
        Pengumuman
      </h2>

      <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto pr-2">
        {CITIZEN_ANNOUNCEMENTS.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} onClick={setSelectedAnnouncement} />
        ))}
      </div>

      <AnnouncementDetailModal announcement={selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} />
    </section>
  )
}

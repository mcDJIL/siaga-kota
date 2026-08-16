import { useEffect, useState } from 'react'
import { Megaphone } from 'lucide-react'
import { AnnouncementCard } from '../../shared/cards/AnnouncementCard'
import { AnnouncementDetailModal } from '../../shared/cards/AnnouncementDetailModal'
import { getPublicAnnouncements } from '../../../../services/announcement.service'
import { createEcho } from '../../../../lib/echo'

function mapAnnouncement(announcement) {
  const isAlert = announcement.type === 'warning' || announcement.type === 'weather'
  const body = announcement.body || announcement.description || ''

  return {
    id: announcement.id,
    source: announcement.created_by?.name || 'SiagaKota',
    title: announcement.title,
    description: body,
    fullDescription: body,
    priority: isAlert ? 'danger' : 'info',
  }
}

export function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState([])
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadAnnouncements() {
      try {
        const response = await getPublicAnnouncements({ audience: 'warga', limit: 5 })
        const items = response?.data?.announcements ?? []

        if (mounted) {
          setAnnouncements(items.map(mapAnnouncement))
        }
      } catch {
        if (mounted) {
          setAnnouncements([])
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadAnnouncements()

    const echo = createEcho()
    if (!echo) {
      return () => {
        mounted = false
      }
    }

    const channel = echo.private('city.announcements')
    channel.listen('.announcement.published', loadAnnouncements)

    return () => {
      mounted = false
      channel.stopListening('.announcement.published')
      echo.leave('city.announcements')
    }
  }, [])

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
        <Megaphone className="h-5 w-5 text-[#715C00]" aria-hidden="true" />
        Pengumuman
      </h2>

      <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto pr-2">
        {isLoading ? (
          <p className="text-sm text-text-muted">Memuat pengumuman...</p>
        ) : announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} onClick={setSelectedAnnouncement} />
          ))
        ) : (
          <p className="text-sm text-text-muted">Belum ada pengumuman.</p>
        )}
      </div>

      <AnnouncementDetailModal announcement={selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} />
    </section>
  )
}

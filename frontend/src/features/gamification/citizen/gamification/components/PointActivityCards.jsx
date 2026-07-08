import { motion } from 'framer-motion'
import { Waves, Droplet, HeartHandshake, Share2 } from 'lucide-react'

const ACTIVITIES = [
  {
    id: 'flood-report',
    title: 'Lapor Banjir',
    description: 'Laporkan kondisi genangan di wilayahmu secara real-time.',
    xp: 50,
    icon: Waves,
    bg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    xpColor: 'text-brand-green-dark',
  },
  {
    id: 'waste-report',
    title: 'Update Debit Air',
    description: 'Kirim foto ketinggian pintu air terdekat dari lokasimu.',
    xp: 30,
    icon: Droplet,
    bg: 'bg-[#D6E3FF]',
    iconColor: 'text-navy',
    xpColor: 'text-navy',
  },
  {
    id: 'community-service',
    title: 'Kerja Bakti',
    description: 'Scan QR code saat mengikuti kegiatan bersih-bersih lingkungan.',
    xp: 200,
    icon: HeartHandshake,
    bg: 'bg-[#FFE17C]',
    iconColor: 'text-[#231B00]',
    xpColor: 'text-[#715C00]',
  },
  {
    id: 'share-alert',
    title: 'Bagikan Alert',
    description: 'Beritahu warga lain tentang peringatan dini cuaca ekstrim.',
    xp: 10,
    icon: Share2,
    bg: 'bg-[#D3E4FE]',
    iconColor: 'text-text-muted',
    xpColor: 'text-text-muted',
  },
]

export function PointActivityCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ACTIVITIES.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex flex-col gap-2 rounded-2xl border border-border-muted/20 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.bg}`}>
            <activity.icon className={`h-[18px] w-[18px] ${activity.iconColor}`} aria-hidden="true" />
          </span>
          <h4 className="pt-2 text-base text-navy">{activity.title}</h4>
          <p className="pb-2 text-sm font-medium tracking-[0.14px] text-text-muted">{activity.description}</p>
          <span className={`text-base font-bold ${activity.xpColor}`}>+{activity.xp} XP</span>
        </motion.div>
      ))}
    </div>
  )
}

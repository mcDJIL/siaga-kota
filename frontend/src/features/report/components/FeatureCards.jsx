import { motion } from 'framer-motion'
import { Trash2, Waves, Gift } from 'lucide-react'

const FEATURES = [
  {
    icon: Trash2,
    iconBg: 'bg-brand-green-light/40',
    iconColor: 'text-brand-green',
    title: 'Laporkan Sampah',
    description: 'Laporkan tumpukan sampah atau saluran air yang tersumbat limbah demi kebersihan kota.',
  },
  {
    icon: Waves,
    iconBg: 'bg-navy/10',
    iconColor: 'text-navy',
    title: 'Laporkan Banjir',
    description: 'Pantau dan laporkan genangan air tinggi untuk penanganan cepat petugas di titik lokasi.',
  },
  {
    icon: Gift,
    iconBg: 'bg-badge-gold/20',
    iconColor: 'text-[#D97706]',
    title: 'Dapatkan Poin',
    description: 'Setiap laporan valid memberikan poin reward yang bisa ditukar dengan kontribusi bibit pohon.',
  },
]

export function FeatureCards() {
  return (
    <div className="relative z-10 mx-auto -mt-16 grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:px-8">
      {FEATURES.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex flex-col items-start gap-2 rounded-2xl border border-border-muted/30 bg-white p-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]"
        >
          <span className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ${feature.iconBg}`}>
            <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
          </span>
          <h3 className="pt-2 font-display text-base font-bold text-navy-light">{feature.title}</h3>
          <p className="text-base leading-[26px] text-text-muted">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

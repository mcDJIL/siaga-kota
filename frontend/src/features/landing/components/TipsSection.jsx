import { SectionHeading } from '../../../components/ui/SectionHeading'
import { ArrowLinkIcon, AlertDiamondIcon, WaterDropIcon, RecycleIcon } from './icons'

const TIPS = [
  {
    iconBg: 'bg-navy-light',
    iconColor: 'text-navy-lighter',
    icon: AlertDiamondIcon,
    title: 'Siapkan Tas Siaga',
    description: 'Siapkan dokumen penting, obat-obatan, dan kebutuhan pokok dalam satu tas yang mudah diakses.',
    cta: 'Pelajari Selengkapnya',
  },
  {
    iconBg: 'bg-navy-light',
    iconColor: 'text-navy-lighter',
    icon: WaterDropIcon,
    title: 'Pantau Ketinggian Air',
    description: 'Gunakan fitur real-time monitoring kami untuk memantau ketinggian air sungai di titik terdekat Anda.',
    cta: 'Lihat Panduan',
  },
  {
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    icon: RecycleIcon,
    title: 'Kelola Sampah Rumah Tangga',
    description: 'Kurangi sampah plastik dan pastikan saluran pembuangan di depan rumah bebas dari hambatan.',
    cta: 'Tips Pengolahan',
  },
]

function TipCard({ iconBg, iconColor, icon: IconComponent, title, description, cta }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-bg-blue-light p-10 text-center">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}>
        <IconComponent className={`h-7 w-7 ${iconColor}`} />
      </div>
      <h3 className="font-heading text-2xl font-semibold text-text-body">{title}</h3>
      <p className="text-base leading-6 text-text-body/80">{description}</p>
      <a href="#" className="flex items-center gap-1 font-sans text-sm font-medium tracking-[0.14px] text-brand-green">
        {cta}
        <ArrowLinkIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

export function TipsSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8">
      <SectionHeading
        title="Tips Siaga & Berkelanjutan"
        description="Persiapan cerdas untuk lingkungan yang lebih aman dan asri."
        className="pb-14"
      />
      <div className="flex flex-col gap-10 lg:flex-row">
        {TIPS.map((tip) => (
          <TipCard key={tip.title} {...tip} />
        ))}
      </div>
    </section>
  )
}

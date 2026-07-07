import { Waves } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { cn } from '../../../lib/cn'
import { TrashIcon, CheckCircleIcon, ClockIcon, GraduationCapIcon, BarChartIcon, MapFoldIcon, BellIcon } from './icons'

const SOLUTIONS = [
  {
    accent: 'green',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/294c8bad4bef0dcbda59c5eae2e83a7929fc7a18?width=1321',
    icon: TrashIcon,
    title: 'Kelola Sampah Drainese',
    items: [
      { icon: CheckCircleIcon, text: 'Pelaporan sampah drainase berbasis geo-lokasi yang akurat.' },
      { icon: ClockIcon, text: 'Penjadwalan petugas kebersihan otomatis melalui sistem tiket.' },
      { icon: GraduationCapIcon, text: 'Edukasi manajemen limbah rumah tangga bagi warga sekitar.' },
    ],
    cta: 'Pelajari Lebih Lanjut',
  },
  {
    accent: 'navy',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/42d43cf05223e82b623ceb9ecc442b1928058fa6?width=1321',
    icon: Waves,
    title: 'Prediksi Banjir 7 Hari',
    items: [
      { icon: BarChartIcon, text: 'Prediksi berbasis AI menggunakan data cuaca dan debit air sungai.' },
      { icon: MapFoldIcon, text: 'Peta zona bahaya interaktif dengan layer peringatan dini.' },
      { icon: BellIcon, text: 'Sistem Early Warning (EWS) langsung ke perangkat seluler warga.' },
    ],
    cta: 'Lihat Peta Prediksi',
  },
]

function SolutionCard({ accent, image, icon: HeadingIcon, title, items, cta }) {
  const isGreen = accent === 'green'

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
      <img src={image} alt={title} className="h-64 w-full object-cover" />
      <div className="flex flex-1 flex-col p-6 sm:p-10">
        <div className="flex items-center gap-2 pb-4">
          <HeadingIcon className={cn('h-6 w-6 shrink-0', isGreen ? 'text-brand-green' : 'text-navy')} />
          <h3 className="font-heading text-2xl font-semibold text-navy">{title}</h3>
        </div>
        <ul className="flex flex-1 flex-col gap-4 pb-10">
          {items.map((item) => (
            <li key={item.text} className="flex items-start gap-2">
              <item.icon className={cn('h-5 w-5 shrink-0', isGreen ? 'text-brand-green' : 'text-navy')} />
              <span className="text-base leading-6 text-text-body">{item.text}</span>
            </li>
          ))}
        </ul>
        <Button variant={isGreen ? 'primary' : 'navy'} size="block">
          {cta}
        </Button>
      </div>
    </div>
  )
}

export function SolutionsSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8">
      <SectionHeading
        title="Solusi Terintegrasi Kami"
        description="Menyeimbangkan teknologi prediksi dengan aksi lingkungan untuk kota yang lebih tangguh."
        className="pb-14"
      />
      <div className="flex flex-col gap-10 lg:flex-row">
        {SOLUTIONS.map((solution) => (
          <SolutionCard key={solution.title} {...solution} />
        ))}
      </div>
    </section>
  )
}

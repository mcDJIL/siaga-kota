import { ChevronRightIcon } from './icons'

const ANNOUNCEMENTS = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/709e5f9107b5e6b7b12cb4c76804c71f66716205?width=789',
    category: 'Waste Management',
    categoryClass: 'bg-brand-green/10 text-brand-green',
    title: 'Peningkatan Armada Angkut Sampah di Wilayah Selatan',
    description: 'Pemerintah kota menambah 15 unit truk sampah elektrik untuk mempercepat pembersihan drainase',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/972f13291fb261a24e16006611b91e2d15a962da?width=789',
    category: 'Flood Mitigation',
    categoryClass: 'bg-navy/10 text-navy',
    title: 'Instalasi Sensor Air Baru di 20 Titik Rawan Banjir',
    description:
      'Teknologi sensor terbaru kini telah terintegrasi dengan dasbor SiagaKota untuk akurasi prediksi…',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/88fc57ace663581e2d70bb576a7b820684b986fe?width=789',
    category: 'Community',
    categoryClass: 'bg-badge-gold/10 text-badge-gold',
    title: 'Sosialisasi Aplikasi SiagaKota di Kecamatan Gambir',
    description:
      'Warga diajak berpartisipasi aktif dalam menjaga kebersihan lingkungan dan melaporkan potensi…',
  },
]

function AnnouncementCard({ image, category, categoryClass, title, description }) {
  return (
    <article className="flex flex-col gap-1">
      <div className="overflow-hidden rounded-xl">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </div>
      <span className={`w-fit rounded-full px-2 py-0.5 text-base ${categoryClass}`}>{category}</span>
      <h3 className="pt-0.5 font-sans text-xl font-semibold leading-7 text-navy">{title}</h3>
      <p className="text-base leading-6 text-text-muted">{description}</p>
    </article>
  )
}

export function AnnouncementsSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8">
      <div className="flex flex-col gap-4 pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Pengumuman Terkini
          </h2>
          <p className="text-base leading-6 text-text-muted">
            Informasi resmi dari pemerintah kota terkait mitigasi bencana.
          </p>
        </div>
        <a href="#" className="flex items-center gap-1 font-sans text-sm font-medium tracking-[0.14px] text-navy">
          Lihat Semua
          <ChevronRightIcon className="h-3 w-3 text-navy" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ANNOUNCEMENTS.map((announcement) => (
          <AnnouncementCard key={announcement.title} {...announcement} />
        ))}
      </div>
    </section>
  )
}

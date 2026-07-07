import { SectionHeading } from '../../../components/ui/SectionHeading'
import { cn } from '../../../lib/cn'
import { QuoteIcon } from './icons'

const TESTIMONIALS = [
  {
    accent: 'border-brand-green text-brand-green',
    avatarClass: 'bg-brand-green-light text-brand-green-dark',
    initials: 'SA',
    quote: 'Koordinasi tim di lapangan jadi lebih cepat berkat laporan real-time dari masyarakat melalui platform ini.',
    name: 'Siti Aminah',
    role: 'Petugas BPBD',
  },
  {
    accent: 'border-navy text-navy',
    avatarClass: 'bg-navy-light text-navy-lighter',
    initials: 'BS',
    quote: 'Aplikasi ini sangat membantu saya memantau kondisi jalanan saat hujan deras. Prediksinya cukup akurat!',
    name: 'Budi Santoso',
    role: 'Warga Jakarta Selatan',
  },
  {
    accent: 'border-badge-neutral text-badge-neutral',
    avatarClass: 'bg-bg-blue-light text-text-muted',
    initials: 'AW',
    quote: 'Sangat informatif. Artikel edukasinya memberikan panduan yang jelas bagi keluarga saya untuk bersiap.',
    name: 'Andi Wijaya',
    role: 'Relawan Lingkungan',
  },
]

function TestimonialCard({ accent, avatarClass, initials, quote, name, role }) {
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-2xl border-t-4 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:p-10',
        accent.split(' ')[0]
      )}
    >
      <div className="flex flex-1 flex-col gap-4 pb-6">
        <QuoteIcon className={cn('h-4 w-[23px]', accent.split(' ')[1])} />
        <p className="italic leading-6 text-text-body">"{quote}"</p>
      </div>
      <div className="flex items-center gap-4 border-t border-border-muted pt-4">
        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold', avatarClass)}>
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-xl font-semibold leading-7 text-navy">{name}</span>
          <span className="text-base leading-6 text-text-muted">{role}</span>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-bg-blue-soft px-4 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-14">
        <SectionHeading title="Apa Kata Mereka?" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

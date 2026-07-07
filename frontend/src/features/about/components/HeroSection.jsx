import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'

export function HeroSection({
  title = 'Tentang SiagaKota: Mewujudkan Kota yang Tangguh dan Berkelanjutan',
  description = 'Mengenal lebih dekat visi kami dalam mengintegrasikan teknologi AI dan partisipasi warga untuk mitigasi bencana.',
  primaryLabel = 'Mulai Sekarang',
  primaryHref = '/report',
  secondaryLabel = 'Lihat Dokumentasi',
  secondaryHref = '#',
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden bg-linear-to-br from-navy via-navy to-brand-green-dark bg-[url('../assets/images/hero.webp')] bg-cover bg-center px-4 py-20 sm:px-8 sm:py-28 lg:py-40"
    >
      <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 text-center">
        <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-white/90">{description}</p>
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <Button
            as="a"
            href={primaryHref}
            variant="primary"
            size="md"
            className="w-full rounded-lg px-10 py-[17px] text-base font-normal shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] sm:w-auto"
          >
            {primaryLabel}
          </Button>
          <Button
            as="a"
            href={secondaryHref}
            size="md"
            className="w-full rounded-lg border border-white/30 bg-white/70 px-10 py-4 text-base font-normal text-black backdrop-blur-md hover:bg-white/80 sm:w-auto"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </motion.section>
  )
}

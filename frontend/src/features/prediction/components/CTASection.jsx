import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import { WavePatternIcon } from './icons'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-20 sm:px-8">
      <WavePatternIcon className="pointer-events-none absolute top-1/2 right-0 hidden h-[334px] w-[334px] -translate-y-1/2 translate-x-1/4 text-white opacity-10 lg:block" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[56px]">
          Bersiap Lebih Awal, Lindungi Kota Kita.
        </h2>
        <p className="text-lg leading-8 text-white/80">
          Dapatkan notifikasi peringatan banjir langsung ke perangkat Anda. Bergabunglah dengan ribuan warga Jakarta
          lainnya.
        </p>
        <div className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row">
          <Button className="w-full bg-brand-green-light text-[#007243] hover:bg-brand-green-light/90 sm:w-auto" size="lg">
            Download Aplikasi
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full border border-white/20 bg-white/10 text-white backdrop-blur-[4px] hover:bg-white/20 sm:w-auto"
          >
            Langganan Newsletter
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

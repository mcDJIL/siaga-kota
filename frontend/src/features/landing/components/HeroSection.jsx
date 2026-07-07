import { Button } from '../../../components/ui/Button'
import { TrashIcon, ShieldHomeIcon } from './icons'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy via-navy to-brand-green-dark px-4 py-20 sm:px-8 sm:py-28 lg:py-56 bg-[url('../assets/images/hero.webp')]">
      <div className="absolute inset-0 bg-navy/40" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1440px] px-4 sm:px-8 flex-col items-start gap-6">
        <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[48px] lg:leading-[1.1] md:w-[700px]">
          Bersama Wujudkan Kota Siaga dan Berkelanjutan
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-white/90">
          SiagaKota membantu warga melaporkan sampah drainase dan memprediksi banjir, sehingga kota tetap aman dan
          berkelanjutan.
        </p>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Button variant="primary" size="lg">
            <TrashIcon className="h-[18px] w-4 shrink-0" />
            Laporkan Sampah
          </Button>
          <Button variant="secondary" size="lg">
            <ShieldHomeIcon className="h-[17px] w-[22px] shrink-0" />
            Lihat Prediksi Banjir
          </Button>
        </div>
      </div>
    </section>
  )
}

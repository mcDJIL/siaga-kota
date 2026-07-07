import { motion } from 'framer-motion'
import { ImpactCard } from './ImpactCard'
import { STATISTICS } from '../data/statistics'

export function ImpactSection() {
  return (
    <section className="px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-[1440px] rounded-[32px] bg-navy px-4 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Dampak Nyata yang Telah Terwujud
            </h2>
            <p className="max-w-2xl text-lg leading-7 text-white/80">
              Angka-angka yang menceritakan dedikasi kami untuk kota yang lebih baik.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 sm:flex-row">
            {STATISTICS.map((statistic) => (
              <ImpactCard key={statistic.id} statistic={statistic} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

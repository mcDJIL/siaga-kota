import { motion } from 'framer-motion'
import { ValueCard } from './ValueCard'
import { VisionBadgeIcon } from './icons'
import { VALUES } from '../data/values'

export function VisionSection() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center gap-4 lg:col-span-5"
        >
          <span className="flex w-fit items-center gap-2 rounded-full bg-brand-green-light px-4 py-1">
            <VisionBadgeIcon className="h-3 w-[17px]" />
            <span className="text-xs font-semibold tracking-[0.6px] text-brand-green-dark uppercase">Visi Kami</span>
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Menjadi platform manajemen kota terdepan yang menciptakan lingkungan perkotaan yang aman, bersih, dan
            tanggap terhadap tantangan perubahan iklim.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          {VALUES.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  )
}

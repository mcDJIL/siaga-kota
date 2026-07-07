import { motion } from 'framer-motion'
import { TechnologyCard } from './TechnologyCard'
import { TECHNOLOGIES } from '../data/technology'

export function TechnologySection() {
  return (
    <section className="border-y border-border-muted/20 bg-bg-soft px-4 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Teknologi Penggerak
          </h2>
          <p className="max-w-2xl text-lg leading-7 text-text-muted">
            Kombinasi antara kecerdasan buatan dan kekuatan komunitas untuk menciptakan solusi mitigasi yang tangguh.
          </p>
        </motion.div>

        <div className="flex w-full flex-col gap-6 lg:flex-row">
          {TECHNOLOGIES.map((technology) => (
            <TechnologyCard key={technology.id} technology={technology} />
          ))}
        </div>
      </div>
    </section>
  )
}

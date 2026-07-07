import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { benefits, benefitImage } from '../data/benefitsData'

export function BenefitSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-16 sm:px-8 lg:flex-row lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-1 flex-col gap-6"
      >
        <h2 className="font-display text-base font-bold text-navy-light">Kenapa Anda Harus Melapor?</h2>
        <ul className="flex flex-col gap-4">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-start gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green">
                <Check size={12} className="text-white" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-text-body">{benefit.title}</h4>
                <p className="text-base leading-6 text-text-muted">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="h-[300px] w-full flex-1 overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[400px]"
      >
        <img src={benefitImage} alt="Petugas kebersihan sedang bertugas" className="h-full w-full object-cover" />
      </motion.div>
    </section>
  )
}

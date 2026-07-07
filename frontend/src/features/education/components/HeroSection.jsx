import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white px-4 pt-16 pb-10 text-center sm:px-8"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Pusat Edukasi SiagaKota
        </h1>
        <p className="text-base leading-6 text-text-muted">
          Belajar bersama untuk kota yang lebih aman dan asri. Temukan berbagai panduan interaktif dan informasi
          terkini.
        </p>
      </div>
    </motion.section>
  )
}

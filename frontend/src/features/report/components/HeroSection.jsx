import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy via-navy to-navy-light px-4 py-20 sm:px-8 sm:py-28">
      <div className="absolute inset-0 bg-navy/50" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center"
      >
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Laporkan Masalah Lingkungan</h1>
        <p className="text-lg leading-7 text-white/90">
          Bantu wujudkan kota bersih dan aman dari banjir dengan melaporkan sampah atau genangan air yang mengganggu
          ketertiban umum di lingkungan Anda.
        </p>
      </motion.div>
    </section>
  )
}

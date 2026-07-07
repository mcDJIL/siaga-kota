import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-bg-soft px-4 py-12 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-lg font-bold text-navy-light">
          Sudah siap berkontribusi? Ayo daftar sekarang!
        </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button className="w-full bg-accent-green hover:bg-accent-green/90 sm:w-auto">Daftar Sekarang</Button>
          <Button variant="navy" className="w-full sm:w-auto">
            Login
          </Button>
        </div>
      </div>
    </motion.section>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-16 sm:px-8 lg:py-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Mari Berkontribusi untuk Kotamu
        </h2>
        <p className="text-lg leading-7 text-text-muted">
          Bersama kita bisa menciptakan lingkungan yang lebih aman dan nyaman. Daftarkan diri Anda atau pelajari
          bagaimana fitur kami membantu keseharian Anda.
        </p>
        <div className="flex w-full flex-col items-center gap-4 pt-2 sm:w-auto sm:flex-row">
          <Button
            as={Link}
            to="/report"
            variant="navy"
            className="w-full rounded-xl px-16 py-6 font-heading text-base font-normal shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] sm:w-auto"
            aria-label="Daftar sekarang"
          >
            Daftar Sekarang
          </Button>
          <Button
            as={Link}
            to="/education"
            className="w-full rounded-xl border border-border-muted bg-bg-blue-lighter px-16 py-6 font-heading text-base font-normal text-navy hover:bg-bg-blue-lighter/80 sm:w-auto"
            aria-label="Pelajari fitur SiagaKota"
          >
            Pelajari Fitur
          </Button>
        </div>
      </div>
    </motion.section>
  )
}

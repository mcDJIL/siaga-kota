import { motion } from 'framer-motion'

const ILLUSTRATION_SRC = 'https://api.builder.io/api/v1/image/assets/TEMP/dba381098a1be1101ac3730c4d570533e58243a7?width=1440'

export function AuthIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-56 shrink-0 overflow-hidden sm:h-72 lg:h-auto lg:w-1/2 xl:w-3/5"
    >
      <img
        src={ILLUSTRATION_SRC}
        alt="Ilustrasi kota berkelanjutan SiagaKota"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-text-body/40 to-text-body/70" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col justify-end gap-3 p-6 sm:gap-4 sm:p-10 lg:p-16">
        <h2 className="max-w-xl font-heading text-2xl leading-tight font-bold tracking-tight text-bg-soft sm:text-4xl lg:text-5xl">
          Membangun Kota yang Tangguh dan Berkelanjutan.
        </h2>
        <p className="hidden max-w-lg text-lg leading-7 text-bg-soft/90 sm:block">
          Bergabunglah dengan komunitas warga yang peduli terhadap keselamatan kota. Pantau banjir, lapor sampah, dan
          jaga lingkungan bersama kami.
        </p>
      </div>
    </motion.div>
  )
}

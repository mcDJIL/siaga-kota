import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import { ForecastCard } from './ForecastCard'
import { PredictionStats } from './PredictionStats'
import { ArrowDownIcon } from './icons'

export function HeroPrediction() {
  return (
    <section className="relative overflow-hidden bg-bg-soft px-4 pt-12 pb-20 sm:px-8 sm:pt-16 lg:pt-20">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold tracking-[0.6px] text-brand-green uppercase">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            AI Prediction Live
          </span>
          <h1 className="font-heading text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Prediksi Banjir Cerdas untuk Kota Siaga.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-text-muted">
            Memanfaatkan teknologi AI dan jaringan sensor IoT untuk memberikan peringatan dini yang akurat. Pantau
            curah hujan, ketinggian air, dan risiko limpasan secara real-time.
          </p>
          <div className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row">
            <a href="#peta-status" className="w-full sm:w-auto">
              <Button variant="navy" size="lg" className="w-full text-lg sm:text-lg" aria-label="Pantau peta sekarang">
                Pantau Peta Sekarang
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="lg"
              className="w-full border-2 border-border-muted text-lg text-navy sm:w-auto sm:text-lg"
            >
              Data Historis
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <ForecastCard />
          <PredictionStats />
        </motion.div>
      </div>
    </section>
  )
}

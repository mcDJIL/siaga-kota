import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CORRELATION_INSIGHT } from '../../data/predictionStatistics'

export function PredictionDetailCard({ onOpenDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-start gap-6 rounded-xl border border-[#C4C6CF]/30 bg-bg-blue-soft p-6 sm:flex-row sm:items-center"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy/10">
        <Sparkles className="h-7 w-7 text-navy" aria-hidden="true" />
      </span>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-semibold text-text-body">{CORRELATION_INSIGHT.title}</h3>
        <p className="text-base text-text-muted">
          Analisis AI mendeteksi korelasi kuat ({CORRELATION_INSIGHT.correlationPercentage}%) antara penumpukan sampah di titik{' '}
          <span className="text-text-body">{CORRELATION_INSIGHT.district}</span> dengan proyeksi peningkatan tinggi muka air
          selama curah hujan tinggi. Pembersihan sampah di area ini akan menurunkan risiko banjir secara signifikan sebesar{' '}
          {CORRELATION_INSIGHT.reductionPercentage}%.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenDetail}
        className="flex shrink-0 items-center gap-2 rounded-md border border-[#C4C6CF] bg-[#E5EEFF] px-5 py-2.5 text-sm font-medium text-text-body shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors hover:bg-bg-blue-light"
      >
        Lihat Laporan Detail
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </button>
    </motion.div>
  )
}

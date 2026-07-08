import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { formatPoints } from '../utils/pointFormatter'

export function PointCard({ totalXp, onRedeemClick, onHistoryClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl bg-navy-light p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] lg:col-span-7"
    >
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-brand-green opacity-20 blur-3xl" />

      <div className="relative flex flex-col gap-1">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold tracking-[0.6px] text-white">
          <ShieldCheck size={14} aria-hidden="true" />
          VERIFIED CITIZEN
        </span>
        <h2 className="pt-3 font-display text-lg font-semibold text-navy-lighter">Total Poin Kamu</h2>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
            {formatPoints(totalXp)}
          </span>
          <span className="font-display text-2xl font-semibold text-navy-lighter">XP</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-3 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onRedeemClick}
          aria-label="Tukar poin dengan reward"
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-base text-white transition-transform hover:scale-[1.02]"
        >
          Redeem Rewards
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onHistoryClick}
          aria-label="Lihat riwayat poin"
          className="flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-base text-white transition-colors hover:bg-white/20"
        >
          History
        </button>
      </div>
    </motion.div>
  )
}

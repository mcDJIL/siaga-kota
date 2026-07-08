import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'
import { formatPoints } from '../utils/pointFormatter'

export function RewardCard({ reward, canAfford, onRedeem }) {
  const Icon = reward.icon
  const isOutOfStock = reward.stock <= 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 rounded-2xl border border-border-muted/30 bg-white p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl', reward.bg)}>
        <Icon className={cn('h-6 w-6', reward.iconColor)} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <h4 className="font-display text-base font-semibold text-navy">{reward.name}</h4>
        <p className="text-sm text-text-muted">{reward.description}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-brand-green-dark">{formatPoints(reward.requiredXp)} XP</span>
        <span className="text-text-muted">Stok: {reward.stock}</span>
      </div>
      <button
        type="button"
        disabled={isOutOfStock || !canAfford}
        onClick={() => onRedeem(reward)}
        aria-label={`Tukar ${reward.name}`}
        className="mt-1 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isOutOfStock ? 'Stok Habis' : 'Tukar Reward'}
      </button>
    </motion.div>
  )
}

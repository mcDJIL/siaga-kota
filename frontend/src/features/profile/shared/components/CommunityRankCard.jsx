import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'
import { cn } from '../../../../lib/cn'

export function CommunityRankCard({ rankings, activityRank }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-center gap-3">
        <LayoutGrid className="h-5 w-5 text-navy" aria-hidden="true" />
        <h3 className="text-sm font-medium text-navy">Peringkat Komunitas</h3>
      </div>

      <div className="flex flex-col gap-3">
        {rankings.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              'flex items-center justify-between gap-2 rounded-lg px-2 py-1',
              entry.isCurrentUser && 'bg-brand-green-light/30 p-2'
            )}
          >
            <span className={cn('text-sm', entry.isCurrentUser ? 'font-bold text-brand-green-dark' : 'font-medium text-text-muted')}>
              {entry.rank}. {entry.name}
            </span>
            <span className={cn('text-sm font-bold', entry.isCurrentUser ? 'text-brand-green-dark' : 'text-text-muted')}>
              {entry.points.toLocaleString('id-ID')} pts
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-navy-light p-4 text-white">
        <span className="text-sm font-medium text-navy-lighter">Activity Rank</span>
        <div className="flex items-end gap-2">
          <span className="font-display text-4xl font-bold text-navy-lighter">#{activityRank.rank}</span>
          <span className="pb-1 text-sm font-medium text-navy-lighter/80">in {activityRank.area}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activityRank.progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full rounded-full bg-brand-green-light"
          />
        </div>
        <span className="text-xs font-semibold tracking-[0.6px] text-navy-lighter/70">{activityRank.description}</span>
      </div>
    </motion.div>
  )
}

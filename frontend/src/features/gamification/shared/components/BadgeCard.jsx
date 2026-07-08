import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { cn } from '../../../../lib/cn'

export function BadgeCard({ badge, onClick, size = 'md' }) {
  const Icon = badge.icon
  const isLarge = size === 'lg'

  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(badge)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      aria-label={`${badge.name}${badge.earned ? ' (diperoleh)' : ' (terkunci)'}`}
      className={cn('flex flex-col items-center gap-2', !badge.earned && 'opacity-60')}
    >
      <span
        className={cn(
          'relative flex items-center justify-center rounded-full border-4 border-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]',
          isLarge ? 'h-24 w-24' : 'h-16 w-16',
          badge.earned ? badge.bg : 'bg-bg-blue-light'
        )}
      >
        <Icon className={cn(isLarge ? 'h-10 w-10' : 'h-6 w-6', badge.earned ? badge.iconColor : 'text-badge-neutral')} aria-hidden="true" />
        {!badge.earned && (
          <span className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
            <Lock className="h-3 w-3 text-badge-neutral" aria-hidden="true" />
          </span>
        )}
      </span>
      <span className={cn('text-center text-xs font-medium tracking-[0.6px]', badge.earned ? 'text-navy' : 'text-text-muted')}>
        {badge.name}
      </span>
    </motion.button>
  )
}

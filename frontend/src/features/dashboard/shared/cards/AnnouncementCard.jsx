import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'

const PRIORITY_STYLES = {
  danger: { border: 'border-l-[#BA1A1A]', source: 'text-[#BA1A1A]' },
  info: { border: 'border-l-navy', source: 'text-navy' },
  success: { border: 'border-l-[#006D40]', source: 'text-[#006D40]' },
}

export function AnnouncementCard({ announcement, onClick }) {
  const style = PRIORITY_STYLES[announcement.priority]

  return (
    <motion.button
      type="button"
      onClick={() => onClick(announcement)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex w-full flex-col gap-1 rounded-xl border-l-4 bg-bg-blue-soft p-4 text-left',
        style.border
      )}
    >
      <span className={cn('text-xs font-bold tracking-[0.6px]', style.source)}>{announcement.source}</span>
      <span className="text-base font-semibold text-text-body">{announcement.title}</span>
      <p className="pt-1 text-sm font-medium tracking-[0.14px] text-text-muted">{announcement.description}</p>
    </motion.button>
  )
}

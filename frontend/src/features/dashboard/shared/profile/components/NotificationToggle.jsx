import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'

export function NotificationToggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-brand-green-light' : 'bg-border-muted'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'h-5 w-5 rounded-full bg-white shadow-sm',
          checked ? 'ml-[calc(100%-1.25rem)]' : 'ml-0.5'
        )}
      />
    </button>
  )
}

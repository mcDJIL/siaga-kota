import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'

const VARIANTS = {
  primary: 'bg-navy text-white',
  secondary: 'bg-bg-blue-lighter text-navy',
  outline: 'border border-border-muted text-text-muted',
}

export function NotificationActionButton({ variant = 'primary', disabled, className, children, ...props }) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-semibold tracking-[0.14px] transition-colors',
        disabled ? 'cursor-not-allowed bg-bg-blue-soft text-text-muted/60' : VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

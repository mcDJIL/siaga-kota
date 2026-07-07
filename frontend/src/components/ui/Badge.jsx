import { cn } from '../../lib/cn'

const variants = {
  success: 'bg-brand-green-light text-[#007243]',
  warning: 'bg-badge-gold/20 text-[#715C00]',
  danger: 'bg-[#BA1A1A]/10 text-[#BA1A1A]',
  neutral: 'bg-bg-blue-light text-text-muted',
}

export function Badge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full px-2 py-1 text-[10px] font-bold tracking-[0.5px] uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

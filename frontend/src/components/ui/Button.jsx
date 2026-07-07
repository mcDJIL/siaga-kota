import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-brand-green text-white hover:bg-brand-green-dark',
  secondary: 'bg-navy-light text-white hover:bg-navy',
  navy: 'bg-navy text-white hover:bg-navy-light',
  ghost: 'bg-transparent text-navy hover:bg-navy/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg font-sans font-medium',
  md: 'px-6 py-2.5 text-sm rounded-lg font-sans font-medium',
  lg: 'px-6 py-4 sm:px-10 rounded-xl font-heading text-lg sm:text-2xl font-semibold gap-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]',
  block: 'w-full py-4 rounded-lg font-sans text-lg sm:text-xl font-medium tracking-[0.14px]',
}

export function Button({ as: Component = 'button', variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 text-center shadow-sm transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

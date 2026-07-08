import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export const Select = forwardRef(function Select({ className, error, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full appearance-none rounded-lg bg-bg-soft px-4 py-[18px] text-base text-text-body focus:outline-2 focus:outline-brand-green',
          error && 'outline-2 outline-[#BA1A1A]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
    </div>
  )
})

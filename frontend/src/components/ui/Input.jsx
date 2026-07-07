import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg bg-bg-soft px-4 py-[18px] text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
        error && 'outline-2 outline-[#BA1A1A]',
        className
      )}
      {...props}
    />
  )
})

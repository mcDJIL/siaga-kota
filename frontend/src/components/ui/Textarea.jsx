import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

export const Textarea = forwardRef(function Textarea({ className, error, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        'w-full resize-none rounded-lg bg-bg-soft px-4 py-4 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
        error && 'outline-2 outline-[#BA1A1A]',
        className
      )}
      {...props}
    />
  )
})

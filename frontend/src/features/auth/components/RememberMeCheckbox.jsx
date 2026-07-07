import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../../lib/cn'

export const RememberMeCheckbox = forwardRef(function RememberMeCheckbox(
  { id, label, error, className, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="flex items-start gap-2">
        <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
          <input ref={ref} id={id} type="checkbox" className="peer sr-only" {...props} />
          <span className="absolute inset-0 rounded border border-border-muted bg-bg-soft peer-checked:border-brand-green peer-checked:bg-brand-green" />
          <Check className="relative h-3 w-3 text-white opacity-0 peer-checked:opacity-100" aria-hidden="true" />
        </span>
        <span className="text-base text-text-muted">{label}</span>
      </label>
      {error && <p className="text-sm text-[#BA1A1A]">{error}</p>}
    </div>
  )
})

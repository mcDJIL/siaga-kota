import { forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { LockIcon } from './icons'
import { cn } from '../../../lib/cn'

export const PasswordInput = forwardRef(function PasswordInput(
  { label, error, id, className, ...props },
  ref
) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium tracking-[0.14px] text-text-body">
          {label}
        </label>
      )}
      <div className="relative">
        <LockIcon className="pointer-events-none absolute top-1/2 left-4 h-[21px] w-4 -translate-y-1/2" />
        <input
          ref={ref}
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          className={cn(
            'w-full rounded-lg border border-border-muted bg-bg-soft px-10 py-[13px] text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green',
            error && 'border-[#BA1A1A] outline-2 outline-[#BA1A1A]',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-badge-neutral"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={visible ? 'visible' : 'hidden'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {visible ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      {error && <p className="text-sm text-[#BA1A1A]">{error}</p>}
    </div>
  )
})

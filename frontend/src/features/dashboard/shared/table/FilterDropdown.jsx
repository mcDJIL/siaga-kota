import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../../../lib/cn'

export function FilterDropdown({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-2 rounded-lg bg-bg-blue-soft px-4 py-2 text-sm text-text-body"
        >
          {selected?.label}
          <ChevronDown className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Tutup pilihan filter"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsOpen(false)}
              />
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute left-0 z-50 mt-2 w-40 rounded-lg border border-border-muted/40 bg-white p-1 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
              >
                {options.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option.value === value}
                      onClick={() => {
                        onChange(option.value)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'w-full rounded-md px-3 py-2 text-left text-sm text-text-body hover:bg-bg-soft',
                        option.value === value && 'bg-bg-blue-soft font-semibold'
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

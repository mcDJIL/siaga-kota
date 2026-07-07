import { cn } from '../../../lib/cn'

export function QuizOption({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-colors',
        selected
          ? 'border-brand-green bg-brand-green-light/30 text-brand-green-dark'
          : 'border-border-muted text-text-body hover:border-brand-green/50'
      )}
    >
      {label}
    </button>
  )
}

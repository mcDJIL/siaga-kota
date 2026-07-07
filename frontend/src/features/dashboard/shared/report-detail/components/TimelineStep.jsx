import { Check } from 'lucide-react'
import { cn } from '../../../../../lib/cn'

export function TimelineStep({ step }) {
  const isCompleted = step.status === 'completed'
  const isCurrent = step.status === 'current'

  return (
    <li className="flex items-start gap-4">
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isCompleted && 'bg-brand-green',
          isCurrent && 'border-4 border-white bg-brand-green-lighter shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]',
          !isCompleted && !isCurrent && 'bg-bg-blue-lighter'
        )}
      >
        {isCompleted && <Check className="h-2.5 w-2 text-white" aria-hidden="true" />}
        {isCurrent && <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden="true" />}
        {!isCompleted && !isCurrent && <span className="h-2 w-2 rounded-full bg-badge-neutral" aria-hidden="true" />}
      </span>

      <div className="flex flex-col">
        <p
          className={cn(
            'text-base font-bold',
            isCompleted && 'text-text-body',
            isCurrent && 'text-brand-green',
            !isCompleted && !isCurrent && 'text-badge-neutral'
          )}
        >
          {step.title}
        </p>
        <p className="text-xs text-badge-neutral">{step.description}</p>
      </div>
    </li>
  )
}

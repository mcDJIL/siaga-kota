import { cn } from '../../../../../lib/cn'

const PRIORITY_STYLES = {
  high: 'bg-[#FFDAD6] text-[#93000A]',
  medium: 'bg-[#FFE17C] text-[#231B00]',
  low: 'bg-bg-blue-light text-text-muted',
}

const PRIORITY_LABELS = {
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-[0.5px] uppercase',
        PRIORITY_STYLES[priority]
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}

import { cn } from '../../../../lib/cn'

const STATUS_STYLES = {
  baru: 'bg-navy/10 text-navy',
  diproses: 'bg-brand-green/10 text-brand-green',
  selesai: 'bg-text-muted/10 text-text-muted',
}

const STATUS_LABELS = {
  baru: 'Baru',
  diproses: 'Diproses',
  selesai: 'Selesai',
}

export function StatusBadge({ status }) {
  return (
    <span className={cn('inline-flex w-fit items-center rounded-full px-2 py-0.5 text-base', STATUS_STYLES[status])}>
      {STATUS_LABELS[status]}
    </span>
  )
}

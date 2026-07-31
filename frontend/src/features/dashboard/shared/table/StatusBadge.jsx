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
  const style = STATUS_STYLES[status] || 'bg-text-muted/10 text-text-muted'
  const label = STATUS_LABELS[status] || (status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown')

  return (
    <span className={cn('inline-flex w-fit items-center rounded-full px-2 py-0.5 text-base', style)}>
      {label}
    </span>
  )
}

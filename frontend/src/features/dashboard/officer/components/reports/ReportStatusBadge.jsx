import { cn } from '../../../../../lib/cn'

const STATUS_STYLES = {
  pending: { dot: 'bg-badge-neutral', text: 'text-text-muted' },
  processing: { dot: 'bg-[#715C00]', text: 'text-[#715C00]' },
  completed: { dot: 'bg-brand-green', text: 'text-brand-green' },
  rejected: { dot: 'bg-[#BA1A1A]', text: 'text-[#BA1A1A]' },
}

const STATUS_LABELS = {
  pending: 'Menunggu',
  processing: 'Sedang Diproses',
  completed: 'Selesai',
  rejected: 'Ditolak',
}

export function ReportStatusBadge({ status }) {
  const styles = STATUS_STYLES[status]

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px]', styles.text)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}

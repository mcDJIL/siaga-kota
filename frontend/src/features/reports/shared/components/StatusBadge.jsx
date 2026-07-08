import { cn } from '../../../../lib/cn'

const STATUS_META = {
  pending: { label: 'Menunggu', bg: 'bg-[#FFDAD6]', text: 'text-[#93000A]', dot: 'bg-[#93000A]' },
  verification: { label: 'Verifikasi', bg: 'bg-[#C9A82C]/20', text: 'text-[#715C00]', dot: 'bg-[#715C00]' },
  in_progress: { label: 'Sedang Ditangani', bg: 'bg-brand-green-light', text: 'text-brand-green-dark', dot: 'bg-[#006D40]' },
  completed: { label: 'Selesai', bg: 'bg-bg-blue-lighter', text: 'text-text-muted', dot: 'bg-badge-neutral' },
  rejected: { label: 'Ditolak', bg: 'bg-[#FFB4AB]', text: 'text-[#690005]', dot: 'bg-[#690005]' },
}

export function StatusBadge({ status, className }) {
  const meta = STATUS_META[status] ?? STATUS_META.pending

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.6px]',
        meta.bg,
        meta.text,
        className
      )}
    >
      <span className={cn('h-2 w-2 shrink-0 rounded-full', meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  )
}

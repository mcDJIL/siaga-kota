import { cn } from '../../../../lib/cn'

export const REPORT_STATUS_STYLES = {
  pending: { bg: 'bg-[#FFDAD6]', text: 'text-[#93000A]', label: 'Menunggu' },
  processing: { bg: 'bg-[#FFE17C]', text: 'text-[#231B00]', label: 'Diproses' },
  completed: { bg: 'bg-brand-green-light', text: 'text-brand-green-dark', label: 'Selesai' },
  rejected: { bg: 'bg-[#FFB4AB]', text: 'text-[#690005]', label: 'Ditolak' },
}

export function StatusBadge({ status, className }) {
  const style = REPORT_STATUS_STYLES[status]

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center justify-center rounded-full px-3 py-0.5 text-[10px] font-bold tracking-[0.5px] uppercase',
        style.bg,
        style.text,
        className
      )}
    >
      {style.label}
    </span>
  )
}

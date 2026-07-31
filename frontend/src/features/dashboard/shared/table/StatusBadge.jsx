import { cn } from '../../../../lib/cn'

const STATUS_STYLES = {
  menunggu: 'bg-amber-50 text-amber-700 border border-amber-200',
  diverifikasi: 'bg-blue-50 text-blue-700 border border-blue-200',
  diproses: 'bg-blue-100 text-blue-700 border border-blue-300',
  selesai: 'bg-green-100 text-green-700 border border-green-300',
  ditolak: 'bg-red-100 text-red-700 border border-red-300',
  baru: 'bg-navy/10 text-navy',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  verification: 'bg-blue-50 text-blue-700 border border-blue-200',
  in_progress: 'bg-blue-100 text-blue-700 border border-blue-300',
  completed: 'bg-green-100 text-green-700 border border-green-300',
  rejected: 'bg-red-100 text-red-700 border border-red-300',
}

const STATUS_LABELS = {
  menunggu: 'Menunggu',
  diverifikasi: 'Diverifikasi',
  diproses: 'Diproses',
  selesai: 'Selesai',
  ditolak: 'Ditolak',
  baru: 'Baru',
  pending: 'Menunggu',
  verification: 'Diverifikasi',
  in_progress: 'Diproses',
  completed: 'Selesai',
  rejected: 'Ditolak',
}

export function StatusBadge({ status }) {
  const statusValue = typeof status === 'object' ? status?.value : status
  const style = STATUS_STYLES[statusValue] || 'bg-text-muted/10 text-text-muted border border-text-muted/20'
  const label = STATUS_LABELS[statusValue] || (statusValue ? statusValue.charAt(0).toUpperCase() + statusValue.slice(1) : 'Unknown')

  return (
    <span className={cn('inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium', style)}>
      {label}
    </span>
  )
}

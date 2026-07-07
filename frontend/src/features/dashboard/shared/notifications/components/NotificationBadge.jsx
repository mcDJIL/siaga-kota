import { cn } from '../../../../../lib/cn'

const COLOR_MAP = {
  alert: 'text-[#BA1A1A]',
  'new-report': 'text-[#007243]',
  system: 'text-navy',
  maintenance: 'text-[#4D3E00]',
}

const LABEL_MAP = {
  alert: 'Alert',
  'new-report': 'Laporan Baru',
  system: 'Sistem',
  maintenance: 'Maintenance',
}

export function NotificationBadge({ type }) {
  return (
    <span className={cn('text-xs font-semibold tracking-[0.6px] uppercase', COLOR_MAP[type] ?? 'text-text-muted')}>
      {LABEL_MAP[type] ?? 'Notifikasi'}
    </span>
  )
}

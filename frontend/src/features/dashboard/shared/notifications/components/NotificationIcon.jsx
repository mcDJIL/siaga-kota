import { AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react'
import { cn } from '../../../../../lib/cn'

const ICON_MAP = {
  alert: { icon: AlertTriangle, bg: 'bg-[#FFDAD6]', color: 'text-[#BA1A1A]' },
  'new-report': { icon: FileText, bg: 'bg-brand-green-light', color: 'text-[#007243]' },
  system: { icon: CheckCircle2, bg: 'bg-bg-blue-lighter', color: 'text-navy' },
  maintenance: { icon: Clock, bg: 'bg-[#FFE17C]', color: 'text-[#4D3E00]' },
}

export function NotificationIcon({ type, className }) {
  const config = ICON_MAP[type] ?? ICON_MAP.system
  const Icon = config.icon

  return (
    <div
      className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full', config.bg, className)}
      aria-hidden="true"
    >
      <Icon className={cn('h-5 w-5', config.color)} />
    </div>
  )
}

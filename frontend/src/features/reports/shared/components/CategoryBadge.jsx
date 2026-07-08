import { Droplet, Waves, Construction, AlertTriangle, Trash2 } from 'lucide-react'
import { cn } from '../../../../lib/cn'

const CATEGORY_META = {
  sampah: { label: 'Sampah', icon: Trash2, color: 'text-[#BA1A1A]' },
  banjir: { label: 'Banjir', icon: Waves, color: 'text-navy-light' },
  drainase: { label: 'Drainase', icon: Droplet, color: 'text-[#715C00]' },
  infrastruktur: { label: 'Infrastruktur', icon: Construction, color: 'text-navy' },
  darurat: { label: 'Darurat', icon: AlertTriangle, color: 'text-[#BA1A1A]' },
}

export function CategoryBadge({ category, className }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.sampah
  const Icon = meta.icon

  return (
    <span className={cn('inline-flex items-center gap-2 text-base text-text-body', className)}>
      <Icon className={cn('h-4 w-4 shrink-0', meta.color)} aria-hidden="true" />
      {meta.label}
    </span>
  )
}

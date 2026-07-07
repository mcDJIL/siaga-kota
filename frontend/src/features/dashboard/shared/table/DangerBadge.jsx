import { cn } from '../../../../lib/cn'

const DANGER_STYLES = {
  tinggi: 'rounded-full bg-[#BA1A1A]/10 px-2 py-0.5 text-[#BA1A1A]',
  sedang: 'rounded-full bg-badge-gold/10 px-2 py-0.5 text-[#4D3E00]',
  rendah: 'text-[#2D476F]',
}

const DANGER_LABELS = {
  tinggi: 'Tinggi',
  sedang: 'Sedang',
  rendah: 'Rendah',
}

export function DangerBadge({ level }) {
  return <span className={cn('inline-flex w-fit items-center text-base', DANGER_STYLES[level])}>{DANGER_LABELS[level]}</span>
}

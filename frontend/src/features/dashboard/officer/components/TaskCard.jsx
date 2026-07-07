import { motion } from 'framer-motion'
import { Eye, MapPin } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'
import { cn } from '../../../../lib/cn'

const PRIORITY_STYLES = {
  urgent: {
    border: 'border-[#BA1A1A]/30',
    bg: 'bg-[#FFDAD6]/10',
    badgeBg: 'bg-[#FEE2E2]',
    badgeText: 'text-[#991B1B]',
    label: 'Sangat Mendesak',
    opacity: '',
  },
  high: {
    border: 'border-border-muted',
    bg: 'bg-white',
    badgeBg: 'bg-[#FFEDD5]',
    badgeText: 'text-[#9A3412]',
    label: 'Prioritas Tinggi',
    opacity: '',
  },
  medium: {
    border: 'border-border-muted',
    bg: 'bg-white',
    badgeBg: 'bg-[#FEF9C3]',
    badgeText: 'text-[#854D0E]',
    label: 'Menengah',
    opacity: 'opacity-80',
  },
}

export function TaskCard({ task, isSelected, onSelect, onDispatch, onViewDetail }) {
  const styles = PRIORITY_STYLES[task.priority]

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex cursor-pointer flex-col gap-2 rounded-xl border p-4',
        styles.border,
        styles.bg,
        styles.opacity,
        isSelected && 'ring-2 ring-navy'
      )}
      onClick={() => onSelect(task.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            'rounded px-2 py-0.5 text-[10px] font-bold tracking-[0.5px] uppercase',
            styles.badgeBg,
            styles.badgeText
          )}
        >
          {styles.label}
        </span>
        <span className="text-[10px] font-medium text-text-muted">{task.reportedAt}</span>
      </div>

      <h4 className="text-sm font-bold text-text-body">{task.title}</h4>
      <p className="text-xs text-text-muted">{task.description}</p>

      <div className="flex items-center gap-2 pt-1">
        <MapPin className="h-2.5 w-2.5 shrink-0 text-navy" aria-hidden="true" />
        <span className="text-[11px] font-medium text-text-muted">{task.location}</span>
      </div>

      <div className="flex items-start gap-2 pt-1">
        <Button
          type="button"
          variant="navy"
          onClick={(event) => {
            event.stopPropagation()
            onDispatch(task.id)
          }}
          className="h-8 flex-1 rounded-lg py-0 text-[11px] font-bold"
        >
          Kirim Petugas
        </Button>
        <button
          type="button"
          aria-label={`Lihat detail laporan ${task.title}`}
          onClick={(event) => {
            event.stopPropagation()
            onViewDetail(task)
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-muted text-text-body"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}

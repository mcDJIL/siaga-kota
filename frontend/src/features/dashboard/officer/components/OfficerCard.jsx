import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'

const STATUS_STYLES = {
  tersedia: 'bg-brand-green/10 text-brand-green',
  bertugas: 'bg-badge-gold/10 text-[#4D3E00]',
}

const STATUS_LABELS = {
  tersedia: 'Tersedia',
  bertugas: 'Bertugas',
}

export function OfficerCard({ officer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 rounded-xl border border-border-muted p-4"
    >
      <img src={officer.avatar} alt={officer.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-bold text-navy">{officer.name}</span>
          <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', STATUS_STYLES[officer.status])}>
            {STATUS_LABELS[officer.status]}
          </span>
        </div>
        <span className="truncate text-xs text-text-muted">{officer.currentTask ?? 'Tidak ada tugas aktif'}</span>
        <span className="text-xs text-badge-neutral">{officer.distance} dari lokasi</span>
      </div>
    </motion.div>
  )
}

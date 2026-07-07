import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'

export function ReportPreviewCard({ report, onLoginClick }) {
  if (!report) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pointer-events-auto absolute top-24 left-4 z-10 w-64 rounded-xl border border-border-muted bg-white p-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] sm:top-28 sm:left-6"
    >
      <span
        className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-r border-b border-border-muted bg-white"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xl leading-6 font-semibold text-navy">{report.title}</h4>
        <Badge variant="success">{report.status}</Badge>
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-text-muted">
        <Clock size={12} />
        {report.timestamp}
      </div>
      <div className="mt-2 h-[113px] overflow-hidden rounded-lg bg-bg-blue-light">
        <img src={report.image} alt={report.title} className="h-full w-full object-cover" />
      </div>
      <Button
        variant="navy"
        size="sm"
        className="mt-3 w-full"
        onClick={onLoginClick}
        aria-label="Login untuk melihat detail laporan"
      >
        Login untuk Detail
      </Button>
    </motion.div>
  )
}

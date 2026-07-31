import { motion } from 'framer-motion'
import { Printer, Siren } from 'lucide-react'
import { Badge } from '../../../../../components/ui/Badge'
import { Button } from '../../../../../components/ui/Button'
import { cn } from '../../../../../lib/cn'
import { EmergencyBadge } from './EmergencyBadge'

export function ReportHeader({ reportId, categoryLabel, isEmergency, onToggleEmergency, onPrint, isLoading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:hidden"
    >
      <div className="flex flex-col gap-2">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 break-words text-base text-badge-neutral">
          <span>Laporan</span>
          <span aria-hidden="true">/</span>
          <span>{categoryLabel}</span>
          <span aria-hidden="true">/</span>
          <span className="text-navy">#{reportId}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-base font-normal text-brand-green sm:text-lg">
            Detail Laporan #{reportId}
          </h1>
          <Badge variant="success" className="rounded-full px-3 py-1 text-sm normal-case">
            {categoryLabel}
          </Badge>
          {isEmergency && <EmergencyBadge />}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onPrint}
          disabled={isLoading}
          className="border border-badge-neutral px-4 py-2 text-base text-text-muted hover:bg-transparent disabled:opacity-50"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Cetak Laporan
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onToggleEmergency}
          disabled={isLoading}
          className={cn(
            'px-4 py-2 text-base text-white disabled:opacity-50',
            isEmergency ? 'bg-badge-neutral hover:bg-text-muted' : 'bg-[#BA1A1A] hover:bg-[#93000A]'
          )}
        >
          <Siren className="h-4 w-4" aria-hidden="true" />
          {isEmergency ? 'Tandai Normal' : 'Tandai Darurat'}
        </Button>
      </div>
    </motion.div>
  )
}

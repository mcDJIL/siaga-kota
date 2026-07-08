import { Image as ImageIcon, MapPin, Sparkles, User } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { cn } from '../../../../../lib/cn'
import { TimelineStep } from '../../../../dashboard/shared/report-detail/components/TimelineStep'

const STATUS_STYLES = {
  'menunggu-verifikasi': { label: 'Menunggu Verifikasi', className: 'bg-[#FFDAD6] text-[#93000A]' },
  terverifikasi: { label: 'Terverifikasi', className: 'bg-badge-gold/30 text-[#715C00]' },
  selesai: { label: 'Selesai', className: 'bg-bg-blue-lighter text-navy' },
  ditolak: { label: 'Ditolak', className: 'bg-[#FFB4AB] text-[#690005]' },
  'perlu-tindak-lanjut': { label: 'Perlu Tindak Lanjut', className: 'bg-[#FFE17C] text-[#7A4100]' },
}

export function FloodReportDetailModal({ report, isOpen, onClose }) {
  if (!report) return null
  const status = STATUS_STYLES[report.status]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${report.id} · ${report.severity}`} className="max-w-lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              Pelapor
            </span>
            <span className="text-sm font-bold text-text-body">{report.reporter}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Koordinat
            </span>
            <span className="text-sm font-bold text-text-body">{report.coordinates}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Alamat</span>
          <span className="text-sm text-text-body">{report.address}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Tinggi Air</span>
            <span className="text-sm font-bold text-text-body">{report.waterLevel} cm</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Tingkat Keparahan</span>
            <span className="text-sm font-bold text-text-body">{report.severity}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Deskripsi</span>
          <p className="text-sm text-text-body">{report.description}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Foto</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: report.photos }, (_, index) => (
              <div key={index} className="flex aspect-square items-center justify-center rounded-lg bg-bg-blue-light">
                <ImageIcon className="h-6 w-6 text-navy-lighter" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Timeline</h3>
          <ul className="flex flex-col gap-4">
            {report.timeline.map((step) => (
              <TimelineStep key={step.title} step={step} />
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-navy/20 bg-navy/5 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-[0.6px] text-navy uppercase">Prediksi AI</span>
            <span className="text-sm text-text-body">{report.aiPrediction}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Instansi Terkait</span>
            <span className="text-sm font-bold text-text-body">{report.assignedDepartment}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Status Saat Ini</span>
            <span className={cn('inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>
              {status.label}
            </span>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={onClose} className="self-end border border-border-muted">
          Tutup
        </Button>
      </div>
    </Modal>
  )
}

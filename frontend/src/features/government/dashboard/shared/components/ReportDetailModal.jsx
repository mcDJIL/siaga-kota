import { Image as ImageIcon, MapPin, User } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { TimelineStep } from '../../../../dashboard/shared/report-detail/components/TimelineStep'

export function ReportDetailModal({ report, isOpen, onClose }) {
  if (!report) return null

  const statusTimeline = Array.isArray(report.statusTimeline) ? report.statusTimeline : []
  const photoCount = Math.max(0, Number(report.photos) || 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${report.id} · ${report.typeLabel}`} className="max-w-lg">
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
              Lokasi
            </span>
            <span className="text-sm font-bold text-text-body">{report.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Kategori</span>
          <span className="text-sm font-medium text-text-body">{report.category}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Deskripsi</span>
          <p className="text-sm text-text-body">{report.description}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Status Timeline</h3>
          <ul className="flex flex-col gap-4">
            {statusTimeline.map((step) => (
              <TimelineStep key={step.title} step={step} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Foto Kejadian</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: photoCount }, (_, index) => (
              <div
                key={index}
                className="flex aspect-square items-center justify-center rounded-lg bg-bg-blue-light"
              >
                <ImageIcon className="h-6 w-6 text-navy-lighter" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Instansi Terkait</span>
          <span className="text-sm font-bold text-text-body">{report.assignedDepartment}</span>
        </div>

        <Button variant="ghost" size="sm" onClick={onClose} className="self-end border border-border-muted">
          Tutup
        </Button>
      </div>
    </Modal>
  )
}

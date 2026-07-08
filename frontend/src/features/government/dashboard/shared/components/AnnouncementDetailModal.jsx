import { FileText } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { Badge } from '../../../../../components/ui/Badge'

const PRIORITY_VARIANT = {
  urgent: 'danger',
  normal: 'success',
  info: 'neutral',
}

const PRIORITY_LABEL = {
  urgent: 'Mendesak',
  normal: 'Normal',
  info: 'Informasi',
}

export function AnnouncementDetailModal({ announcement, isOpen, onClose }) {
  if (!announcement) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={announcement.title} className="max-w-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Badge variant={PRIORITY_VARIANT[announcement.priority]}>{PRIORITY_LABEL[announcement.priority]}</Badge>
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{announcement.publishDate}</span>
        </div>

        <p className="text-sm text-text-body">{announcement.fullContent}</p>

        <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Penulis</span>
          <span className="text-sm font-bold text-text-body">{announcement.author}</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border-muted px-4 py-3">
          <FileText className="h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-body">{announcement.attachment.name}</span>
            <span className="text-xs text-text-muted">{announcement.attachment.size}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

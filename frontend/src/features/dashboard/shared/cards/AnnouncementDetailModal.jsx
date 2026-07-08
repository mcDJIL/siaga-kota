import { Modal } from '../../../../components/ui/Modal'

const PRIORITY_LABELS = {
  danger: 'Peringatan',
  info: 'Informasi',
  success: 'Program',
}

export function AnnouncementDetailModal({ announcement, onClose }) {
  return (
    <Modal isOpen={Boolean(announcement)} onClose={onClose} title={announcement?.title}>
      {announcement && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
            {PRIORITY_LABELS[announcement.priority]} &middot; {announcement.source}
          </span>
          <p className="text-sm leading-relaxed text-text-body">{announcement.fullDescription}</p>
        </div>
      )}
    </Modal>
  )
}

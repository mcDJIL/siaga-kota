import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'

export function DeleteAnnouncementModal({ announcement, onClose, onConfirm }) {
  return (
    <Modal isOpen={Boolean(announcement)} onClose={onClose} title="Hapus Pengumuman" className="max-w-sm">
      {announcement && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">
            Apakah Anda yakin ingin menghapus pengumuman{' '}
            <span className="font-semibold text-text-body">{announcement.title}</span>? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Batal
            </Button>
            <Button size="sm" onClick={() => onConfirm(announcement.id)} className="bg-[#BA1A1A] text-white hover:bg-[#93000A]">
              Hapus
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'

export function DeleteUserModal({ user, onClose, onConfirm }) {
  return (
    <Modal isOpen={Boolean(user)} onClose={onClose} title="Hapus Pengguna" className="max-w-sm">
      {user && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">
            Apakah Anda yakin ingin menghapus <span className="font-semibold text-text-body">{user.name}</span>? Tindakan ini
            tidak dapat dibatalkan.
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Batal
            </Button>
            <Button
              size="sm"
              onClick={() => onConfirm(user.id)}
              className="bg-[#BA1A1A] text-white hover:bg-[#93000A]"
            >
              Hapus
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

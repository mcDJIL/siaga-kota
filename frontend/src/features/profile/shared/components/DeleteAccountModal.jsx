import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/Button'
import { DELETE_ACCOUNT_CONFIRMATION_WORD } from '../utils/profileValidation'

export function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [confirmationText, setConfirmationText] = useState('')
  const isConfirmed = confirmationText.trim().toUpperCase() === DELETE_ACCOUNT_CONFIRMATION_WORD

  function handleClose() {
    setConfirmationText('')
    onClose()
  }

  function handleConfirm() {
    onConfirm()
    setConfirmationText('')
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Hapus Akun">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          Tindakan ini akan menghapus seluruh data akun, riwayat laporan, dan poin secara permanen. Tindakan ini tidak
          dapat dibatalkan.
        </p>

        <div className="flex flex-col gap-1">
          <label htmlFor="delete-confirmation" className="text-sm font-medium text-text-muted">
            Ketik <span className="font-bold text-[#BA1A1A]">{DELETE_ACCOUNT_CONFIRMATION_WORD}</span> untuk melanjutkan
          </label>
          <Input
            id="delete-confirmation"
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            placeholder={DELETE_ACCOUNT_CONFIRMATION_WORD}
            aria-describedby="delete-confirmation-hint"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse">
          <Button
            type="button"
            variant="navy"
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className="bg-[#BA1A1A] hover:bg-[#93000A] disabled:opacity-40 sm:flex-1"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Account
          </Button>
          <Button type="button" variant="ghost" onClick={handleClose} className="text-text-muted sm:flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { Modal } from '../../../../../components/ui/Modal'
import { Loader2 } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'

export function VerifyConfirmationModal({ report, onClose, onConfirm, isLoading = false }) {
  return (
    <Modal isOpen={Boolean(report)} onClose={onClose} title="Konfirmasi Verifikasi">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-body">
          Verifikasi laporan <span className="font-bold">{report?.code || report?.id}</span> di{' '}
          <span className="font-bold">{report?.location}</span>?
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose} className="border border-border-muted" disabled={isLoading}>
            Batal
          </Button>
          <Button variant="navy" size="sm" onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isLoading ? 'Memverifikasi...' : 'Approve'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

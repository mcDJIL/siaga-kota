import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '../../../../../../components/ui/Modal'
import { Button } from '../../../../../../components/ui/Button'

export function ReportSuccessDialog({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Laporan Terkirim" className="items-center text-center">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-light">
          <CheckCircle2 className="h-8 w-8 text-brand-green-dark" aria-hidden="true" />
        </span>
        <p className="text-base text-text-muted">
          Laporan tumpukan sampah Anda berhasil dikirim dan akan segera diverifikasi oleh petugas.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Button variant="ghost" className="flex-1" onClick={() => navigate('/citizen/reports')}>
            Lihat Laporan
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => navigate('/citizen/dashboard')}>
            Dashboard
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { Button } from '../../../../components/ui/Button'

export function ReportSuccessDialog({
  isOpen,
  onClose,
  title = 'Laporan Terkirim',
  message,
  primaryLabel = 'Lihat Riwayat',
  onPrimaryClick,
  historyHref = '/citizen/reports',
  secondaryLabel = 'Dashboard',
  onSecondaryClick,
  dashboardHref = '/citizen/dashboard',
}) {
  const navigate = useNavigate()

  function handlePrimaryClick() {
    if (onPrimaryClick) {
      onPrimaryClick()
      return
    }
    navigate(historyHref)
  }

  function handleSecondaryClick() {
    if (onSecondaryClick) {
      onSecondaryClick()
      return
    }
    navigate(dashboardHref)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="items-center text-center">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-light">
          <CheckCircle2 className="h-8 w-8 text-brand-green-dark" aria-hidden="true" />
        </span>
        <p className="text-base text-text-muted">{message}</p>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Button variant="ghost" className="flex-1" onClick={handlePrimaryClick}>
            {primaryLabel}
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleSecondaryClick}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

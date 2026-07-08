import { Modal } from '../../../../components/ui/Modal'
import { HistoryTable } from './HistoryTable'

export function RewardHistoryModal({ isOpen, onClose, ...historyProps }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Riwayat Poin" className="max-w-2xl">
      <HistoryTable {...historyProps} />
    </Modal>
  )
}

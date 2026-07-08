import { Modal } from '../../../../components/ui/Modal'
import { Button } from '../../../../components/ui/Button'
import { RewardGrid } from './RewardGrid'
import { formatPoints } from '../utils/pointFormatter'

export function RedeemRewardModal({ isOpen, onClose, rewards, totalXp, pendingReward, onRequestRedeem, onCancelRedeem, onConfirmRedeem }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Tukar Poin dengan Reward" className="max-w-2xl">
        <p className="text-sm text-text-muted">
          Saldo XP kamu saat ini: <span className="font-bold text-navy">{formatPoints(totalXp)} XP</span>
        </p>
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          <RewardGrid rewards={rewards} totalXp={totalXp} onRedeem={onRequestRedeem} />
        </div>
      </Modal>

      <Modal isOpen={Boolean(pendingReward)} onClose={onCancelRedeem} title="Konfirmasi Penukaran" className="max-w-sm">
        {pendingReward && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-base text-text-muted">
              Tukar <span className="font-bold text-navy">{pendingReward.name}</span> dengan{' '}
              <span className="font-bold text-navy">{formatPoints(pendingReward.requiredXp)} XP</span>?
            </p>
            <div className="flex w-full gap-3">
              <Button variant="ghost" className="flex-1" onClick={onCancelRedeem}>
                Batal
              </Button>
              <Button variant="primary" className="flex-1" onClick={onConfirmRedeem}>
                Konfirmasi
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

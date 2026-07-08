import { Lock, CheckCircle2 } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'
import { BadgeCard } from './BadgeCard'
import { formatPoints } from '../utils/pointFormatter'

export function BadgeCollectionModal({ isOpen, onClose, badge }) {
  if (!badge) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={badge.name} className="max-w-sm items-center text-center">
      <div className="flex flex-col items-center gap-4">
        <BadgeCard badge={badge} size="lg" />

        <p className="text-sm text-text-muted">{badge.description}</p>

        <div className="flex w-full flex-col gap-3 rounded-xl bg-bg-blue-soft p-4 text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Syarat</p>
            <p className="text-sm text-navy">{badge.requirement}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Reward XP</p>
            <p className="text-sm font-bold text-brand-green-dark">+{formatPoints(badge.rewardXp)} XP</p>
          </div>
          <div className="flex items-center gap-2">
            {badge.earned ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-brand-green-dark" aria-hidden="true" />
                <span className="text-sm text-navy">Diperoleh pada {badge.earnDate}</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 text-badge-neutral" aria-hidden="true" />
                <span className="text-sm text-text-muted">Progres: {badge.progress}%</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

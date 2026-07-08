import { RewardCard } from './RewardCard'

export function RewardGrid({ rewards, totalXp, onRedeem }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} canAfford={totalXp >= reward.requiredXp} onRedeem={onRedeem} />
      ))}
    </div>
  )
}

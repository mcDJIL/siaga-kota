import { useState } from 'react'
import { toast } from 'sonner'
import { rewardData } from '../../citizen/gamification/data/rewardData'

export function useRewards(totalXp, onXpChange) {
  const [rewards, setRewards] = useState(rewardData)
  const [pendingReward, setPendingReward] = useState(null)

  function requestRedeem(reward) {
    if (reward.stock <= 0) return
    if (totalXp < reward.requiredXp) {
      toast.error('XP Anda belum mencukupi.')
      return
    }
    setPendingReward(reward)
  }

  function cancelRedeem() {
    setPendingReward(null)
  }

  function confirmRedeem() {
    if (!pendingReward) return

    setRewards((prev) =>
      prev.map((reward) => (reward.id === pendingReward.id ? { ...reward, stock: reward.stock - 1 } : reward))
    )
    onXpChange(totalXp - pendingReward.requiredXp)
    toast.success('Reward berhasil ditukar.')
    setPendingReward(null)
  }

  return { rewards, pendingReward, requestRedeem, cancelRedeem, confirmRedeem }
}

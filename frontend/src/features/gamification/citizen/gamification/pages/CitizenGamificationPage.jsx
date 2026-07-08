import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { PointCard } from '../../../shared/components/PointCard'
import { ProgressCard } from '../../../shared/components/ProgressCard'
import { BadgeGrid } from '../../../shared/components/BadgeGrid'
import { LeaderboardTable } from '../../../shared/components/LeaderboardTable'
import { RedeemRewardModal } from '../../../shared/components/RedeemRewardModal'
import { RewardHistoryModal } from '../../../shared/components/RewardHistoryModal'
import { BadgeCollectionModal } from '../../../shared/components/BadgeCollectionModal'
import { useLeaderboard } from '../../../shared/hooks/useLeaderboard'
import { useRewardHistory } from '../../../shared/hooks/useRewardHistory'
import { useRewards } from '../../../shared/hooks/useRewards'
import { PointActivityCards } from '../components/PointActivityCards'
import { DetailRegionModal } from '../components/DetailRegionModal'
import { badgeData } from '../data/badgeData'

const TREE_TARGET_XP = 5000
const TREE_CURRENT_XP = 4200
const TREE_NUMBER = 14

export function CitizenGamificationPage() {
  const navigate = useNavigate()
  const [totalXp, setTotalXp] = useState(12450)
  const [isRedeemOpen, setIsRedeemOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const leaderboard = useLeaderboard()
  const history = useRewardHistory()
  const { rewards, pendingReward, requestRedeem, cancelRedeem, confirmRedeem } = useRewards(totalXp, setTotalXp)

  const earnedBadges = badgeData.filter((badge) => badge.earned)
  const badgePreview = badgeData.slice(0, 6)
  const remainingForNextLevel = Math.max(0, 5 - earnedBadges.length)

  function handleOpenHistory() {
    setIsHistoryOpen(true)
    toast.success('Riwayat berhasil dimuat.')
  }

  function handleBadgeClick(badge) {
    setSelectedBadge(badge)
    toast.success('Detail badge dibuka.')
  }

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <PointCard totalXp={totalXp} onRedeemClick={() => setIsRedeemOpen(true)} onHistoryClick={handleOpenHistory} />
        <ProgressCard
          treeNumber={TREE_NUMBER}
          currentXp={TREE_CURRENT_XP}
          targetXp={TREE_TARGET_XP}
          description="Setiap 5.000 XP yang dikumpulkan oleh warga RW 05 akan dikonversi menjadi satu pohon mahoni yang ditanam oleh pemkot."
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <h3 className="font-display text-2xl font-semibold text-navy">Cara Dapatkan Poin</h3>
          <PointActivityCards />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-6 rounded-3xl border border-border-muted/30 bg-white p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-navy">Koleksi Badge</h3>
            <button
              type="button"
              onClick={() => navigate('/citizen/gamification/badges')}
              className="text-base text-navy hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <BadgeGrid badges={badgePreview} onBadgeClick={handleBadgeClick} />

          <div className="rounded-2xl bg-bg-blue-soft px-4 py-6 text-center">
            <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">
              Dapatkan {remainingForNextLevel} badge lagi untuk membuka level{' '}
              <span className="text-brand-green-dark">Nature Protector</span>
            </p>
          </div>
        </motion.div>
      </div>

      <LeaderboardTable
        activeTab={leaderboard.activeTab}
        onChangeTab={leaderboard.changeTab}
        rows={leaderboard.rows}
        hasMore={leaderboard.hasMore}
        showAll={leaderboard.showAll}
        onToggleShowAll={() => leaderboard.setShowAll((prev) => !prev)}
        onViewDetail={setSelectedRegion}
      />

      <RedeemRewardModal
        isOpen={isRedeemOpen}
        onClose={() => setIsRedeemOpen(false)}
        rewards={rewards}
        totalXp={totalXp}
        pendingReward={pendingReward}
        onRequestRedeem={requestRedeem}
        onCancelRedeem={cancelRedeem}
        onConfirmRedeem={confirmRedeem}
      />

      <RewardHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} {...history} />

      <BadgeCollectionModal isOpen={Boolean(selectedBadge)} onClose={() => setSelectedBadge(null)} badge={selectedBadge} />

      <DetailRegionModal isOpen={Boolean(selectedRegion)} onClose={() => setSelectedRegion(null)} region={selectedRegion} />
    </div>
  )
}

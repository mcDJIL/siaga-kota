import { useMemo, useState } from 'react'
import { leaderboardDataByTab } from '../../citizen/gamification/data/leaderboardData'

export const LEADERBOARD_TABS = [
  { id: 'rw', label: 'Tingkat RW' },
  { id: 'kelurahan', label: 'Tingkat Kelurahan' },
]

export function useLeaderboard() {
  const [activeTab, setActiveTab] = useState('rw')
  const [showAll, setShowAll] = useState(false)

  const rows = useMemo(() => leaderboardDataByTab[activeTab] ?? [], [activeTab])
  const visibleRows = showAll ? rows : rows.slice(0, 3)

  function changeTab(tabId) {
    setActiveTab(tabId)
    setShowAll(false)
  }

  return { activeTab, changeTab, rows: visibleRows, hasMore: rows.length > 3, showAll, setShowAll }
}

import { motion } from 'framer-motion'
import { TreePine, ChevronDown } from 'lucide-react'
import { LEADERBOARD_TABS } from '../hooks/useLeaderboard'
import { formatPoints } from '../utils/pointFormatter'

const RANK_BG = { 1: 'bg-[#FFE17C] text-[#231B00]', 2: 'bg-brand-green-light text-[#002110]', 3: 'bg-[#DCE9FF] text-[#0B1C30]' }

export function LeaderboardTable({ activeTab, onChangeTab, rows, hasMore, showAll, onToggleShowAll, onViewDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col overflow-hidden rounded-3xl border border-border-muted/30 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-col gap-4 border-b border-border-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h3 className="font-display text-2xl font-semibold text-navy">Leaderboard Wilayah</h3>
          <p className="text-base text-text-muted">Persaingan antar RW dalam upaya mitigasi bencana kota.</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-bg-blue-soft p-1" role="tablist" aria-label="Filter tingkat wilayah">
          {LEADERBOARD_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTab}
              onClick={() => onChangeTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-base transition-colors ${
                tab.id === activeTab ? 'bg-white text-navy shadow-sm' : 'text-text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              {['Peringkat', 'Wilayah', 'Total Poin', 'Pohon Ditanam', 'Aksi'].map((column) => (
                <th key={column} scope="col" className="px-6 py-4 text-sm font-bold tracking-[0.8px] text-text-muted uppercase sm:px-8">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.region}
                className={`border-t border-border-muted/10 ${row.isCurrentUnit ? 'bg-brand-green-light/10' : ''}`}
              >
                <td className="px-6 py-6 sm:px-8">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-base font-bold ${
                      RANK_BG[row.rank] ?? 'bg-bg-blue-light text-text-body'
                    }`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="px-6 py-6 sm:px-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light">
                      <TreePine className="h-[18px] w-[18px] text-brand-green" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-navy">{row.region}</span>
                      {row.isCurrentUnit && (
                        <span className="w-fit rounded-full bg-brand-green px-2 py-0.5 text-[10px] tracking-[0.5px] text-white uppercase">
                          Unit Kamu
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-base text-navy sm:px-8">{formatPoints(row.points)} XP</td>
                <td className="px-6 py-6 sm:px-8">
                  <span className="flex items-center gap-2 text-base text-text-muted">
                    <TreePine className="h-3 w-3 text-brand-green" aria-hidden="true" />
                    {row.trees} Pohon
                  </span>
                </td>
                <td className="px-6 py-6 sm:px-8">
                  <button type="button" onClick={() => onViewDetail(row)} className="text-base text-navy hover:underline">
                    Detail RW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="flex flex-col items-center bg-bg-blue-soft p-6">
          <button
            type="button"
            onClick={onToggleShowAll}
            className="flex items-center gap-2 text-base font-bold text-navy"
          >
            {showAll ? 'Sembunyikan' : 'Tampilkan Peringkat Lengkap'}
            <ChevronDown className={`h-3 w-3 transition-transform ${showAll ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>
      )}
    </motion.div>
  )
}

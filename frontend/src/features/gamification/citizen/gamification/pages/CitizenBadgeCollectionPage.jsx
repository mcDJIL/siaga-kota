import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Select } from '../../../../../components/ui/Select'
import { BadgeGrid } from '../../../shared/components/BadgeGrid'
import { BadgeCollectionModal } from '../../../shared/components/BadgeCollectionModal'
import { badgeData } from '../data/badgeData'

const RARITY_ORDER = { epic: 0, rare: 1, common: 2 }

const CATEGORY_OPTIONS = ['all', ...new Set(badgeData.map((badge) => badge.category))]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'rarest', label: 'Terlangka' },
  { value: 'unlocked', label: 'Sudah Dibuka' },
  { value: 'locked', label: 'Terkunci' },
]

export function CitizenBadgeCollectionPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')
  const [selectedBadge, setSelectedBadge] = useState(null)

  const visibleBadges = useMemo(() => {
    let result = [...badgeData]

    if (query.trim()) {
      const normalized = query.trim().toLowerCase()
      result = result.filter((badge) => badge.name.toLowerCase().includes(normalized))
    }

    if (category !== 'all') {
      result = result.filter((badge) => badge.category === category)
    }

    if (sort === 'rarest') {
      result.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    } else if (sort === 'unlocked') {
      result = result.filter((badge) => badge.earned)
    } else if (sort === 'locked') {
      result = result.filter((badge) => !badge.earned)
    }

    return result
  }, [query, category, sort])

  function handleBadgeClick(badge) {
    setSelectedBadge(badge)
    toast.success('Detail badge dibuka.')
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="font-display text-2xl font-semibold text-navy sm:text-[32px]">Koleksi Badge</h1>
        <p className="mt-1 max-w-2xl text-base text-text-muted">
          Kumpulkan badge dengan berkontribusi aktif menjaga keselamatan dan kebersihan Kota Siaga.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-badge-neutral" aria-hidden="true" />
          <label htmlFor="badge-search" className="sr-only">
            Cari badge
          </label>
          <input
            id="badge-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari badge..."
            className="w-full rounded-lg bg-white py-3 pr-4 pl-10 text-sm text-text-body shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)] placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
          />
        </div>

        <Select
          aria-label="Filter kategori badge"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'Semua Kategori' : option}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Urutkan badge"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="rounded-3xl border border-border-muted/30 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:p-8">
        {visibleBadges.length === 0 ? (
          <p className="py-10 text-center text-sm text-badge-neutral">Tidak ada badge yang cocok.</p>
        ) : (
          <BadgeGrid badges={visibleBadges} onBadgeClick={handleBadgeClick} columns={5} size="lg" />
        )}
      </div>

      <BadgeCollectionModal isOpen={Boolean(selectedBadge)} onClose={() => setSelectedBadge(null)} badge={selectedBadge} />
    </div>
  )
}

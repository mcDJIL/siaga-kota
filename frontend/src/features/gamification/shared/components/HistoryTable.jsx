import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatSignedXp } from '../utils/pointFormatter'

const STATUS_META = {
  earned: { label: 'Diperoleh', bg: 'bg-brand-green-light', text: 'text-brand-green-dark' },
  redeemed: { label: 'Ditukar', bg: 'bg-[#FFDAD6]', text: 'text-[#93000A]' },
}

export function HistoryTable({ query, onQueryChange, items, page, totalPages, onPageChange, totalItems }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-badge-neutral" aria-hidden="true" />
        <label htmlFor="history-search" className="sr-only">
          Cari riwayat aktivitas
        </label>
        <input
          id="history-search"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari aktivitas..."
          className="w-full rounded-lg bg-bg-blue-soft py-3 pr-4 pl-10 text-sm text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-muted/20">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead className="bg-bg-blue-soft">
            <tr>
              {['Tanggal', 'Aktivitas', 'XP', 'Status'].map((column) => (
                <th key={column} scope="col" className="px-4 py-3 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-badge-neutral">
                  Tidak ada riwayat yang cocok.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const status = STATUS_META[item.status]
                return (
                  <tr key={item.id} className="border-t border-border-muted/20">
                    <td className="px-4 py-3 text-sm text-text-muted">{item.date}</td>
                    <td className="px-4 py-3 text-sm text-navy">{item.activity}</td>
                    <td className={`px-4 py-3 text-sm font-bold ${item.xp < 0 ? 'text-[#93000A]' : 'text-brand-green-dark'}`}>
                      {formatSignedXp(item.xp)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>
          Halaman {page} dari {totalPages} ({totalItems} aktivitas)
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-muted disabled:opacity-40"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-muted disabled:opacity-40"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

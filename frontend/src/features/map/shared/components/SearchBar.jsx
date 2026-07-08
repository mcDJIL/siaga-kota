import { AnimatePresence, motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'

export function SearchBar({ query, onQueryChange, results, onSelectResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
    >
      <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/85 p-2 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] backdrop-blur-md">
        <Search size={18} className="ml-2 shrink-0 text-badge-neutral" aria-hidden="true" />
        <label htmlFor="map-search" className="sr-only">
          Cari area, laporan, atau TPS
        </label>
        <input
          id="map-search"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search area, reports, or TPS..."
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-text-body placeholder:text-[#6B7280] focus:outline-none sm:text-base"
        />
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/30 bg-white/95 p-2 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10)] backdrop-blur-md"
            role="listbox"
          >
            {results.map((result) => (
              <li key={`${result.kind}-${result.id}`}>
                <button
                  type="button"
                  onClick={() => onSelectResult(result)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-text-body hover:bg-bg-blue-soft"
                >
                  <MapPin size={14} className="shrink-0 text-navy" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{result.title}</span>
                  <span className="shrink-0 text-xs text-text-muted">{result.category}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

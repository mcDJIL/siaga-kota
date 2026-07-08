import { useMemo, useState } from 'react'
import { MapPin, Search } from 'lucide-react'

const DUMMY_ADDRESSES = [
  { address: 'Jl. Jendral Sudirman No. 12, Jakarta Selatan', lat: -6.2088, lng: 106.8229 },
  { address: 'Jl. MH Thamrin, Jakarta Pusat', lat: -6.1944, lng: 106.8229 },
  { address: 'Jl. Gatot Subroto, Jakarta Selatan', lat: -6.2246, lng: 106.8206 },
  { address: 'Kuningan, Jakarta Selatan', lat: -6.2088, lng: 106.83 },
]

export function LocationSearchInput({ onSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query) return []
    return DUMMY_ADDRESSES.filter((item) => item.address.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const handleSelect = (item) => {
    setQuery(item.address)
    setIsOpen(false)
    onSelect?.(item)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Cari alamat lokasi kejadian..."
          aria-label="Cari alamat lokasi kejadian"
          autoComplete="off"
          className="w-full rounded-lg bg-bg-blue-soft py-2.5 pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-[500] mt-1 w-full overflow-hidden rounded-lg border border-border-muted/30 bg-white shadow-lg">
          {results.map((item) => (
            <li key={item.address}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text-body hover:bg-bg-soft"
              >
                <MapPin className="h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
                {item.address}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

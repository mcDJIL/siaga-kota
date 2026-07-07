import { Search } from 'lucide-react'

export function SearchEducation({ value, onChange }) {
  return (
    <div className="bg-white px-4 pb-10 sm:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center pt-6">
        <label htmlFor="education-search" className="sr-only">
          Cari topik edukasi
        </label>
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-badge-neutral"
            aria-hidden="true"
          />
          <input
            id="education-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Cari topik edukasi..."
            className="w-full rounded-xl bg-white py-[18px] pr-4 pl-12 text-base text-text-body shadow-[0_0_0_1px_#C4C6CF,0_1px_2px_0_rgba(0,0,0,0.05)] placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
          />
        </div>
      </div>
    </div>
  )
}

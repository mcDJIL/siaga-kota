import { Search } from 'lucide-react'

export function SearchInput({ value, onChange, placeholder = 'Cari ID Laporan atau Judul...' }) {
  return (
    <div className="relative flex h-[76px] items-center rounded-xl bg-white px-4 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
      <Search className="pointer-events-none absolute left-8 h-[18px] w-[18px] text-badge-neutral" aria-hidden="true" />
      <label htmlFor="report-search" className="sr-only">
        Cari laporan
      </label>
      <input
        id="report-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-bg-blue-soft py-3 pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
      />
    </div>
  )
}

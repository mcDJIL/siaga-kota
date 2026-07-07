import { useState } from 'react'
import { Search } from 'lucide-react'

export function DashboardSearch({ placeholder = 'Search reports, tasks, or staff...' }) {
  const [value, setValue] = useState('')

  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor="dashboard-search" className="sr-only">
        {placeholder}
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
      <input
        id="dashboard-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-bg-blue-soft py-2.5 pr-4 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
      />
    </div>
  )
}

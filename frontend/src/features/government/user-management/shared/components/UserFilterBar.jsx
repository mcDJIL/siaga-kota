import { Search } from 'lucide-react'
import { Select } from '../../../../../components/ui/Select'
import { DISTRICT_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '../../data/userData'

export function UserFilterBar({
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  districtFilter,
  onDistrictFilterChange,
  searchInput,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-t-xl border-b border-[#C4C6CF]/30 bg-bg-blue-soft p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          aria-label="Filter peran"
          value={roleFilter}
          onChange={(event) => onRoleFilterChange(event.target.value)}
          className="w-auto py-2 pr-9 pl-4 text-base"
        >
          <option value="Semua">Role: All</option>
          {ROLE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              Role: {option}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Filter status"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="w-auto py-2 pr-9 pl-4 text-base"
        >
          <option value="Semua">Status: All</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              Status: {option}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Filter kecamatan"
          value={districtFilter}
          onChange={(event) => onDistrictFilterChange(event.target.value)}
          className="w-auto py-2 pr-9 pl-4 text-base"
        >
          <option value="Semua">District: All</option>
          {DISTRICT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              District: {option}
            </option>
          ))}
        </Select>
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        <label htmlFor="user-search" className="sr-only">
          Cari nama, email, atau NIP
        </label>
        <input
          id="user-search"
          type="search"
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari nama, email, atau NIP..."
          className="h-[42px] w-full rounded-lg border border-[#C4C6CF] bg-bg-blue-soft py-2 pr-3 pl-10 text-base text-text-body placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
        />
      </div>
    </div>
  )
}

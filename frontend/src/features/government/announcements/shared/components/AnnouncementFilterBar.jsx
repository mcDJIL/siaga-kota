import { Filter } from 'lucide-react'
import { Select } from '../../../../../components/ui/Select'
import { STATUS_OPTIONS } from '../../data/announcementData'

export function AnnouncementFilterBar({ statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-bg-blue-soft px-2 py-1">
      <Filter className="ml-2 h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
      <Select
        aria-label="Filter status pengumuman"
        value={statusFilter}
        onChange={(event) => onStatusFilterChange(event.target.value)}
        className="w-auto rounded-full border-0 bg-transparent py-1.5 pr-8 pl-1 text-xs font-semibold tracking-[0.6px] text-text-body"
      >
        <option value="Semua">Semua Status</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

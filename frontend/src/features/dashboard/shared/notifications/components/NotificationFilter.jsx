import { FilterDropdown } from '../../table/FilterDropdown'

export function NotificationFilter({ readStatus, onReadStatusChange, readStatusOptions, priority, onPriorityChange, priorityOptions }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown label="Status" value={readStatus} options={readStatusOptions} onChange={onReadStatusChange} />
      <FilterDropdown label="Prioritas" value={priority} options={priorityOptions} onChange={onPriorityChange} />
    </div>
  )
}

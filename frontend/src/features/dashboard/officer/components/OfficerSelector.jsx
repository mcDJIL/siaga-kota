import { useState } from 'react'
import { Input } from '../../../../components/ui/Input'
import { cn } from '../../../../lib/cn'

export function OfficerSelector({ officers, selectedOfficerId, onSelect }) {
  const [search, setSearch] = useState('')
  const filteredOfficers = officers.filter((officer) => officer.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Cari petugas..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Cari petugas"
      />
      <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto" role="listbox" aria-label="Daftar petugas tersedia">
        {filteredOfficers.map((officer) => {
          const isAvailable = officer.status === 'tersedia' && Number(officer.assigned_reports_count || 0) === 0

          return (
            <li key={officer.id}>
              <button
                type="button"
                role="option"
                aria-selected={selectedOfficerId === officer.id}
                disabled={!isAvailable}
                onClick={() => onSelect(officer.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-3 text-left disabled:cursor-not-allowed disabled:opacity-40',
                  selectedOfficerId === officer.id ? 'border-navy bg-bg-blue-soft' : 'border-border-muted'
                )}
              >
                <img src={officer.avatar_path || officer.avatar || '/default-avatar.png'} alt={officer.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate text-sm font-semibold text-navy">{officer.name}</span>
                  <span className="text-xs text-text-muted">
                    {officer.distance} &middot; {isAvailable ? 'Tersedia' : 'Bertugas'}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

import { toast } from 'sonner'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { DATE_RANGE_OPTIONS, DISTRICT_OPTIONS, REGION_OPTIONS } from '../../data/districtFloodData'

function FilterSelect({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative flex-1">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-lg bg-bg-soft py-2.5 pr-9 pl-4 text-base text-text-body focus:outline-2 focus:outline-brand-green"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
    </div>
  )
}

export function FloodReportFilter({ region, onRegionChange, district, onDistrictChange, dateRange, onDateRangeChange }) {
  function handleChange(setter) {
    return (event) => {
      setter(event.target.value)
      toast.success('Filter berhasil diterapkan.')
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border-muted/30 bg-white p-2 shadow-[0_1px_2px_0_rgba(26,54,93,0.05)] sm:flex-row sm:items-center sm:divide-x sm:divide-border-muted">
      <div className="flex flex-1 gap-2 px-1">
        <FilterSelect ariaLabel="Pilih region" value={region} onChange={handleChange(onRegionChange)} options={REGION_OPTIONS} />
        <FilterSelect ariaLabel="Pilih district" value={district} onChange={handleChange(onDistrictChange)} options={DISTRICT_OPTIONS} />
      </div>
      <div className="relative px-1 sm:pl-4">
        <CalendarDays className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-navy" aria-hidden="true" />
        <select
          aria-label="Pilih rentang tanggal"
          value={dateRange}
          onChange={handleChange(onDateRangeChange)}
          className="h-11 w-full appearance-none rounded-lg bg-bg-soft py-2.5 pr-4 pl-9 text-base text-text-body focus:outline-2 focus:outline-brand-green"
        >
          {DATE_RANGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

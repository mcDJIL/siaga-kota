import { toast } from 'sonner'
import { ChevronDown } from 'lucide-react'
import { DISTRICT_OPTIONS, REGION_OPTIONS } from '../../data/districtChartData'

function FilterSelect({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        className="h-[38px] w-full appearance-none rounded-md border border-border-muted bg-bg-soft py-2 pr-9 pl-4 text-sm font-medium text-text-body focus:outline-2 focus:outline-brand-green"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
    </div>
  )
}

export function WasteReportFilter({ region, onRegionChange, district, onDistrictChange, date, onDateChange }) {
  function handleChange(setter) {
    return (event) => {
      setter(event.target.value)
      toast.success('Filter berhasil diterapkan.')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[280px] lg:grid-cols-2">
      <FilterSelect ariaLabel="Pilih wilayah" value={region} onChange={handleChange(onRegionChange)} options={REGION_OPTIONS} />
      <FilterSelect
        ariaLabel="Pilih kecamatan"
        value={district}
        onChange={handleChange(onDistrictChange)}
        options={DISTRICT_OPTIONS}
      />
      <input
        type="date"
        aria-label="Pilih tanggal"
        value={date}
        onChange={handleChange(onDateChange)}
        className="col-span-1 h-[38px] w-full rounded-md border border-border-muted bg-bg-soft px-4 text-sm font-medium text-text-body focus:outline-2 focus:outline-brand-green sm:col-span-3 lg:col-span-2"
      />
    </div>
  )
}

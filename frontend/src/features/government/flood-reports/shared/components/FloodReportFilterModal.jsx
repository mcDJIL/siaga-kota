import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { DISTRICT_OPTIONS } from '../../data/districtFloodData'

export const STATUS_FILTER_OPTIONS = [
  'Semua Status',
  'Menunggu',
  'Terverifikasi',
  'Diproses',
  'Selesai',
]
export const SEVERITY_FILTER_OPTIONS = ['Semua Keparahan', 'Tinggi', 'Sedang', 'Rendah']
export const WATER_LEVEL_FILTER_OPTIONS = ['Semua Tinggi Air', '0-30 cm', '31-70 cm', '71 cm+']

export const DEFAULT_FLOOD_FILTERS = {
  status: 'Semua Status',
  severity: 'Semua Keparahan',
  waterLevel: 'Semua Tinggi Air',
  district: 'Semua District',
}

function FilterField({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-text-body">
      {label}
      <select value={value} onChange={onChange} className="rounded-lg bg-bg-soft px-4 py-2.5 text-base text-text-body">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export function FloodReportFilterModal({ isOpen, onClose, filters, onFiltersChange, onApply, onReset }) {
  function update(key) {
    return (event) => onFiltersChange((prev) => ({ ...prev, [key]: event.target.value }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Laporan">
      <div className="flex flex-col gap-4">
        <FilterField label="Status" value={filters.status} onChange={update('status')} options={STATUS_FILTER_OPTIONS} />
        <FilterField
          label="Tingkat Keparahan"
          value={filters.severity}
          onChange={update('severity')}
          options={SEVERITY_FILTER_OPTIONS}
        />
        <FilterField
          label="Tinggi Air"
          value={filters.waterLevel}
          onChange={update('waterLevel')}
          options={WATER_LEVEL_FILTER_OPTIONS}
        />
        <FilterField label="District" value={filters.district} onChange={update('district')} options={DISTRICT_OPTIONS} />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={onReset} className="border border-border-muted">
            Reset
          </Button>
          <Button variant="navy" size="sm" onClick={onApply}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { Download } from 'lucide-react'
import { FilterDropdown } from '../../shared/table/FilterDropdown'
import { Button } from '../../../../components/ui/Button'

const DANGER_LEVEL_OPTIONS = [
  { value: 'semua', label: 'Semua Tingkat' },
  { value: 'tinggi', label: 'Tinggi' },
  { value: 'sedang', label: 'Sedang' },
  { value: 'rendah', label: 'Rendah' },
]

const REGION_OPTIONS = [
  { value: 'semua', label: 'Semua Wilayah' },
  { value: 'wilayah-1', label: 'Wilayah 1' },
  { value: 'wilayah-2', label: 'Wilayah 2' },
  { value: 'wilayah-3', label: 'Wilayah 3' },
  { value: 'wilayah-4', label: 'Wilayah 4' },
]

export function FloodFilterBar({ dangerLevel, onDangerLevelChange, region, onRegionChange, onDownload }) {
  return (
    <div className="flex flex-wrap items-center gap-4 print:hidden">
      <FilterDropdown label="Tingkat Bahaya:" value={dangerLevel} onChange={onDangerLevelChange} options={DANGER_LEVEL_OPTIONS} />
      <FilterDropdown label="Wilayah:" value={region} onChange={onRegionChange} options={REGION_OPTIONS} />
      <Button type="button" variant="navy" onClick={onDownload} className="gap-2 px-6 py-2 text-base">
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Unduh Laporan
      </Button>
    </div>
  )
}

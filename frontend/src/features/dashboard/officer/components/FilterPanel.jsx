import { motion } from 'framer-motion'
import { FilterDropdown } from '../../shared/table/FilterDropdown'

const REGION_OPTIONS = [
  { value: 'semua', label: 'Semua Wilayah' },
  { value: 'wilayah-1', label: 'Wilayah 1' },
  { value: 'wilayah-2', label: 'Wilayah 2' },
  { value: 'wilayah-3', label: 'Wilayah 3' },
  { value: 'wilayah-4', label: 'Wilayah 4' },
]

const STATUS_OPTIONS = [
  { value: 'semua', label: 'Semua Status' },
  { value: 'diverifikasi', label: 'Sudah Terverifikasi' },
  { value: 'ditugaskan', label: 'Ditugaskan' },
  { value: 'diproses', label: 'Sedang Diproses' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'ditolak', label: 'Ditolak' },
]

const TRIGGER_CLASS = 'w-full justify-between border border-border-muted bg-white px-3 py-2 text-xs font-medium text-text-body'

export function FilterPanel({ region, onRegionChange, status, onStatusChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 border-b border-border-muted bg-bg-blue-soft p-4"
    >
      <h2 className="text-sm font-bold text-text-body">Filter Wilayah & Status</h2>
      <div className="flex gap-2">
        <FilterDropdown
          value={region}
          onChange={onRegionChange}
          options={REGION_OPTIONS}
          fullWidth
          triggerClassName={TRIGGER_CLASS}
        />
        <FilterDropdown
          value={status}
          onChange={onStatusChange}
          options={STATUS_OPTIONS}
          fullWidth
          triggerClassName={TRIGGER_CLASS}
        />
      </div>
    </motion.div>
  )
}

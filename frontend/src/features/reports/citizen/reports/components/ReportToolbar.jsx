import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SearchInput } from '../../../shared/components/SearchInput'
import { FilterSelect } from '../../../shared/components/FilterSelect'
import { REPORT_CATEGORY_FILTER_OPTIONS } from '../data/categoryOptions'
import { REPORT_STATUS_FILTER_OPTIONS } from '../data/statusOptions'

export function ReportToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onCreateClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy sm:text-[32px]">Pantau Laporan</h1>
          <p className="mt-1 max-w-2xl text-base text-text-muted">
            Lacak kemajuan penanganan laporan gangguan lingkungan dan infrastruktur yang Anda ajukan di wilayah Kota
            Siaga.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <SearchInput value={query} onChange={onQueryChange} />
        </div>
        <FilterSelect
          label="Kategori"
          value={category}
          onChange={onCategoryChange}
          options={REPORT_CATEGORY_FILTER_OPTIONS}
        />
        <FilterSelect label="Status" value={status} onChange={onStatusChange} options={REPORT_STATUS_FILTER_OPTIONS} />
      </div>
    </motion.div>
  )
}

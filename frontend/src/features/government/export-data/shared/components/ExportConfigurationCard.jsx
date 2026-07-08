import { motion } from 'framer-motion'
import { SlidersHorizontal, UploadCloud } from 'lucide-react'
import { Select } from '../../../../../components/ui/Select'
import { Input } from '../../../../../components/ui/Input'
import { Button } from '../../../../../components/ui/Button'
import { ExportFormatSelector } from './ExportFormatSelector'
import { DATA_TYPE_OPTIONS } from '../../data/exportHistoryData'

export function ExportConfigurationCard({
  dataType,
  onDataTypeChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  format,
  onFormatChange,
  isExporting,
  onExportNow,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 rounded-2xl border border-[#DCE9FF] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-navy" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-navy">Konfigurasi Ekspor</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="export-data-type" className="text-sm font-medium text-text-body">
            Jenis Data
          </label>
          <Select id="export-data-type" value={dataType} onChange={(event) => onDataTypeChange(event.target.value)}>
            {DATA_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-body">Rentang Tanggal</span>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              aria-label="Tanggal Mulai"
              value={startDate}
              onChange={(event) => onStartDateChange(event.target.value)}
            />
            <span className="text-text-muted">-</span>
            <Input
              type="date"
              aria-label="Tanggal Selesai"
              value={endDate}
              onChange={(event) => onEndDateChange(event.target.value)}
            />
          </div>
        </div>

        <ExportFormatSelector value={format} onChange={onFormatChange} />
      </div>

      <div className="flex justify-end border-t border-[#C4C6CF]/40 pt-6">
        <Button variant="navy" onClick={onExportNow} disabled={isExporting}>
          <UploadCloud className="h-4 w-4" aria-hidden="true" />
          {isExporting ? 'Mengekspor...' : 'Ekspor Sekarang'}
        </Button>
      </div>
    </motion.div>
  )
}

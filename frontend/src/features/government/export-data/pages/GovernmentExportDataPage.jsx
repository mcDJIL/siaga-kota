import { motion } from 'framer-motion'
import { ExportConfigurationCard } from '../shared/components/ExportConfigurationCard'
import { ExportHistoryTable } from '../shared/components/ExportHistoryTable'
import { useExportHistory } from '../hooks/useExportHistory'

export function GovernmentExportDataPage() {
  const {
    paginated,
    totalCount,
    page,
    totalPages,
    onPageChange,
    dataType,
    onDataTypeChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    format,
    onFormatChange,
    isExporting,
    isLoading,
    onExportNow,
    onRefresh,
    onDownload,
    downloadingIds,
  } = useExportHistory()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-2"
      >
        <h1 className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
          Ekspor Data &amp; Laporan
        </h1>
        <p className="text-base text-text-muted">
          Hasilkan laporan komprehensif berdasarkan data historis pemerintah daerah untuk analisis lanjutan dan pengarsipan.
        </p>
      </motion.div>

      <ExportConfigurationCard
        dataType={dataType}
        onDataTypeChange={onDataTypeChange}
        startDate={startDate}
        onStartDateChange={onStartDateChange}
        endDate={endDate}
        onEndDateChange={onEndDateChange}
        format={format}
        onFormatChange={onFormatChange}
        isExporting={isExporting}
        onExportNow={onExportNow}
      />

      <ExportHistoryTable
        items={paginated}
        totalCount={totalCount}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onRefresh={onRefresh}
        onDownload={onDownload}
        downloadingIds={downloadingIds}
        isLoading={isLoading}
      />
    </div>
  )
}

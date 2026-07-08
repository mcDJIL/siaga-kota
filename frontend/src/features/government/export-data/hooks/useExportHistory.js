import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { EXPORT_HISTORY } from '../data/exportHistoryData'
import { buildExportFilename } from '../utils/exportFormatter'
import { FORMAT_MIME_TYPES } from '../utils/formatColor'

const PAGE_SIZE = 10

export function useExportHistory() {
  const [history, setHistory] = useState(EXPORT_HISTORY)
  const [page, setPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)

  const [dataType, setDataType] = useState('Semua Sektor')
  const [startDate, setStartDate] = useState('2023-10-01')
  const [endDate, setEndDate] = useState('2023-10-31')
  const [format, setFormat] = useState('PDF')

  const totalPages = Math.max(1, Math.ceil(history.length / PAGE_SIZE))
  const paginated = useMemo(
    () => history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [history, page]
  )

  function handleExportNow() {
    if (!dataType || !startDate || !endDate || !format) {
      toast.error('Lengkapi konfigurasi ekspor.')
      return
    }

    setIsExporting(true)
    window.setTimeout(() => {
      const newRecord = {
        id: `exp-${Date.now()}`,
        dataType: `${dataType} (${new Date(startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })})`,
        format,
        status: 'Selesai',
        exportedAt: new Date().toISOString(),
      }
      setHistory((current) => [newRecord, ...current])
      setPage(1)
      setIsExporting(false)
      toast.success('Ekspor berhasil dibuat.')
    }, 2000)
  }

  function handleRefresh() {
    setHistory((current) => [...current])
    toast.success('Riwayat berhasil diperbarui.')
  }

  function handleDownload(record) {
    if (record.status !== 'Selesai') return

    const filename = buildExportFilename(record.dataType, record.format)
    const blob = new Blob([`Dummy export file for ${record.dataType}`], {
      type: FORMAT_MIME_TYPES[record.format],
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('Download dimulai.')
  }

  return {
    paginated,
    totalCount: history.length,
    page,
    totalPages,
    onPageChange: setPage,
    dataType,
    onDataTypeChange: setDataType,
    startDate,
    onStartDateChange: setStartDate,
    endDate,
    onEndDateChange: setEndDate,
    format,
    onFormatChange: setFormat,
    isExporting,
    onExportNow: handleExportNow,
    onRefresh: handleRefresh,
    onDownload: handleDownload,
  }
}

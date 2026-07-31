import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  createDataExport,
  downloadDataExport,
  getExportHistory,
} from '../../../../services/export-data.service'
import { EXPORT_STATUS } from '../data/exportHistoryData'

const PAGE_SIZE = 10

export function useExportHistory() {
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [downloadingIds, setDownloadingIds] = useState(new Set())

  const [dataType, setDataType] = useState('all')
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    return date.toISOString().slice(0, 10)
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [format, setFormat] = useState('pdf')

  useEffect(() => {
    loadHistory()
  }, [page])

  async function loadHistory() {
    try {
      setIsLoading(true)
      const response = await getExportHistory({
        per_page: PAGE_SIZE,
        page,
      })

      setHistory(response.data?.items || [])
      setTotalCount(response.data?.total || 0)
      setTotalPages(response.data?.last_page || 1)
    } catch (error) {
      console.error('Error loading export history:', error)
      toast.error(error.message || 'Gagal memuat riwayat ekspor')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExportNow() {
    if (!dataType || !startDate || !endDate || !format) {
      toast.error('Lengkapi konfigurasi ekspor.')
      return
    }

    try {
      setIsExporting(true)
      await createDataExport({
        data_type: dataType,
        format,
        date_from: startDate,
        date_to: endDate,
      })
      setPage(1)
      await loadHistory()
      toast.success('Ekspor sedang diproses. Segarkan riwayat untuk melihat statusnya.')
    } catch (error) {
      console.error('Error creating export:', error)
      toast.error(error.message || 'Gagal membuat ekspor')
    } finally {
      setIsExporting(false)
    }
  }

  async function handleRefresh() {
    await loadHistory()
    toast.success('Riwayat berhasil diperbarui.')
  }

  async function handleDownload(record) {
    if (record.status !== EXPORT_STATUS.COMPLETED) return
    if (downloadingIds.has(record.id)) return

    try {
      setDownloadingIds((prev) => new Set(prev).add(record.id))

      const blob = await downloadDataExport(record)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = record.filename || 'export-data'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Download dimulai.')
    } catch (error) {
      console.error('Error downloading export:', error)
      toast.error(error.message || 'Gagal mengunduh ekspor')
    } finally {
      setDownloadingIds((prev) => {
        const next = new Set(prev)
        next.delete(record.id)
        return next
      })
    }
  }

  function handleDataTypeChange(value) {
    setDataType(value)
  }

  function handlePageChange(nextPage) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages))
  }

  return {
    paginated: history,
    totalCount,
    page,
    totalPages,
    onPageChange: handlePageChange,
    dataType,
    onDataTypeChange: handleDataTypeChange,
    startDate,
    onStartDateChange: setStartDate,
    endDate,
    onEndDateChange: setEndDate,
    format,
    onFormatChange: setFormat,
    isExporting,
    isLoading,
    onExportNow: handleExportNow,
    onRefresh: handleRefresh,
    onDownload: handleDownload,
    downloadingIds,
  }
}

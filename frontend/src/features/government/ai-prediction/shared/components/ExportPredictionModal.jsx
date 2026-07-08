import { useState } from 'react'
import { toast } from 'sonner'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { exportPredictionReport } from '../../utils/pdfExport'

export function ExportPredictionModal({ isOpen, onClose, statistics, recommendations, mapRef, period }) {
  const [isExporting, setIsExporting] = useState(false)
  const [includeOptions, setIncludeOptions] = useState({
    map: true,
    table: true,
    statistics: true,
  })

  function toggleOption(key) {
    setIncludeOptions((current) => ({ ...current, [key]: !current[key] }))
  }

  async function handleExport() {
    if (!mapRef?.current) return

    setIsExporting(true)
    try {
      await exportPredictionReport({
        mapElement: mapRef.current,
        statistics,
        recommendations: includeOptions.table ? recommendations : [],
        generatedAt: new Date(),
      })
      toast.success('Laporan berhasil diekspor.')
      onClose()
    } catch {
      toast.error('Gagal mengekspor laporan.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Laporan Prediksi" className="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Prediction Date</span>
            <span className="font-medium text-text-body">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Selected Period</span>
            <span className="font-medium text-text-body">{period}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Include</span>
          {[
            { key: 'map', label: 'Include Prediction Map' },
            { key: 'table', label: 'Include Recommendation Table' },
            { key: 'statistics', label: 'Include Statistics' },
          ].map((option) => (
            <label key={option.key} className="flex items-center gap-2 text-sm text-text-body">
              <input
                type="checkbox"
                checked={includeOptions[option.key]}
                onChange={() => toggleOption(option.key)}
                className="h-4 w-4 rounded border-[#C4C6CF] text-brand-green focus:ring-brand-green"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button variant="navy" size="sm" onClick={handleExport} disabled={isExporting}>
            {isExporting ? 'Mengekspor...' : 'Export PDF'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

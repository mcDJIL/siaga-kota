import { useState } from 'react'
import { toast } from 'sonner'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { exportHeatmapReport } from '../../utils/pdfExport'

const LAYER_LABEL = { waste: 'Waste', flood: 'Flood', both: 'Both' }

export function ExportReportModal({ isOpen, onClose, activeLayer, districts, mapRef }) {
  const [isExporting, setIsExporting] = useState(false)
  const [includeOptions, setIncludeOptions] = useState({
    screenshot: true,
    summary: true,
    legend: true,
  })

  function toggleOption(key) {
    setIncludeOptions((current) => ({ ...current, [key]: !current[key] }))
  }

  async function handleExport() {
    if (!mapRef?.current) return

    setIsExporting(true)
    try {
      await exportHeatmapReport({
        mapElement: mapRef.current,
        layer: LAYER_LABEL[activeLayer],
        districts: includeOptions.summary ? districts : [],
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
    <Modal isOpen={isOpen} onClose={onClose} title="Export Daily Report" className="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Export Date</span>
            <span className="font-medium text-text-body">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Selected Layer</span>
            <span className="font-medium text-text-body">{LAYER_LABEL[activeLayer]}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Include</span>
          {[
            { key: 'screenshot', label: 'Heatmap Screenshot' },
            { key: 'summary', label: 'District Summary' },
            { key: 'legend', label: 'Legend' },
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

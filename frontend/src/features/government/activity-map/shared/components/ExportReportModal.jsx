import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Modal } from '../../../../../components/ui/Modal'
import { Button } from '../../../../../components/ui/Button'
import { ExportDataTable } from './ExportDataTable'

const LAYER_LABEL = { waste: 'Waste', flood: 'Flood', both: 'Both' }

export function ExportReportModal({ isOpen, onClose, activeLayer, districts, wasteMarkers, floodMarkers }) {
  const [isExporting, setIsExporting] = useState(false)
  const tableRef = useRef(null)

  function handleExport() {
    setIsExporting(true)
    try {
      const title = `SiagaKota - ${LAYER_LABEL[activeLayer]} Report`
      document.title = title
      
      window.print()
      
      toast.success('Laporan siap untuk dicetak.')
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Gagal mempersiapkan laporan.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Export Daily Report" className="max-w-4xl max-h-[90vh]">
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

          <div className="max-h-96 overflow-y-auto border border-border-muted/30 rounded-lg bg-bg-soft print:hidden">
            <ExportDataTable 
              activeLayer={activeLayer} 
              wasteMarkers={wasteMarkers || []} 
              floodMarkers={floodMarkers || []} 
              districts={districts || []} 
            />
          </div>

          <div className="mt-2 flex justify-end gap-3 print:hidden">
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button variant="navy" size="sm" onClick={handleExport} disabled={isExporting}>
              {isExporting ? 'Mempersiapkan...' : 'Export Print'}
            </Button>
          </div>
        </div>
      </Modal>

      <div className="hidden print:block">
        <ExportDataTable 
          activeLayer={activeLayer} 
          wasteMarkers={wasteMarkers || []} 
          floodMarkers={floodMarkers || []} 
          districts={districts || []} 
        />
      </div>
    </>
  )
}

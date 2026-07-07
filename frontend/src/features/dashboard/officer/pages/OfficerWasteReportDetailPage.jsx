import { useState } from 'react'
import { ReportHeader } from '../../shared/report-detail/components/ReportHeader'
import { ReporterInformationCard } from '../../shared/report-detail/components/ReporterInformationCard'
import { ReportTimelineCard } from '../../shared/report-detail/components/ReportTimelineCard'
import { ReportGallery } from '../../shared/report-detail/components/ReportGallery'
import { HandlingForm } from '../../shared/report-detail/components/HandlingForm'
import { PrintReportDialog } from '../../shared/print/PrintReportDialog'
import { ReportPrintTemplate } from '../../shared/report-detail/components/ReportPrintTemplate'
import { WASTE_REPORT_DETAIL } from '../data/reportDetail'
import { WASTE_REPORT_TIMELINE } from '../data/timelineData'

export function OfficerWasteReportDetailPage() {
  const [isEmergency, setIsEmergency] = useState(false)
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)
  const [photos, setPhotos] = useState(WASTE_REPORT_DETAIL.photos)
  const [handlingNotes, setHandlingNotes] = useState('')

  const handleAddPhoto = (photoUrl) => {
    setPhotos((current) => [...current, photoUrl])
  }

  const handleSaveHandling = (data) => {
    setHandlingNotes(data.notes)
  }

  const handleConfirmPrint = () => {
    setIsPrintDialogOpen(false)
    window.setTimeout(() => window.print(), 200)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <ReportHeader
        reportId={WASTE_REPORT_DETAIL.id}
        categoryLabel={WASTE_REPORT_DETAIL.categoryLabel}
        isEmergency={isEmergency}
        onToggleEmergency={() => setIsEmergency((current) => !current)}
        onPrint={() => setIsPrintDialogOpen(true)}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ReporterInformationCard report={WASTE_REPORT_DETAIL} />
          <ReportGallery photos={photos} onAddPhoto={handleAddPhoto} />
        </div>

        <div className="flex flex-col gap-6">
          <ReportTimelineCard timeline={WASTE_REPORT_TIMELINE} />
          <HandlingForm onSave={handleSaveHandling} onCancel={() => {}} />
        </div>
      </div>

      <PrintReportDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        onConfirm={handleConfirmPrint}
      />

      <ReportPrintTemplate
        report={{ ...WASTE_REPORT_DETAIL, photos }}
        timeline={WASTE_REPORT_TIMELINE}
        isEmergency={isEmergency}
        handlingNotes={handlingNotes}
      />
    </div>
  )
}

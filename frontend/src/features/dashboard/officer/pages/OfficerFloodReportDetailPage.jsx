import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ReportHeader } from '../../shared/report-detail/components/ReportHeader'
import { ReporterInformationCard } from '../../shared/report-detail/components/ReporterInformationCard'
import { ReportTimelineCard } from '../../shared/report-detail/components/ReportTimelineCard'
import { ReportGallery } from '../../shared/report-detail/components/ReportGallery'
import { HandlingForm } from '../../shared/report-detail/components/HandlingForm'
import { PrintReportDialog } from '../../shared/print/PrintReportDialog'
import { ReportPrintTemplate } from '../../shared/report-detail/components/ReportPrintTemplate'
import { useFloodReportDetail } from '../hooks/useFloodReportDetail'
import { toggleReportEmergency, submitHandlingReport } from '../../../../services/officer.service'

function mapReportData(apiReport) {
  return {
    id: apiReport.id,
    code: apiReport.code,
    title: apiReport.title,
    description: apiReport.description,
    categoryLabel: 'Banjir',
    location: apiReport.location?.address || '-',
    address: apiReport.location?.address || '-',
    latitude: apiReport.location?.latitude,
    longitude: apiReport.location?.longitude,
    coordinates: {
      lat: apiReport.location?.latitude || 0,
      lng: apiReport.location?.longitude || 0,
    },
    reporterName: apiReport.reporter?.name || 'Tidak diketahui',
    submittedAt: new Date(apiReport.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    reporter: {
      name: apiReport.reporter?.name || 'Tidak diketahui',
      phone: apiReport.reporter?.phone || '-',
    },
    status: apiReport.status,
    priority: apiReport.priority,
    createdAt: apiReport.created_at,
    photos: [],
  }
}

export function OfficerFloodReportDetailPage() {
  const { reportId } = useParams()
  const { report: apiReport, loading, error, refetch } = useFloodReportDetail(reportId)
  const [isEmergency, setIsEmergency] = useState(false)
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)
  const [photos, setPhotos] = useState([])
  const [handlingNotes, setHandlingNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (apiReport) {
      setIsEmergency(apiReport.is_emergency)
    }
  }, [apiReport?.is_emergency])

  useEffect(() => {
    if (apiReport?.attachments && photos.length === 0) {
      setPhotos(apiReport.attachments.map(a => ({ url: a.url, id: a.id })))
    }
  }, [apiReport, photos.length])

  const report = apiReport ? mapReportData(apiReport) : null

  const handleToggleEmergency = async () => {
    try {
      setIsSubmitting(true)
      await toggleReportEmergency(reportId)
      setIsEmergency(prev => !prev)
      toast.success(isEmergency ? 'Laporan ditandai sebagai normal' : 'Laporan ditandai sebagai darurat')
      refetch()
    } catch (err) {
      console.error('Error toggling emergency:', err)
      toast.error(err.message || 'Gagal mengubah status darurat')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveHandling = async (data) => {
    try {
      setIsSubmitting(true)
      await submitHandlingReport(reportId, data)
      setHandlingNotes(data.notes)
      toast.success('Data penanganan berhasil disimpan')
      refetch()
    } catch (err) {
      console.error('Error saving handling:', err)
      toast.error(err.message || 'Gagal menyimpan data penanganan')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-text-muted">Memuat detail laporan...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 text-sm font-medium mb-2">{error}</p>
          <p className="text-text-muted text-xs">ID: {reportId}</p>
        </div>
      </div>
    )
  }

  if (!apiReport) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-text-muted mb-2">Laporan tidak ditemukan</p>
          <p className="text-text-muted text-xs">ID: {reportId}</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-text-muted">Gagal memproses data laporan</p>
        </div>
      </div>
    )
  }

  const handleAddPhoto = (photoUrl) => {
    setPhotos((current) => [...current, photoUrl])
  }

  const handleConfirmPrint = () => {
    setIsPrintDialogOpen(false)
    window.setTimeout(() => window.print(), 200)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <ReportHeader
        reportId={report.id}
        categoryLabel={report.categoryLabel}
        isEmergency={isEmergency}
        onToggleEmergency={handleToggleEmergency}
        onPrint={() => setIsPrintDialogOpen(true)}
        isLoading={isSubmitting}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ReporterInformationCard report={report} />
          <ReportGallery photos={photos} onAddPhoto={handleAddPhoto} />
        </div>

        <div className="flex flex-col gap-6">
          <ReportTimelineCard 
            statusHistories={apiReport?.status_histories} 
            fallbackTimeline={[]}
          />
          <HandlingForm
            onSave={handleSaveHandling}
            onCancel={() => {}}
            isLoading={isSubmitting}
            isDisabled={!!apiReport?.resolution_note}
            resolutionNote={apiReport?.resolution_note}
            reportStatus={apiReport?.status}
          />
        </div>
      </div>

      <PrintReportDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        onConfirm={handleConfirmPrint}
      />

      <ReportPrintTemplate
        report={{ ...report, photos }}
        timeline={[]}
        isEmergency={isEmergency}
        handlingNotes={handlingNotes}
      />
    </div>
  )
}

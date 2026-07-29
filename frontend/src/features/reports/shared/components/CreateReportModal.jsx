import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Modal } from '../../../../components/ui/Modal'
import { ReportForm } from './ReportForm'
import { SubmitReportButton } from './SubmitReportButton'
import { createReportSchema } from '../../citizen/reports/validation/createReportSchema'
import { submitReport } from '../../../../services/report.service'

const DEFAULT_VALUES = {
  reportType: '',
  title: '',
  category: '',
  description: '',
  location: '',
  images: [],
}

function buildReportFromForm(values) {
  const now = new Date()
  const formattedDate = now.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    id: `#SK-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    title: values.title,
    category: values.category,
    date: formattedDate,
    status: 'pending',
  }
}

export function CreateReportModal({ isOpen, onClose, onSuccess }) {
  const methods = useForm({
    resolver: zodResolver(createReportSchema),
    defaultValues: DEFAULT_VALUES,
  })

  async function onSubmit(values) {
    try {
      const payload = {
        category_id: values.category || values.category_id || '',
        title: values.title,
        description: values.description,
        address: values.location ?? values.address ?? '',
        latitude: values.latitude,
        longitude: values.longitude,
        waste_type: values.waste_type ?? null,
        water_level_cm: values.water_level_cm ?? null,
        photos: values.images ?? [],
      }

      const result = await submitReport(payload)
      const report = result?.data

      const now = report?.created_at ? new Date(report.created_at) : new Date()
      const formattedDate = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const newReport = {
        id: report?.code ?? `#SK-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        title: report?.title ?? values.title,
        category: report?.category?.slug ?? values.category,
        date: formattedDate,
        status: report?.status ?? 'pending',
      }

      toast.success('Laporan berhasil dibuat.')
      methods.reset(DEFAULT_VALUES)
      onSuccess(newReport)
    } catch (err) {
      toast.error(err?.message ?? 'Gagal membuat laporan.')
    }
  }

  function onInvalid() {
    toast.error('Harap lengkapi semua data.')
  }

  function handleClose() {
    methods.reset(DEFAULT_VALUES)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Buat Laporan Baru" className="max-w-lg">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto pr-1">
          <ReportForm />
          <SubmitReportButton label="Kirim Laporan" />
        </form>
      </FormProvider>
    </Modal>
  )
}

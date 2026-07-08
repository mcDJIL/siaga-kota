import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Modal } from '../../../../components/ui/Modal'
import { ReportForm } from './ReportForm'
import { SubmitReportButton } from './SubmitReportButton'
import { createReportSchema } from '../../citizen/reports/validation/createReportSchema'

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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newReport = buildReportFromForm(values)
      toast.success('Laporan berhasil dibuat.')
      methods.reset(DEFAULT_VALUES)
      onSuccess(newReport)
    } catch {
      toast.error('Gagal membuat laporan.')
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

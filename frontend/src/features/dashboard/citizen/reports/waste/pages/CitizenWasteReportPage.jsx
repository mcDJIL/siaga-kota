import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { submitReport } from '../../../../../../services/report.service'
import { WasteReportForm } from '../components/WasteReportForm'
import { LocationCard } from '../components/LocationCard'
import { ReportTipsCard } from '../components/ReportTipsCard'
import { ReportSuccessDialog } from '../components/ReportSuccessDialog'
import { wasteReportSchema } from '../validation/wasteReportSchema'
import { CATEGORY_ID } from '../data/wasteCategories'

export function CitizenWasteReportPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    resolver: zodResolver(wasteReportSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      wasteType: '',
      description: '',
      address: '',
      latitude: -6.1944,
      longitude: 106.8229,
      images: [],
    },
  })

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const payload = {
        category_id: CATEGORY_ID,
        waste_type: values.wasteType,
        title: values.title,
        description: values.description,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        images: values.images,
      }

      await submitReport(payload)
      toast.success('Laporan berhasil dikirim.')
      setIsSuccessOpen(true)
      methods.reset()
    } catch (err) {
      const errorMsg = err?.response?.message || err?.message || 'Gagal mengirim laporan.'
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const onInvalid = () => {
    toast.error('Harap lengkapi semua data yang diperlukan.')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8 p-4 sm:p-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-[32px]">
            Laporkan Tumpukan Sampah
          </h1>
          <p className="max-w-2xl text-base text-text-muted">
            Bantu kami menjaga kebersihan kota dengan melaporkan titik pembuangan sampah liar atau tumpukan sampah
            yang belum terangkut.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <WasteReportForm />
          </div>
          <div className="flex flex-col gap-6">
            <LocationCard />
            <ReportTipsCard />
          </div>
        </div>
      </form>

      <ReportSuccessDialog isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </FormProvider>
  )
}

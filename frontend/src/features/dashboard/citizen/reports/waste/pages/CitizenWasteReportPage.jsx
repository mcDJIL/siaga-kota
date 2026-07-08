import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { WasteReportForm } from '../components/WasteReportForm'
import { LocationCard } from '../components/LocationCard'
import { ReportTipsCard } from '../components/ReportTipsCard'
import { ReportSuccessDialog } from '../components/ReportSuccessDialog'
import { wasteReportSchema } from '../validation/wasteReportSchema'

export function CitizenWasteReportPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const methods = useForm({
    resolver: zodResolver(wasteReportSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      latitude: -6.1944,
      longitude: 106.8229,
      images: [],
    },
  })

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      toast.success('Laporan berhasil dikirim.')
      setIsSuccessOpen(true)
      methods.reset()
    } catch {
      toast.error('Gagal mengirim laporan.')
    }
  }

  const onInvalid = () => {
    toast.error('Harap lengkapi semua data.')
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

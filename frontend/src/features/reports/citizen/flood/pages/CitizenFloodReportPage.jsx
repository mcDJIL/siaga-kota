import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Bell, Eye, ShieldCheck } from 'lucide-react'
import { FloodReportForm } from '../components/FloodReportForm'
import { ReportSuccessDialog } from '../../../shared/components/ReportSuccessDialog'
import { floodReportSchema } from '../validation/floodReportSchema'

const GUIDANCE_CARDS = [
  {
    title: 'Verifikasi Cepat',
    description: 'Laporan Anda akan langsung diverifikasi oleh tim pusat kendali dalam waktu kurang dari 5 menit.',
    icon: ShieldCheck,
  },
  {
    title: 'Privasi Terjaga',
    description: 'Identitas pelapor bersifat anonim untuk umum, hanya dapat diakses oleh petugas berwenang.',
    icon: Eye,
  },
  {
    title: 'Pantau Status',
    description: 'Dapatkan notifikasi setiap kali ada pembaruan status penanganan pada laporan Anda.',
    icon: Bell,
  },
]

export function CitizenFloodReportPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const methods = useForm({
    resolver: zodResolver(floodReportSchema),
    defaultValues: {
      title: '',
      severity: '',
      address: 'Jl. Jendral Sudirman No. 12, Jakarta Selatan',
      latitude: -6.2088,
      longitude: 106.8229,
      description: '',
      agreement: false,
      images: [],
    },
  })

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      toast.success('Laporan banjir berhasil dikirim.')
      setIsSuccessOpen(true)
      methods.reset()
    } catch {
      toast.error('Gagal mengirim laporan.')
    }
  }

  const onInvalid = () => {
    toast.error('Harap lengkapi data.')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8 p-4 sm:p-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-[32px]">
            Lapor Banjir
          </h1>
          <p className="max-w-2xl text-base text-text-muted">
            Bantu petugas dengan memberikan informasi banjir yang akurat di lokasi Anda.
          </p>
        </header>

        <FloodReportForm />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {GUIDANCE_CARDS.map((card) => (
            <div key={card.title} className="flex flex-col gap-3 rounded-2xl bg-bg-blue-soft p-6">
              <card.icon className="h-6 w-6 text-navy" aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold text-navy">{card.title}</h3>
              <p className="text-sm font-medium tracking-[0.14px] text-text-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </form>

      <ReportSuccessDialog
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message="Laporan banjir Anda berhasil dikirim dan akan segera ditindaklanjuti oleh petugas."
      />
    </FormProvider>
  )
}

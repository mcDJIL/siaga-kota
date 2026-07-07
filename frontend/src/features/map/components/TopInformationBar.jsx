import { MapPin } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

export function TopInformationBar() {
  return (
    <div className="flex flex-col items-start gap-3 bg-brand-green-light/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p className="flex items-center gap-2 text-sm font-medium text-[#002110] sm:text-base">
        <MapPin size={18} className="shrink-0 text-brand-green-dark" aria-hidden="true" />
        Lihat laporan dan prediksi banjir di kotamu. Login untuk melapor atau melihat detail.
      </p>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <Button variant="ghost" size="sm" className="border border-navy/20">
          Login
        </Button>
        <Button variant="primary" size="sm">
          Daftar
        </Button>
      </div>
    </div>
  )
}

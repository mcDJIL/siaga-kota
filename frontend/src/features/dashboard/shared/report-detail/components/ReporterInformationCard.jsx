import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

export function ReporterInformationCard({ report }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-labelledby="reporter-information-heading"
      className="flex flex-col gap-6 rounded-xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div>
        <h2 id="reporter-information-heading" className="text-base font-normal text-navy">
          Informasi Pelapor
        </h2>
        <hr className="mt-4 border-border-muted" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <p className="text-base text-badge-neutral">Nama Pelapor</p>
          <p className="text-base font-bold text-navy">{report.reporterName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base text-badge-neutral">Waktu Laporan</p>
          <p className="text-base font-bold text-navy">{report.submittedAt}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-base text-badge-neutral">Lokasi Kejadian</p>
        <p className="flex items-center gap-2 text-base font-semibold text-navy">
          <MapPin className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
          {report.address}
        </p>
        <p className="flex items-center gap-2 pl-6 text-sm text-badge-neutral">
          <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Koordinat: {report.coordinates.lat}, {report.coordinates.lng}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-base text-badge-neutral">Deskripsi Laporan</p>
        <p className="break-words text-base leading-relaxed text-text-muted">{report.description}</p>
      </div>
    </motion.section>
  )
}

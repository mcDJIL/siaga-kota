import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

const TIPS = [
  'Pastikan foto terlihat jelas dan mencakup area sekitar.',
  'Gunakan fitur GPS untuk koordinat otomatis yang akurat.',
  'Laporan Anda akan diverifikasi dalam waktu maksimal 24 jam.',
]

export function ReportTipsCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col gap-4 rounded-2xl border border-brand-green-light bg-brand-green-light/30 p-6"
    >
      <h3 className="flex items-center gap-2 font-display text-sm font-extrabold tracking-[0.14px] text-[#00522F]">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        Tips Laporan Efektif
      </h3>
      <ul className="flex flex-col gap-3">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#006D40]" aria-hidden="true" />
            <span className="text-[13px] leading-[19.5px] text-[#00522F]">{tip}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

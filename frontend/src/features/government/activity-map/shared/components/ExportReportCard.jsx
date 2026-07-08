import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export function ExportReportCard({ updateTime, onExportClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-navy-light p-6 shadow-[0_4px_16px_0_rgba(26,54,93,0.08)]"
    >
      <div className="pointer-events-none absolute top-[-40px] right-[-40px] h-[106px] w-20 rounded-full bg-white/10" aria-hidden="true" />

      <h3 className="font-heading text-xl font-bold text-white">System Status Normal</h3>
      <p className="text-base text-navy-lighter/80">AI monitoring active. Heatmap terakhir diperbarui {updateTime}.</p>

      <button
        type="button"
        onClick={onExportClick}
        className="mt-2 flex items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-medium text-navy shadow-sm transition-colors hover:bg-bg-blue-soft"
      >
        <Download className="h-[18px] w-[18px]" aria-hidden="true" />
        Export Daily Report
      </button>
    </motion.div>
  )
}

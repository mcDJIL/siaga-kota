import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { WasteReportsTable } from '../components/WasteReportsTable'
import { WASTE_REPORTS, WASTE_REPORTS_TOTAL } from '../data/wasteReports'

export function OfficerWasteReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <Trash2 className="h-6 w-6 text-navy" aria-hidden="true" />
          <h1 className="font-heading text-2xl font-semibold tracking-[-0.4px] text-navy sm:text-[32px] sm:leading-10 sm:tracking-[-0.8px]">
            Laporan Sampah
          </h1>
        </div>
        <p className="text-base text-text-muted">Kelola dan pantau semua laporan sampah yang masuk dari warga.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <WasteReportsTable reports={WASTE_REPORTS} totalCount={WASTE_REPORTS_TOTAL} />
      </motion.div>
    </div>
  )
}

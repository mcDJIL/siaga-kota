import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DepartmentDetailModal } from './DepartmentDetailModal'

function rateColor(rate) {
  if (rate >= 90) return 'bg-brand-green text-brand-green'
  if (rate >= 80) return 'bg-badge-gold text-[#715C00]'
  return 'bg-[#BA1A1A] text-[#BA1A1A]'
}

export function DepartmentPerformanceCard({ departments = [] }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  function handleOpen(department) {
    setSelectedDepartment(department)
    toast.success('Data instansi berhasil dimuat.')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-6 rounded-xl border border-bg-blue-lighter bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-text-body">Kinerja Instansi</h3>
          <p className="text-base text-text-muted">Completion rate within 24 hours.</p>
        </div>

        <div className="flex flex-col gap-4">
          {departments.map((department) => {
            const [barColor, textColor] = rateColor(department.value).split(' ')

            return (
              <button
                key={department.id}
                type="button"
                onClick={() => handleOpen(department)}
                aria-haspopup="dialog"
                className="flex flex-col gap-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.6px] text-text-body">{department.name}</span>
                  <span className={`text-xs font-bold tracking-[0.6px] ${textColor}`}>{department.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-bg-blue-lighter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${department.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-2 rounded-full ${barColor}`}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>

      <DepartmentDetailModal
        department={selectedDepartment}
        isOpen={Boolean(selectedDepartment)}
        onClose={() => setSelectedDepartment(null)}
      />
    </>
  )
}

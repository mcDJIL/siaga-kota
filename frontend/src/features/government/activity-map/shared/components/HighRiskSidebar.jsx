import { motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { RiskDistrictCard } from './RiskDistrictCard'

export function HighRiskSidebar({ districts, selectedDistrictId, onSelectDistrict }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col rounded-xl border border-[#C4C6CF] bg-bg-soft p-6 shadow-[0_4px_16px_0_rgba(26,54,93,0.08)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-body">High-Density Districts</h3>
        <button type="button" aria-label="Opsi lainnya" className="text-text-muted hover:text-navy">
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-auto pr-1">
        {districts.map((district) => (
          <RiskDistrictCard
            key={district.id}
            district={district}
            isActive={selectedDistrictId === district.id}
            onSelect={onSelectDistrict}
          />
        ))}
      </div>
    </motion.div>
  )
}

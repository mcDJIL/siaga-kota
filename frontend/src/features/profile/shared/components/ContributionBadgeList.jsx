import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '../../../../components/ui/Modal'

export function ContributionBadgeList({ badges }) {
  const [selectedBadge, setSelectedBadge] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]"
    >
      <h3 className="text-sm font-medium text-navy">Lencana Kontribusi</h3>

      <div className="flex items-center gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => setSelectedBadge(badge)}
              aria-label={`Lihat detail badge ${badge.label}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-light shadow-sm"
              >
                <Icon className="h-5 w-5 text-brand-green-dark" aria-hidden="true" />
              </motion.span>
              <span className="text-center text-[10px] text-text-body">{badge.label}</span>
            </button>
          )
        })}
      </div>

      <Modal isOpen={Boolean(selectedBadge)} onClose={() => setSelectedBadge(null)} title={selectedBadge?.label} className="max-w-sm items-center text-center">
        {selectedBadge && (
          <div className="flex flex-col items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-light">
              <selectedBadge.icon className="h-7 w-7 text-brand-green-dark" aria-hidden="true" />
            </span>
            <p className="text-sm text-text-muted">{selectedBadge.description}</p>
            <div className="flex w-full flex-col gap-2 rounded-xl bg-bg-blue-soft p-4 text-left">
              <div>
                <p className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Syarat</p>
                <p className="text-sm text-navy">{selectedBadge.requirement}</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <CheckCircle2 className="h-4 w-4 text-brand-green-dark" aria-hidden="true" />
                <span className="text-sm text-navy">Diperoleh pada {selectedBadge.earnDate}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}

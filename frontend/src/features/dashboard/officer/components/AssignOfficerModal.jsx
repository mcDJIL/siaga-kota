import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'
import { OfficerSelector } from './OfficerSelector'

export function AssignOfficerModal({ isOpen, task, officers, onClose, onAssign, isLoading = false }) {
  const [selectedOfficerId, setSelectedOfficerId] = useState(null)

  useEffect(() => {
    if (isOpen) setSelectedOfficerId(null)
  }, [isOpen, task])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assign-modal-heading"
          className="fixed inset-0 z-[400] flex items-center justify-center bg-navy/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="assign-modal-heading" className="text-lg font-semibold text-navy">
                  Tugaskan Petugas
                </h2>
                {task && <p className="text-sm text-text-muted">{task.title}</p>}
              </div>
              <button type="button" onClick={onClose} aria-label="Tutup dialog" className="shrink-0 text-badge-neutral">
                <X className="h-5 w-5" />
              </button>
            </div>

            <OfficerSelector officers={officers} selectedOfficerId={selectedOfficerId} onSelect={setSelectedOfficerId} />

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading} className="flex-1 text-text-muted">
                Batal
              </Button>
              <Button
                type="button"
                variant="navy"
                disabled={!selectedOfficerId || isLoading}
                onClick={() => onAssign(selectedOfficerId)}
                className="flex-1 disabled:opacity-40"
              >
                {isLoading ? 'Menugaskan...' : 'Tugaskan'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

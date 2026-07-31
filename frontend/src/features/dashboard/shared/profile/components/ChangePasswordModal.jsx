import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ChangePasswordForm } from './ChangePasswordForm'

export function ChangePasswordModal({ isOpen, onClose, onSubmit, isLoading = false }) {
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
          aria-labelledby="change-password-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4"
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
            <div className="flex items-start justify-between">
              <h2 id="change-password-heading" className="text-lg font-semibold text-navy">
                Ubah Kata Sandi
              </h2>
              <button type="button" onClick={onClose} aria-label="Tutup dialog" className="text-badge-neutral" disabled={isLoading}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <ChangePasswordForm onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, X } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'

export function LogoutDialog({ isOpen, onClose, onConfirm }) {
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
          aria-labelledby="logout-dialog-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6"
          >
            <div className="flex items-start justify-between">
              <h2 id="logout-dialog-heading" className="text-lg font-semibold text-navy">
                Keluar dari Akun
              </h2>
              <button type="button" onClick={onClose} aria-label="Tutup dialog" className="text-badge-neutral">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-text-muted">Anda yakin ingin keluar dari SiagaKota City Official Panel?</p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse">
              <Button type="button" variant="navy" onClick={onConfirm} className="bg-[#93000A] sm:flex-1">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Keluar
              </Button>
              <Button type="button" variant="ghost" onClick={onClose} className="text-text-muted sm:flex-1">
                Batal
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

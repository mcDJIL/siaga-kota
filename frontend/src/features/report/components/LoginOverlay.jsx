import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

export function LoginOverlay({ onLoginClick, onRegisterClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/60 p-8 text-center backdrop-blur-[1px] sm:p-10"
    >
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-light shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
        <Lock size={26} className="text-white" aria-hidden="true" />
      </span>
      <h2 className="font-display text-base font-bold text-navy-light">Login untuk Melapor</h2>
      <p className="max-w-md text-base leading-6 text-text-muted">
        Silakan login atau daftar terlebih dahulu untuk melaporkan masalah di lingkunganmu demi akurasi data dan
        pemberian reward.
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-4 sm:flex-row">
        <Button variant="secondary" size="md" className="flex-1 py-4" onClick={onLoginClick}>
          Login Sekarang
        </Button>
        <Button
          size="md"
          className="flex-1 bg-accent-green py-4 hover:bg-accent-green/90"
          onClick={onRegisterClick}
        >
          Daftar Akun
        </Button>
      </div>
    </motion.div>
  )
}

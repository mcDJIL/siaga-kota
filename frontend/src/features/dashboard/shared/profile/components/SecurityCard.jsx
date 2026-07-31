import { motion } from 'framer-motion'
import { KeyRound, LogOut } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'

export function SecurityCard({ onChangePassword, onLogout, onSave, isLoading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      <h3 className="text-base font-bold tracking-[1.6px] text-text-body uppercase">Keamanan &amp; Sesi</h3>

      <motion.button
        type="button"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        onClick={onChangePassword}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg border-2 border-border-muted py-4 text-base text-text-body disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <KeyRound className="h-5 w-5" aria-hidden="true" />
        Ubah Kata Sandi
      </motion.button>

      <motion.button
        type="button"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        onClick={onLogout}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#FFDAD6] py-4 text-base text-[#93000A] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
        Keluar
      </motion.button>

      <Button type="button" variant="navy" size="block" onClick={onSave} disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
      </Button>
    </motion.div>
  )
}

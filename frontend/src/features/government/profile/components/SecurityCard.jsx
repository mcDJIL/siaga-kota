import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'

export function SecurityCard({ onOpenChangePassword }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="flex flex-col gap-3 rounded-2xl border border-[#DCE9FF] bg-white p-6 shadow-sm"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Shield className="h-5 w-5" aria-hidden="true" />
        Keamanan
      </h3>
      <p className="text-sm text-text-muted">Update password secara berkala untuk menjaga keamanan akun admin Anda.</p>
      <Button variant="navy" onClick={onOpenChangePassword}>
        Ubah Kata Sandi
      </Button>
    </motion.div>
  )
}

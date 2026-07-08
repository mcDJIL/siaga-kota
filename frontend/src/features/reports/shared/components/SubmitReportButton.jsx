import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export function SubmitReportButton({ label = 'Kirim Laporan' }) {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      aria-label={label}
      className="flex items-center justify-center gap-3 rounded-xl bg-navy px-12 py-4 font-display text-xl font-semibold text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] disabled:opacity-60"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {isSubmitting ? 'Mengirim...' : label}
    </motion.button>
  )
}

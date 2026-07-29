import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export function SubmitReportButton() {
  const {
    formState: { isSubmitting, isValid, errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <motion.button
        type="submit"
        disabled={isSubmitting || !isValid}
        whileHover={{ scale: isSubmitting || !isValid ? 1 : 1.01 }}
        whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        aria-label="Kirim laporan sekarang"
        className="flex items-center justify-center gap-3 rounded-2xl bg-[#006D40] py-5 text-xl font-bold text-white shadow-[0_20px_25px_-5px_rgba(0,109,64,0.30),0_8px_10px_-6px_rgba(0,109,64,0.30)] disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? 'Mengirim...' : 'Kirim Laporan Sekarang'}
      </motion.button>
      <p className="text-center text-xs font-semibold tracking-[0.6px] text-text-muted">
        Setiap laporan membantu kota lebih hijau.
      </p>
      {!isValid && Object.keys(errors).length > 0 && (
        <div className="text-xs text-[#BA1A1A]">
          {Object.entries(errors).map(([key, error]) => (
            <p key={key}>• {error?.message || `${key} tidak valid`}</p>
          ))}
        </div>
      )}
    </div>
  )
}

import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ErrorLayout } from '@/layouts/ErrorLayout'
import { ErrorIllustration } from '@/components/common/ErrorIllustration'
import { ErrorActionButtons } from '@/components/common/ErrorActionButtons'
import { useErrorNavigation } from '@/hooks/useErrorNavigation'

export function NotFoundPage() {
  const location = useLocation()
  const { goHome, goBack, goToDashboard } = useErrorNavigation()

  const currentTime = new Date().toLocaleString('id-ID')

  const actions = [
    {
      label: 'Kembali ke Beranda',
      variant: 'primary',
      onClick: goHome,
    },
    {
      label: 'Kembali',
      variant: 'secondary',
      onClick: goBack,
    },
    {
      label: 'Dashboard',
      variant: 'ghost',
      onClick: () => goToDashboard('citizen'),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <ErrorLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-2xl bg-white p-8 shadow-lg sm:p-12"
      >
        <motion.div variants={itemVariants}>
          <ErrorIllustration type="404" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <h1 className="text-6xl font-bold text-navy sm:text-7xl">404</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-navy sm:text-3xl">Halaman Tidak Ditemukan</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <p className="text-base text-slate-600 sm:text-lg">
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 space-y-3 text-center text-sm text-slate-500">
          <p className="font-medium">
            URL yang diminta: <span className="break-all text-slate-700">{location.pathname}</span>
          </p>
          <p>{currentTime}</p>
          <p className="text-xs">Periksa kembali alamat URL yang Anda masukkan.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <ErrorActionButtons actions={actions} />
        </motion.div>
      </motion.div>
    </ErrorLayout>
  )
}

import { motion } from 'framer-motion'
import { ErrorLayout } from '@/layouts/ErrorLayout'
import { ErrorIllustration } from '@/components/common/ErrorIllustration'
import { ErrorActionButtons } from '@/components/common/ErrorActionButtons'
import { useErrorNavigation } from '@/hooks/useErrorNavigation'

function generateErrorId() {
  return `ERR-500-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`
}

export function InternalServerErrorPage() {
  const { reloadPage, goHome, goToDashboard } = useErrorNavigation()

  const errorId = generateErrorId()
  const currentTime = new Date().toLocaleString('id-ID')

  const actions = [
    {
      label: 'Coba Lagi',
      variant: 'primary',
      onClick: reloadPage,
    },
    {
      label: 'Kembali ke Beranda',
      variant: 'secondary',
      onClick: goHome,
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
          <ErrorIllustration type="500" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <h1 className="text-6xl font-bold text-navy sm:text-7xl">500</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-navy sm:text-3xl">Terjadi Kesalahan Pada Server</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <p className="whitespace-pre-line text-base text-slate-600 sm:text-lg">
            Terjadi kesalahan yang tidak terduga.{'\n'}Silakan coba kembali beberapa saat lagi.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 space-y-2 text-center text-sm text-slate-500">
          <p className="font-medium">
            Error ID: <span className="font-mono text-slate-700">{errorId}</span>
          </p>
          <p>Status: Internal Server Error</p>
          <p>{currentTime}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <ErrorActionButtons actions={actions} />
        </motion.div>
      </motion.div>
    </ErrorLayout>
  )
}

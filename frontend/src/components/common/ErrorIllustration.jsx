import { motion } from 'framer-motion'
import { FileSearch, AlertCircle } from 'lucide-react'

export function ErrorIllustration({ type = '404' }) {
  const illustrationVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    float: {
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  const iconVariants = {
    rotate: {
      rotate: [0, 5, -5, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  if (type === '404') {
    return (
      <motion.div
        variants={illustrationVariants}
        initial="initial"
        animate={['animate', 'float']}
        className="flex justify-center"
      >
        <div className="relative">
          <motion.div variants={iconVariants} animate="rotate">
            <FileSearch size={120} className="text-brand-green opacity-80" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <span className="text-xs font-bold text-red-600">?</span>
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === '500') {
    return (
      <motion.div
        variants={illustrationVariants}
        initial="initial"
        animate={['animate', 'float']}
        className="flex justify-center"
      >
        <div className="relative">
          <motion.div variants={iconVariants} animate="rotate">
            <AlertCircle size={120} className="text-red-500 opacity-80" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-0 h-full w-full rounded-full border-2 border-red-300"
          />
        </div>
      </motion.div>
    )
  }

  return null
}

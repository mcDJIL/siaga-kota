import { motion } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '../../../../../lib/cn'

const STATUS_CONFIG = {
  menunggu: {
    label: 'Menunggu',
    icon: Clock,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-500',
  },
  diverifikasi: {
    label: 'Terverifikasi',
    icon: CheckCircle2,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
  },
  diproses: {
    label: 'Sedang Diproses',
    icon: Clock,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-500',
  },
  selesai: {
    label: 'Selesai',
    icon: CheckCircle2,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500',
  },
  ditolak: {
    label: 'Ditolak',
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
  },
}

export function HandlingStatusCard({ status, resolutionNote }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.menunggu
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'rounded-xl border-2 p-4',
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-6 w-6 shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          <h3 className={cn('font-semibold', config.textColor)}>
            {config.label}
          </h3>
          {resolutionNote && (
            <p className={cn('text-sm mt-2', config.textColor)}>
              {resolutionNote}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

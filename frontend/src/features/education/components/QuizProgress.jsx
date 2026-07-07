import { motion } from 'framer-motion'

export function QuizProgress({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-medium text-text-muted">
        <span>
          Pertanyaan {current} dari {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-blue-light" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="h-full rounded-full bg-brand-green"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

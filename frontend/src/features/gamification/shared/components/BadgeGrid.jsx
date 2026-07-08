import { motion } from 'framer-motion'
import { BadgeCard } from './BadgeCard'

const COLUMN_CLASSES = {
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
}

export function BadgeGrid({ badges, onBadgeClick, columns = 3, size = 'md' }) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[3]}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
        >
          <BadgeCard badge={badge} onClick={onBadgeClick} size={size} />
        </motion.div>
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'
import { mapStatistics } from '../data/statisticsData'
import { StatisticCard } from './StatisticCard'

export function StatisticsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-8"
    >
      {mapStatistics.map((stat) => (
        <StatisticCard key={stat.id} {...stat} />
      ))}
    </motion.section>
  )
}

import { motion } from 'framer-motion'
import { reportStatistics } from '../data/statisticsData'

export function StatisticsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-navy-light px-4 py-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 sm:grid-cols-4">
        {reportStatistics.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center gap-1">
            <span className={`font-display text-3xl font-extrabold sm:text-4xl ${stat.valueColor}`}>{stat.value}</span>
            <span className="text-center text-sm tracking-[1.6px] text-navy-lighter uppercase">{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

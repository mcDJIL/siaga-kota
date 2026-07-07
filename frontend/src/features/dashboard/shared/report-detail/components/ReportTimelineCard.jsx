import { motion } from 'framer-motion'
import { TimelineStep } from './TimelineStep'

export function ReportTimelineCard({ timeline }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      aria-labelledby="report-timeline-heading"
      className="flex flex-col gap-6 rounded-xl border border-bg-blue-light bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <h2 id="report-timeline-heading" className="text-base font-normal text-navy">
        Status Penanganan
      </h2>

      <ol className="relative flex flex-col gap-8">
        <span className="absolute top-1 left-4 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 bg-bg-blue-lighter" aria-hidden="true" />
        {timeline.map((step) => (
          <TimelineStep key={step.id} step={step} />
        ))}
      </ol>
    </motion.section>
  )
}

import { motion } from 'framer-motion'
import { CategoryBadge } from './CategoryBadge'
import { StatusBadge } from './StatusBadge'

export function ReportRow({ report, index, onViewDetail }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-t border-bg-blue-light"
    >
      <td className="px-6 py-4">
        <p className="text-xs font-bold tracking-[0.6px] text-navy">{report.id}</p>
        <p className="font-display text-lg font-semibold text-text-body sm:text-xl">{report.title}</p>
      </td>
      <td className="px-6 py-4">
        <CategoryBadge category={report.category} />
      </td>
      <td className="px-6 py-4 text-base whitespace-pre-line text-text-muted">{report.date}</td>
      <td className="px-6 py-4">
        <StatusBadge status={report.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={() => onViewDetail(report)}
          className="text-sm font-medium tracking-[0.14px] text-navy hover:underline"
        >
          Lihat Detail
        </button>
      </td>
    </motion.tr>
  )
}

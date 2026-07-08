import { motion } from 'framer-motion'
import { ReportRow } from './ReportRow'

const COLUMNS = [
  { key: 'id', label: 'ID & Judul', align: 'left' },
  { key: 'category', label: 'Kategori', align: 'left' },
  { key: 'date', label: 'Tanggal', align: 'left' },
  { key: 'status', label: 'Status', align: 'left' },
  { key: 'action', label: 'Aksi', align: 'right' },
]

export function ReportTable({ reports, onViewDetail, emptyMessage = 'Tidak ada laporan yang cocok.' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-bg-blue-light">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-body uppercase ${
                  column.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="px-6 py-10 text-center text-sm text-badge-neutral">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            reports.map((report, index) => (
              <ReportRow key={report.id} report={report} index={index} onViewDetail={onViewDetail} />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  )
}

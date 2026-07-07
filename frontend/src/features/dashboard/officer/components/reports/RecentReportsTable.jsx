import { motion } from 'framer-motion'
import { Trash2, Waves } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { PriorityBadge } from './PriorityBadge'
import { ReportStatusBadge } from './ReportStatusBadge'
import { RECENT_REPORTS } from '../../data/dashboardData'

const CATEGORY_ICONS = { sampah: Trash2, banjir: Waves }
const CATEGORY_LABELS = { sampah: 'Sampah', banjir: 'Banjir' }

const COLUMNS = ['ID', 'Kategori', 'Judul', 'Lokasi', 'Prioritas', 'Status', 'Tanggal', 'Aksi']

export function RecentReportsTable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-2xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-bg-blue-light px-6 py-5">
        <h2 className="text-xl font-semibold text-navy">Laporan Terbaru</h2>
        <button type="button" className="text-sm font-semibold tracking-[0.14px] text-navy">
          Lihat Semua
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="bg-bg-blue-soft">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_REPORTS.map((report) => {
              const CategoryIcon = CATEGORY_ICONS[report.category]
              return (
                <tr key={report.id} className="border-t border-bg-blue-light">
                  <td className="px-6 py-4 text-base font-medium text-navy">{report.id}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-sm font-medium text-text-body">
                      <CategoryIcon className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                      {CATEGORY_LABELS[report.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-base font-semibold text-text-body">{report.title}</td>
                  <td className="px-6 py-4 text-base text-text-muted">{report.location}</td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={report.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <ReportStatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-body">{report.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="navy" size="sm" className="rounded-md px-4 py-1.5 text-xs">
                      Proses
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

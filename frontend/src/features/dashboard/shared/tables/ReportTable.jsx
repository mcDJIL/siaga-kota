import { motion } from 'framer-motion'
import { cn } from '../../../../lib/cn'
import { StatusBadge } from '../table/StatusBadge'

export const CATEGORY_STYLES = {
  banjir: { bg: 'bg-[#D6E3FF]', text: 'text-[#001B3C]', label: 'Banjir' },
  sampah: { bg: 'bg-[#FFE17C]', text: 'text-[#231B00]', label: 'Sampah' },
  kebersihan: { bg: 'bg-[#91F8B8]', text: 'text-[#002110]', label: 'Kebersihan' },
}

const DEFAULT_CATEGORY = { bg: 'bg-bg-blue-light', text: 'text-text-body', label: 'Laporan' }

const COLUMNS = ['Laporan', 'Kategori', 'Tanggal', 'Status']

export function ReportTable({ reports, onRowClick, emptyMessage = 'Belum ada laporan.' }) {
  const category = (report) => CATEGORY_STYLES[report.category] || DEFAULT_CATEGORY

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead className="bg-bg-blue-soft">
          <tr>
            {COLUMNS.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  'px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase',
                  index === COLUMNS.length - 1 && 'text-center'
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="px-6 py-8 text-center text-sm text-badge-neutral">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            reports.map((report) => {
              const Icon = report.icon
              return (
                <tr
                  key={report.id}
                  onClick={() => onRowClick?.(report)}
                  className="cursor-pointer border-t border-bg-blue-light hover:bg-bg-blue-soft/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {report.thumbnail ? (
                        <img
                          src={report.thumbnail}
                          alt={report.title}
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        />
                      ) : Icon ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-blue-light">
                          <Icon className="h-5 w-5 text-text-muted" aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-blue-light text-xs font-bold text-text-muted">
                          {report.title.substring(0, 1).toUpperCase()}
                        </span>
                      )}
                      <span className="text-base font-medium text-navy">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex w-fit items-center rounded-full px-3 py-0.5 text-[10px] font-bold tracking-[0.5px] uppercase',
                        category(report).bg,
                        category(report).text
                      )}
                    >
                      {category(report).label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-base text-text-muted">{report.date}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={report.status} />
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </motion.div>
  )
}

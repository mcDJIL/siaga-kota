import { ArrowUpDown } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { Button } from '../../../../../components/ui/Button'

export const STATUS_STYLES = {
  'menunggu-verifikasi': { label: 'Menunggu Verifikasi', className: 'bg-[#FFDAD6] text-[#93000A]' },
  terverifikasi: { label: 'Terverifikasi', className: 'bg-badge-gold/30 text-[#715C00]' },
  selesai: { label: 'Selesai', className: 'bg-bg-blue-lighter text-navy' },
  ditolak: { label: 'Ditolak', className: 'bg-[#FFB4AB] text-[#690005]' },
  'perlu-tindak-lanjut': { label: 'Perlu Tindak Lanjut', className: 'bg-[#FFE17C] text-[#7A4100]' },
}

const COLUMNS = [
  { key: 'id', label: 'ID Laporan' },
  { key: 'time', label: 'Waktu' },
  { key: 'location', label: 'Lokasi' },
  { key: 'waterLevel', label: 'Tinggi Air' },
  { key: 'status', label: 'Status' },
]

export function FloodReportTableRows({ reports, onSort, onVerify, onOpenDetail }) {
  return (
    <table className="w-full min-w-[720px] border-collapse text-left">
      <thead className="bg-bg-blue-soft">
        <tr>
          {COLUMNS.map((column) => (
            <th key={column.key} scope="col" className="px-4 py-4">
              <button
                type="button"
                onClick={() => onSort(column.key)}
                className="flex items-center gap-1 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase"
              >
                {column.label}
                <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </th>
          ))}
          <th scope="col" className="px-4 py-4 text-right text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        {reports.length === 0 ? (
          <tr>
            <td colSpan={COLUMNS.length + 1} className="px-6 py-10 text-center text-sm text-badge-neutral">
              Tidak ada laporan yang cocok.
            </td>
          </tr>
        ) : (
          reports.map((report) => {
            const status = STATUS_STYLES[report.status]
            return (
              <tr key={report.id} className="border-t border-bg-blue-light hover:bg-bg-soft">
                <td className="px-4 py-4 text-base font-medium text-text-body">{report.id}</td>
                <td className="px-4 py-4 text-base text-text-muted">{report.time}</td>
                <td className="px-4 py-4 text-base text-text-body">{report.location}</td>
                <td className={cn('px-4 py-4 text-base font-semibold', report.waterLevel > 70 ? 'text-[#BA1A1A]' : 'text-text-body')}>
                  {report.waterLevel} cm
                </td>
                <td className="px-4 py-4">
                  <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  {report.status === 'menunggu-verifikasi' ? (
                    <Button variant="navy" size="sm" className="rounded-md px-4 py-1.5 text-xs" onClick={() => onVerify(report)}>
                      Verify
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-md border border-border-muted px-4 py-1.5 text-xs"
                      onClick={() => onOpenDetail(report)}
                    >
                      Detail
                    </Button>
                  )}
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}

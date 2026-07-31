import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { AnnouncementFilterBar } from './AnnouncementFilterBar'
import { AnnouncementStatusBadge } from './AnnouncementStatusBadge'
import { formatPublishDate } from '../../utils/announcementFormatter'
import { AUDIENCE_LABELS } from '../../utils/targetColor'
import { cn } from '../../../../../lib/cn'

export function AnnouncementTable({
  items,
  totalCount,
  page,
  totalPages,
  onPageChange,
  statusFilter,
  onStatusFilterChange,
  onOpenEdit,
  onOpenDelete,
  isLoading = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] lg:col-span-8"
    >
      <div className="flex items-center justify-between border-b border-[#C4C6CF] p-6">
        <h3 className="text-xl font-semibold text-navy">Daftar Pengumuman</h3>
        <AnnouncementFilterBar statusFilter={statusFilter} onStatusFilterChange={onStatusFilterChange} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-bg-blue-soft/50">
            <tr>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Judul
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Target
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Tanggal
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Status
              </th>
              <th scope="col" className="border-b border-[#C4C6CF]/50 px-6 py-4 text-right text-xs font-bold tracking-[0.6px] text-text-muted uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="animate-pulse border-t border-[#C4C6CF]/30">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-text-muted">
                  Tidak ada pengumuman yang cocok.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id} className={cn(index > 0 && 'border-t border-[#C4C6CF]/30')}>
                  <td className="px-6 py-4 text-base font-medium text-navy">{item.title}</td>
                  <td className="px-6 py-4 text-base text-text-body">
                    {item.audienceLabel ?? AUDIENCE_LABELS[item.audience] ?? item.audience}
                  </td>
                  <td className="px-6 py-4 text-base text-text-muted">
                    {formatPublishDate(item.published_at ?? item.publishDate)}
                  </td>
                  <td className="px-6 py-4">
                    <AnnouncementStatusBadge status={item.status} label={item.statusLabel} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        aria-label={`Edit ${item.title}`}
                        onClick={() => onOpenEdit(item)}
                        className="text-navy hover:text-navy-light"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Hapus ${item.title}`}
                        onClick={() => onOpenDelete(item)}
                        className="text-[#BA1A1A] hover:text-[#93000A]"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#C4C6CF]/30 p-4 sm:flex-row">
        <p className="text-sm text-text-muted">
          Menampilkan {items.length === 0 ? 0 : (page - 1) * 5 + 1}-{(page - 1) * 5 + items.length} dari {totalCount} pengumuman
        </p>
        <nav className="flex items-center gap-2" aria-label="Navigasi halaman pengumuman">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          <span className="px-2 text-sm font-medium text-text-body">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </motion.div>
  )
}

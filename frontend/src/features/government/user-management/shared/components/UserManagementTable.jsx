import { motion } from 'framer-motion'
import { ArrowUpDown, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { cn } from '../../../../../lib/cn'
import { UserFilterBar } from './UserFilterBar'
import { UserStatusSwitch } from './UserStatusSwitch'
import { ROLE_AVATAR_STYLES, ROLE_BADGE_STYLES } from '../../utils/roleColor'
import { getInitials, formatUserCount } from '../../utils/userFormatter'

const COLUMNS = [
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'district', label: 'District' },
  { key: 'dateJoined', label: 'Date Joined' },
]

export function UserManagementTable({
  items,
  totalCount,
  page,
  totalPages,
  onPageChange,
  onSort,
  onToggleStatus,
  onOpenEdit,
  onOpenDelete,
  isLoading = false,
  ...filterProps
}) {
  const shownStart = items.length === 0 ? 0 : (page - 1) * 5 + 1
  const shownEnd = (page - 1) * 5 + items.length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-xl border border-[#C4C6CF]/30 bg-white shadow-sm"
    >
      <UserFilterBar {...filterProps} />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead className="sticky top-0 bg-bg-blue-soft">
            <tr>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-text-muted">
                No
              </th>
              {COLUMNS.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className="flex items-center gap-1 text-sm font-semibold text-text-muted"
                  >
                    {column.label}
                    <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-text-muted">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-t border-[#C4C6CF]/20 animate-pulse">
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-text-muted">
                  Tidak ada pengguna yang cocok.
                </td>
              </tr>
            ) : (
              items.map((user, index) => (
                <tr key={user.id} className="border-t border-[#C4C6CF]/20 hover:bg-bg-soft">
                  <td className="px-4 py-4 text-base text-text-muted">{(page - 1) * 5 + index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base',
                          ROLE_AVATAR_STYLES[user.role]
                        )}
                      >
                        {getInitials(user.name)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-body">{user.name}</span>
                        <span className="text-sm text-text-muted">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', ROLE_BADGE_STYLES[user.role])}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-base text-text-body">{user.district}</td>
                  <td className="px-4 py-4 text-base text-text-muted">{user.dateJoined}</td>
                  <td className="px-4 py-4">
                    <UserStatusSwitch user={user} onToggle={onToggleStatus} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        aria-label={`Hapus ${user.name}`}
                        onClick={() => onOpenDelete(user)}
                        className="text-text-muted hover:text-[#BA1A1A]"
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

      <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-[#C4C6CF]/30 bg-bg-blue-soft p-4 sm:flex-row">
        <p className="text-base text-text-muted">
          Showing {shownStart} to {shownEnd} of {formatUserCount(totalCount)} results
        </p>

        <nav className="flex items-center gap-1" aria-label="Navigasi halaman pengguna">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 3)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  'flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-base',
                  pageNumber === page ? 'border-navy bg-navy text-white' : 'border-[#C4C6CF] text-text-body'
                )}
              >
                {pageNumber}
              </button>
            ))}
          {totalPages > 3 && <span className="px-2 text-base text-text-muted">...</span>}
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C4C6CF] text-text-body disabled:opacity-40"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </motion.div>
  )
}

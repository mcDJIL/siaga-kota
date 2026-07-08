import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../../../lib/cn'

export function Pagination({ page, totalPages, onPageChange, totalItems, pageSize }) {
  const shownCount = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-bg-blue-light bg-white p-6 sm:flex-row">
      <p className="text-sm font-medium tracking-[0.14px] text-text-muted">
        Menampilkan {shownCount} dari {totalItems} laporan
      </p>

      <nav className="flex items-center gap-2" aria-label="Navigasi halaman laporan">
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-muted text-text-body disabled:opacity-40"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-label={`Halaman ${pageNumber}`}
            aria-current={pageNumber === page ? 'page' : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-lg border text-base',
              pageNumber === page ? 'border-navy text-white' : 'border-border-muted text-text-body'
            )}
          >
            {pageNumber === page && (
              <motion.span
                layoutId="report-pagination-active"
                className="absolute inset-0 -z-10 rounded-lg bg-navy"
                transition={{ type: 'spring', duration: 0.4 }}
              />
            )}
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          aria-label="Halaman berikutnya"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-muted text-text-body disabled:opacity-40"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}

const COLUMNS = ['ID', 'Kategori', 'Judul', 'Lokasi', 'Prioritas', 'Status', 'Tanggal', 'Aksi']

export function ReportTableSkeleton() {
  const rows = Array(5).fill(0)

  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]">
      <div className="flex items-center justify-between border-b border-bg-blue-light px-6 py-5">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
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
            {rows.map((_, idx) => (
              <tr key={idx} className="border-t border-bg-blue-light">
                {Array(COLUMNS.length).fill(0).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

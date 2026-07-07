import { cn } from '../../../../lib/cn'

export function DataTable({ columns, data, keyField = 'id', emptyMessage = 'Tidak ada data.' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="border-b border-border-muted bg-bg-blue-soft">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-4 text-base font-bold text-text-muted">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-badge-neutral">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row[keyField]}
                className={cn('border-t border-border-muted', index % 2 === 1 && 'bg-white/50')}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 align-middle text-base">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

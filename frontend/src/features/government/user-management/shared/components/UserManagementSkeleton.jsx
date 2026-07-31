import { motion } from 'framer-motion'

export function StatisticCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 rounded-2xl border border-[#C4C6CF]/30 bg-white p-6 shadow-sm animate-pulse"
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-8 w-32 bg-gray-200 rounded" />
      </div>
    </motion.div>
  )
}

export function UserTableSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-xl border border-[#C4C6CF]/30 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#C4C6CF]/30 p-4 bg-bg-blue-soft">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead className="bg-bg-blue-soft">
            <tr>
              {[...Array(7)].map((_, i) => (
                <th key={i} scope="col" className="px-4 py-3">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-[#C4C6CF]/20">
                {[...Array(7)].map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-4">
                    {colIdx === 1 ? (
                      // User cell dengan avatar
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex flex-col gap-1">
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                          <div className="h-2 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex items-center justify-between border-t border-[#C4C6CF]/30 bg-bg-blue-soft p-4">
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function RoleBreakdownSkeleton() {
  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded bg-gray-200 px-2 py-1 text-xs h-6 w-20 animate-pulse"
        />
      ))}
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded" />
      <div className="h-4 w-64 bg-gray-200 rounded" />
    </div>
  )
}

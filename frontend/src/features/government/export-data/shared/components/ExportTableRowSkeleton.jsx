import { motion } from 'framer-motion'
import { cn } from '../../../../../lib/cn'

export function ExportTableRowSkeleton({ index }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(index > 0 && 'border-t border-[#C4C6CF]/30')}
    >
      <td className="px-6 py-4">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
      </td>
      <td className="px-6 py-4">
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </td>
    </motion.tr>
  )
}

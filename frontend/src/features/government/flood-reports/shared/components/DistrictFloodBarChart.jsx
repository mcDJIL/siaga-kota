import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useDistrictFloodDistribution } from '../../hooks/useDistrictFloodDistribution'
import { FloodAnalyticsModal } from './FloodAnalyticsModal'

export function DistrictFloodBarChart({ district = null }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const { districts, loading } = useDistrictFloodDistribution()

  function handleBarClick(data) {
    setSelectedDistrict(data.district)
    toast.success('Detail laporan berhasil dimuat.')
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col rounded-2xl border border-border-muted/20 bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] lg:col-span-2"
      >
        <h3 className="mb-6 text-xl font-semibold text-text-body">Laporan per Kecamatan</h3>
        <div className="h-72 w-full animate-pulse rounded-lg bg-gray-200" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-2xl border border-border-muted/20 bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)] lg:col-span-2"
    >
      <h3 className="mb-6 text-xl font-semibold text-text-body">Laporan per Kecamatan</h3>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={districts}>
            <CartesianGrid vertical={false} stroke="#C4C6CF" />
            <XAxis dataKey="district" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <Tooltip cursor={{ fill: '#EFF4FF' }} />
            <Legend content={() => null} />
            <Bar
              dataKey="reports"
              name="Laporan"
              fill="#1A365D"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={800}
              onClick={handleBarClick}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <FloodAnalyticsModal district={selectedDistrict} isOpen={Boolean(selectedDistrict)} onClose={() => setSelectedDistrict(null)} />
    </motion.div>
  )
}

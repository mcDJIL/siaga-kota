import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Modal } from '../../../../../components/ui/Modal'

function DistrictDetailModal({ district, isOpen, onClose }) {
  // For now, show a simple modal - can be extended later with actual district details
  if (!district) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Analitik ${district}`} className="max-w-lg">
      <div className="flex flex-col gap-6">
        <p className="text-text-muted">Detail kecamatan untuk {district} sedang dalam pengembangan.</p>
      </div>
    </Modal>
  )
}

export function DistrictBarChart({ districts = [] }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [activeDistrict, setActiveDistrict] = useState(null)

  function handleOpenDetail(district) {
    setSelectedDistrict(district ?? (districts.length > 0 ? districts[0].district : null))
    toast.success('Detail laporan berhasil dimuat.')
  }

  if (!districts || districts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)] backdrop-blur-[5px] lg:col-span-2"
      >
        <h3 className="mb-4 text-xl font-semibold text-text-body">Laporan per Kecamatan</h3>
        <div className="flex h-64 items-center justify-center text-text-muted">Data tidak tersedia</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)] backdrop-blur-[5px] lg:col-span-2"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-body">Laporan per Kecamatan</h3>
        <button
          type="button"
          onClick={() => handleOpenDetail(activeDistrict)}
          className="flex items-center gap-1 text-sm font-semibold text-brand-green"
        >
          Lihat Detail
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={districts}
            onMouseMove={(state) => setActiveDistrict(state?.activePayload?.[0]?.payload?.district ?? null)}
            onMouseLeave={() => setActiveDistrict(null)}
          >
            <CartesianGrid vertical={false} stroke="#C4C6CF" />
            <XAxis dataKey="district" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <Tooltip cursor={{ fill: '#EFF4FF' }} />
            <Legend content={() => null} />
            <Bar
              dataKey="reports"
              name="Laporan"
              fill="#38A169"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={800}
              onClick={(data) => handleOpenDetail(data.district)}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <DistrictDetailModal district={selectedDistrict} isOpen={Boolean(selectedDistrict)} onClose={() => setSelectedDistrict(null)} />
    </motion.div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Modal } from '../../../../../components/ui/Modal'
import { DISTRICT_DETAILS, DISTRICT_REPORTS } from '../../data/districtChartData'

function DistrictDetailModal({ district, isOpen, onClose }) {
  if (!district) return null
  const detail = DISTRICT_DETAILS[district]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Analitik ${district}`} className="max-w-lg">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Tren Bulanan</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detail.monthlyTrend}>
                <CartesianGrid vertical={false} stroke="#E5EEFF" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#43474E', fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" name="Laporan" fill="#38A169" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Kategori Teratas</h3>
          <ul className="flex flex-col gap-2">
            {detail.topCategories.map((category) => (
              <li key={category.name} className="flex items-center justify-between rounded-lg border border-bg-blue-light px-4 py-2.5">
                <span className="text-sm text-text-body">{category.name}</span>
                <span className="text-sm font-bold text-brand-green">{category.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export function DistrictBarChart() {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [activeDistrict, setActiveDistrict] = useState(null)

  function handleOpenDetail(district) {
    setSelectedDistrict(district ?? DISTRICT_REPORTS[0].district)
    toast.success('Detail laporan berhasil dimuat.')
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
            data={DISTRICT_REPORTS}
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

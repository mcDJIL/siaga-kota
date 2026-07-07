import { motion } from 'framer-motion'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PerformanceLegend } from './PerformanceLegend'
import { WEEKLY_PERFORMANCE } from '../../data/chartData'

export function WeeklyPerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex flex-col gap-1 pb-6">
        <h3 className="text-sm font-bold text-navy">Performa Mingguan</h3>
        <p className="text-xs text-text-muted">Penanganan: Sampah vs Banjir</p>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_PERFORMANCE} barGap={4}>
            <CartesianGrid vertical={false} stroke="#E5EEFF" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#43474E', fontWeight: 700 }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend content={() => null} />
            <Bar dataKey="sampah" name="Sampah" fill="#006D40" radius={[2, 2, 0, 0]} />
            <Bar dataKey="banjir" name="Banjir" fill="#002045" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <PerformanceLegend />
    </motion.div>
  )
}

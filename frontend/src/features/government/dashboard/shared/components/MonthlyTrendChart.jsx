import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Select } from '../../../../../components/ui/Select'
import { MONTH_OPTIONS, REPORT_TYPE_OPTIONS, YEAR_OPTIONS } from '../../data/monthlyTrendData'

export function MonthlyTrendChart({ data = [], selectedYear = 2026, onYearChange = () => {} }) {
  const [month, setMonth] = useState('Jun')
  const [reportType, setReportType] = useState('all')

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []
    const monthIndex = MONTH_OPTIONS.indexOf(month)
    return data.slice(0, monthIndex + 1)
  }, [data, month])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 rounded-xl border border-bg-blue-lighter bg-white p-6 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08),0_2px_4px_-1px_rgba(26,54,93,0.04)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-text-body">Tinjauan Tren Bulanan</h3>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          <Select
            aria-label="Pilih bulan"
            value={month}
            onChange={(event) => {
              setMonth(event.target.value)
              toast.success('Filter berhasil diterapkan.')
            }}
            className="py-2 pr-8 pl-3 text-xs"
          >
            {MONTH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Select
            aria-label="Pilih tahun"
            value={selectedYear}
            onChange={(event) => {
              onYearChange(Number(event.target.value))
              toast.success('Filter berhasil diterapkan.')
            }}
            className="py-2 pr-8 pl-3 text-xs"
          >
            {YEAR_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Select
            aria-label="Pilih jenis laporan"
            value={reportType}
            onChange={(event) => {
              setReportType(event.target.value)
              toast.success('Filter berhasil diterapkan.')
            }}
            className="py-2 pr-8 pl-3 text-xs"
          >
            {REPORT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {(reportType === 'all' || reportType === 'waste') && (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Waste</span>
          </span>
        )}
        {(reportType === 'all' || reportType === 'flood') && (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-navy" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">Flood</span>
          </span>
        )}
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: -10 }}>
            <CartesianGrid stroke="#C4C6CF" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#43474E', fontWeight: 600 }} />
            <Tooltip cursor={{ stroke: '#C4C6CF' }} />
            <Legend content={() => null} />
            {(reportType === 'all' || reportType === 'waste') && (
              <Line
                type="monotone"
                dataKey="waste"
                name="Waste"
                stroke="#006D40"
                strokeWidth={3}
                dot={{ r: 4, fill: '#006D40' }}
                isAnimationActive
                animationDuration={800}
              />
            )}
            {(reportType === 'all' || reportType === 'flood') && (
              <Line
                type="monotone"
                dataKey="flood"
                name="Flood"
                stroke="#002045"
                strokeWidth={3}
                dot={{ r: 4, fill: '#002045' }}
                isAnimationActive
                animationDuration={800}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

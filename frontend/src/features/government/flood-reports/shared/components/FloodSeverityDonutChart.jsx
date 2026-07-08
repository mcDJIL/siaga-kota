import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { FLOOD_SEVERITY } from '../../data/floodSeverityData'
import { SUMMARY_STATS } from '../../data/summaryData'

function renderLegend() {
  return (
    <ul className="mt-4 flex flex-wrap items-center justify-center gap-4">
      {FLOOD_SEVERITY.map((item) => (
        <li key={item.name} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">{item.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function FloodSeverityDonutChart() {
  const [activeIndex, setActiveIndex] = useState(null)
  const totalReports = SUMMARY_STATS.find((stat) => stat.id === 'total-laporan')?.value ?? 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col rounded-2xl border border-border-muted/20 bg-white p-6 shadow-[0_4px_12px_0_rgba(26,54,93,0.08)]"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-body">Tingkat Keparahan</h3>
      </div>

      <div className="relative mx-auto h-64 w-full max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={FLOOD_SEVERITY}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              isAnimationActive
              animationDuration={800}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {FLOOD_SEVERITY.map((item, index) => (
                <Cell key={item.name} fill={item.color} stroke="none" opacity={activeIndex === null || activeIndex === index ? 1 : 0.5} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend content={renderLegend} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 top-0 bottom-16 flex flex-col items-center justify-center">
          {activeIndex === null ? (
            <>
              <span className="text-2xl font-bold text-text-body">{totalReports.toLocaleString('en-US')}</span>
              <span className="text-sm font-semibold text-text-muted">Total Laporan</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-text-body">{FLOOD_SEVERITY[activeIndex].name}</span>
              <span className="text-sm font-semibold text-brand-green">{FLOOD_SEVERITY[activeIndex].value}%</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

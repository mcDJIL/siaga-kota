import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { WASTE_CATEGORIES } from '../../data/wasteCategoryData'

function renderLegend() {
  return (
    <ul className="mt-4 flex flex-wrap items-center justify-center gap-4">
      {WASTE_CATEGORIES.map((category) => (
        <li key={category.name} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.6px] text-text-body">{category.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function WasteCategoryDonutChart() {
  const [activeIndex, setActiveIndex] = useState(null)

  const dominant = useMemo(
    () => WASTE_CATEGORIES.reduce((max, item) => (item.value > max.value ? item : max), WASTE_CATEGORIES[0]),
    []
  )

  const centerCategory = activeIndex === null ? dominant : WASTE_CATEGORIES[activeIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)] backdrop-blur-[5px]"
    >
      <h3 className="mb-2 text-xl font-semibold text-text-body">Jenis Laporan Terbanyak</h3>

      <div className="relative mx-auto h-64 w-full max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={WASTE_CATEGORIES}
              dataKey="value"
              nameKey="name"
              innerRadius="65%"
              outerRadius="100%"
              paddingAngle={2}
              isAnimationActive
              animationDuration={800}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {WASTE_CATEGORIES.map((category, index) => (
                <Cell key={category.name} fill={category.color} stroke="none" opacity={activeIndex === null || activeIndex === index ? 1 : 0.5} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend content={renderLegend} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 top-0 bottom-16 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-body">{centerCategory.name}</span>
          <span className="text-sm font-semibold text-accent-green">{centerCategory.value}%</span>
        </div>
      </div>
    </motion.div>
  )
}

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Modal } from '../../../../../components/ui/Modal'
import { DISTRICT_ANALYTICS } from '../../data/districtFloodData'

const SEVERITY_COLORS = { Tinggi: '#BA1A1A', Sedang: '#C9A82C', Rendah: '#1A365D' }

export function FloodAnalyticsModal({ district, isOpen, onClose }) {
  if (!district) return null
  const analytics = DISTRICT_ANALYTICS[district]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Analitik Banjir · ${district}`} className="max-w-lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Total Laporan</span>
            <span className="text-sm font-bold text-text-body">
              {analytics.monthlyTrend[analytics.monthlyTrend.length - 1].value} laporan
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Completion Rate</span>
            <span className="text-sm font-bold text-brand-green">{analytics.completionRate}%</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Tren Bulanan Banjir</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyTrend}>
                <CartesianGrid vertical={false} stroke="#E5EEFF" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#43474E', fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" name="Laporan" fill="#1A365D" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Distribusi Keparahan</h3>
          <div className="flex items-center gap-6">
            <div className="h-32 w-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics.severityDistribution} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="100%" isAnimationActive animationDuration={800}>
                    {analytics.severityDistribution.map((item) => (
                      <Cell key={item.name} fill={SEVERITY_COLORS[item.name]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex flex-col gap-2">
              {analytics.severityDistribution.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: SEVERITY_COLORS[item.name] }} aria-hidden="true" />
                  <span className="text-sm text-text-body">
                    {item.name} <span className="font-bold">{item.value}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}

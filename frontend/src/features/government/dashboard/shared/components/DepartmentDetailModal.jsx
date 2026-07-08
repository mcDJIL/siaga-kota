import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Clock, User } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'

export function DepartmentDetailModal({ department, isOpen, onClose }) {
  if (!department) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={department.name} className="max-w-lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              Kepala Instansi
            </span>
            <span className="text-sm font-bold text-text-body">{department.head}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">Completion Rate</span>
            <span className="text-sm font-bold text-brand-green">{department.completionRate}%</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-bg-blue-soft p-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Avg. Response
            </span>
            <span className="text-sm font-bold text-text-body">{department.avgResponseTime}</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Tren Bulanan</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={department.monthlyTrend}>
                <CartesianGrid vertical={false} stroke="#E5EEFF" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#43474E', fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" name="Completion %" fill="#006D40" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Tugas Terbaru</h3>
          <ul className="flex flex-col gap-2">
            {department.recentTasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between rounded-lg border border-bg-blue-light px-4 py-2.5">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-muted">{task.id}</span>
                  <span className="text-sm text-text-body">{task.title}</span>
                </div>
                <span className="text-xs font-semibold text-brand-green">{task.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}

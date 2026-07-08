import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Users, TreePine, Trophy } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import { getRegionDetail } from '../data/leaderboardData'

export function DetailRegionModal({ isOpen, onClose, region }) {
  if (!region) return null

  const detail = getRegionDetail(region.region)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={region.region} className="max-w-2xl">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-bg-blue-soft p-4">
            <Users className="h-5 w-5 text-navy" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Total Anggota</p>
              <p className="text-lg font-bold text-navy">{detail.totalMembers}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-brand-green-light/30 p-4">
            <TreePine className="h-5 w-5 text-brand-green-dark" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold tracking-[0.6px] text-text-muted uppercase">Pohon Ditanam</p>
              <p className="text-lg font-bold text-navy">{detail.treesPlanted}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-navy">
            <Trophy className="h-4 w-4 text-badge-gold" aria-hidden="true" />
            Kontributor Teratas
          </h4>
          <ul className="flex flex-col gap-2">
            {detail.topContributors.map((contributor, index) => (
              <li key={contributor.name} className="flex items-center justify-between rounded-lg bg-bg-blue-soft px-4 py-2 text-sm">
                <span className="text-navy">
                  {index + 1}. {contributor.name}
                </span>
                <span className="font-bold text-brand-green-dark">{contributor.points.toLocaleString('id-ID')} XP</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-base font-semibold text-navy">Pencapaian</h4>
          <div className="flex flex-wrap gap-2">
            {detail.achievements.map((achievement) => (
              <span key={achievement} className="rounded-full bg-[#FFE17C] px-3 py-1 text-xs font-semibold text-[#231B00]">
                {achievement}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-display text-base font-semibold text-navy">Progres Bulanan</h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detail.monthlyProgress}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#43474E' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#43474E' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#EFF4FF' }} />
                <Bar dataKey="points" fill="#006D40" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Modal>
  )
}

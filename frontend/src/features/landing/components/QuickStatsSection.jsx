import { cn } from '../../../lib/cn'
import { TrashIcon, AwardIcon, TreeIcon, ShieldIcon } from './icons'

const STATS = [
  {
    icon: TrashIcon,
    label: 'Sampah Tertangani',
    value: '1,136 Ton',
    accent: 'green',
  },
  {
    icon: AwardIcon,
    label: 'Laporan Valid',
    value: '4,443',
    accent: 'navy',
  },
  {
    icon: TreeIcon,
    label: 'Pohon Ditanam',
    value: '11,354',
    accent: 'green',
  },
  {
    icon: ShieldIcon,
    label: 'Banjir Dicegah',
    value: '85% Area',
    accent: 'navy',
  },
]

function StatCard({ icon: IconComponent, label, value, accent }) {
  const isGreen = accent === 'green'

  return (
    <div
      className={cn(
        'flex flex-1 items-center gap-4 rounded-xl border-l-4 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]',
        isGreen ? 'border-brand-green' : 'border-navy'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
          isGreen ? 'bg-brand-green-light' : 'bg-navy-light'
        )}
      >
        <IconComponent className={cn('h-5 w-5', isGreen ? 'text-brand-green-dark' : 'text-navy-lighter')} />
      </div>
      <div className="flex flex-col">
        <span className="text-base uppercase text-text-muted">{label}</span>
        <span className="font-heading text-2xl font-semibold text-navy">{value}</span>
      </div>
    </div>
  )
}

export function QuickStatsSection() {
  return (
    <section className="relative z-10 mx-auto -mt-12 w-full max-w-[1440px] px-4 sm:-mt-16 sm:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

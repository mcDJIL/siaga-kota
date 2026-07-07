import { infrastructureHealth } from '../data/systemMetrics'
import { WifiIcon, WifiOffIcon } from './icons'

const STATUS_STYLES = {
  optimal: {
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-[#007243]',
    icon: WifiIcon,
    valueColor: 'text-brand-green',
    label: 'Optimal',
  },
  maintenance: {
    iconBg: 'bg-[#E6C446]',
    iconColor: 'text-[#4D3E00]',
    icon: WifiOffIcon,
    valueColor: 'text-[#715C00]',
    label: 'Maintenance',
  },
}

export function InfrastructureHealth() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h3 className="font-sans text-2xl font-bold text-navy">Kesehatan Infrastruktur</h3>
        <p className="text-base leading-6 text-text-muted">Ketersediaan dan performa sensor IoT di lapangan.</p>
      </div>

      <ul className="flex flex-col overflow-hidden rounded-3xl border border-border-muted/30 bg-white shadow-[0_4px_20px_-2px_rgba(26,54,93,0.08)]">
        {infrastructureHealth.map((sensor, index) => {
          const style = STATUS_STYLES[sensor.status]
          const IconComponent = style.icon

          return (
            <li
              key={sensor.id}
              className={
                index === 0
                  ? 'flex items-center justify-between gap-4 p-6'
                  : 'flex items-center justify-between gap-4 border-t border-border-muted/30 p-6'
              }
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}>
                  <IconComponent className={`h-4 w-5 ${style.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-lg font-bold leading-7 text-text-body">{sensor.name}</span>
                  <span className="text-sm leading-5 text-text-muted">
                    ID: {sensor.id} • {sensor.lastUpdate}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className={`font-sans text-xl font-bold leading-7 ${style.valueColor}`}>{sensor.value}</span>
                <span className={`text-[10px] font-bold tracking-[1px] uppercase ${style.valueColor}`}>
                  {style.label}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

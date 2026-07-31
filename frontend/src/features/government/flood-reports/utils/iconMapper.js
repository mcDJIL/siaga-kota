import {
  Droplets,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Clock,
  Wind,
  Gauge,
  Eye,
} from 'lucide-react'

const ICON_MAP = {
  'Droplets': Droplets,
  'AlertTriangle': AlertTriangle,
  'MapPin': MapPin,
  'TrendingUp': TrendingUp,
  'Clock': Clock,
  'Wind': Wind,
  'Gauge': Gauge,
  'Eye': Eye,
}

export function getIconComponent(iconName) {
  if (!iconName) return Droplets
  if (typeof iconName === 'function') return iconName
  return ICON_MAP[iconName] || Droplets
}

export function mapIconsToComponents(stats) {
  return stats.map((stat) => ({
    ...stat,
    icon: getIconComponent(stat.icon),
  }))
}

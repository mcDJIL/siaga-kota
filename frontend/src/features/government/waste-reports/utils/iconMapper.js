import {
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Package,
  Truck,
  FileText,
} from 'lucide-react'

const ICON_MAP = {
  'Trash2': Trash2,
  'CheckCircle2': CheckCircle2,
  'Clock': Clock,
  'TrendingUp': TrendingUp,
  'AlertCircle': AlertCircle,
  'Package': Package,
  'Truck': Truck,
  'FileText': FileText,
}

export function getIconComponent(iconName) {
  if (!iconName) return FileText
  if (typeof iconName === 'function') return iconName
  return ICON_MAP[iconName] || FileText
}

export function mapIconsToComponents(stats) {
  return stats.map((stat) => ({
    ...stat,
    icon: getIconComponent(stat.icon),
  }))
}

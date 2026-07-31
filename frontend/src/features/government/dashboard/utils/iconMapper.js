import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
} from 'lucide-react'

const ICON_MAP = {
  'FileText': FileText,
  'CheckCircle2': CheckCircle2,
  'AlertCircle': AlertCircle,
  'Users': Users,
  'TrendingUp': TrendingUp,
  'BarChart3': BarChart3,
  'Zap': Zap,
  'Target': Target,
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

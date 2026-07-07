import { Trash2, Users, Waves } from 'lucide-react'

export const ACTIVITY_MAP_CENTER = [-6.2088, 106.8456]
export const ACTIVITY_MAP_ZOOM = 12

export const MAP_LAYERS = [
  {
    id: 'sampah',
    label: 'Laporan Sampah',
    icon: Trash2,
    activeBorder: 'border-brand-green',
    activeBg: 'bg-brand-green/10',
    activeText: 'text-brand-green',
    dotActive: 'bg-brand-green',
  },
  {
    id: 'banjir',
    label: 'Laporan Banjir',
    icon: Waves,
    activeBorder: 'border-navy/20',
    activeBg: 'bg-navy/10',
    activeText: 'text-navy',
    dotActive: 'bg-navy',
  },
  {
    id: 'petugas',
    label: 'Petugas Lapangan',
    icon: Users,
    activeBorder: 'border-badge-neutral/40',
    activeBg: 'bg-badge-neutral/10',
    activeText: 'text-badge-neutral',
    dotActive: 'bg-badge-neutral',
  },
]

export const MAP_LEGEND_ITEMS = [
  { id: 'waste-report', label: 'Laporan Sampah', color: 'bg-brand-green' },
  { id: 'flood-report', label: 'Laporan Banjir', color: 'bg-navy' },
  { id: 'officer', label: 'Petugas', color: 'bg-badge-neutral' },
  { id: 'priority', label: 'Prioritas', color: 'bg-[#BA1A1A]' },
  { id: 'route', label: 'Rute', color: 'bg-navy/60' },
]

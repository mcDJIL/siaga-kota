import { CheckCircle2, Clock, FileText, Truck } from 'lucide-react'

export const SUMMARY_STATS = [
  {
    id: 'total-laporan',
    label: 'Total Laporan Sampah',
    value: 1248,
    icon: FileText,
    iconBg: 'bg-bg-blue-lighter',
    iconColor: 'text-navy',
    trend: { direction: 'up', value: '12%' },
  },
  {
    id: 'laporan-diselesaikan',
    label: 'Laporan Diselesaikan',
    value: 1102,
    icon: CheckCircle2,
    iconBg: 'bg-accent-green/20',
    iconColor: 'text-accent-green',
    trend: { direction: 'up', value: '5%' },
  },
  {
    id: 'rata-rata-respon',
    label: 'Rata-rata Waktu Respon',
    staticValue: '4j 12m',
    icon: Clock,
    iconBg: 'bg-badge-gold/30',
    iconColor: 'text-[#715C00]',
    trend: { direction: 'down', value: '2j' },
  },
  {
    id: 'sampah-ditangani',
    label: 'Sampah Ditangani (Ton)',
    value: 45.2,
    decimals: 1,
    icon: Truck,
    iconBg: 'bg-navy-light/20',
    iconColor: 'text-navy-light',
    trend: { direction: 'up', value: '8%' },
  },
]

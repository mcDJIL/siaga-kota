import { Clock, Droplet, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const SUMMARY_STATS = [
  {
    id: 'total-laporan',
    label: 'Total Laporan Banjir',
    value: 1248,
    icon: Droplet,
    iconBg: 'bg-navy/10',
    iconColor: 'text-navy',
    trend: { value: '+12%', className: 'bg-[#FFDAD6]/50 text-[#BA1A1A]' },
  },
  {
    id: 'laporan-terselesaikan',
    label: 'Laporan Terselesaikan',
    value: 986,
    total: 1248,
    icon: CheckCircle2,
    iconBg: 'bg-brand-green-light/30',
    iconColor: 'text-brand-green',
    trend: { value: '+5%', className: 'bg-brand-green-light/50 text-brand-green' },
    showProgress: true,
  },
  {
    id: 'rata-rata-respon',
    label: 'Rata-rata Waktu Respon',
    value: 14,
    unit: 'mnt',
    icon: Clock,
    iconBg: 'bg-badge-gold/20',
    iconColor: 'text-[#715C00]',
    trend: { value: '-2m', className: 'bg-brand-green-light/50 text-brand-green' },
  },
  {
    id: 'insiden-tercegah',
    label: 'Insiden Tercegah (AI)',
    value: 342,
    icon: ShieldCheck,
    iconBg: 'bg-navy/10',
    iconColor: 'text-navy',
    footnote: 'Berdasarkan Prediksi AI',
  },
]

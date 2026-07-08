import { FileText, LayoutGrid, MapPin, Megaphone, Share2, Trash2, Upload, User, UserCog, Waves } from 'lucide-react'

export const GOVERNMENT_PROFILE = {
  name: 'User',
  role: 'pemerintah',
  avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/67cb26c260d4e27b177a34859c876c367dbc32ab?width=76',
}

export const GOVERNMENT_NAV_ITEMS = [
  { label: 'Dashboard', href: '/government/dashboard', icon: LayoutGrid, end: true },
  { label: 'Laporan Sampah', href: '/government/waste-reports', icon: Trash2 },
  { label: 'Laporan Banjir', href: '/government/flood-reports', icon: Waves },
  { label: 'Peta Aktivitas', href: '/government/activity-map', icon: MapPin },
  { label: 'Prediksi AI', href: '/government/ai-prediction', icon: Share2 },
  { label: 'Manajemen Pengguna', href: '/government/user-management', icon: UserCog },
  { label: 'Pengumuman', href: '/government/announcements', icon: Megaphone },
  { label: 'Ekspor Data', href: '/government/export-data', icon: Upload },
  { label: 'Profil', href: '/government/profile', icon: User },
]

export const SUMMARY_STATS = [
  {
    id: 'total-laporan',
    label: 'Total Laporan',
    value: 1248,
    icon: FileText,
    iconBg: 'bg-bg-blue-lighter',
    iconColor: 'text-navy',
    trend: { direction: 'up', color: 'success', text: '+12% from last month' },
  },
  {
    id: 'laporan-sampah',
    label: 'Laporan Sampah',
    value: 842,
    icon: Trash2,
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    description: '67% of total reports',
  },
  {
    id: 'laporan-banjir',
    label: 'Laporan Banjir',
    value: 406,
    icon: Waves,
    iconBg: 'bg-navy-light',
    iconColor: 'text-navy-lighter',
    trend: { direction: 'up', color: 'danger', text: '+5% from last week' },
  },
]

export const COMPLETION_STAT = {
  label: 'Tingkat Penyelesaian',
  value: 92,
  description: 'Rata-rata waktu respon: 2.4 hrs',
}

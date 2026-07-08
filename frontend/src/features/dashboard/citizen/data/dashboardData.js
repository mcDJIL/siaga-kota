import {
  CheckCircle2,
  ClipboardList,
  FileText,
  LayoutGrid,
  MapPin,
  Star,
  Trash2,
  Trophy,
  User,
  Waves,
} from 'lucide-react'

export const CITIZEN_PROFILE = {
  name: 'User',
  role: 'Masyarakat',
  avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/67cb26c260d4e27b177a34859c876c367dbc32ab?width=76',
}

export const CITIZEN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/citizen/dashboard', icon: LayoutGrid, end: true },
  { label: 'Laporan Sampah', href: '/citizen/reports/create/waste', icon: Trash2 },
  { label: 'Laporan Banjir', href: '/citizen/reports/create/flood', icon: Waves },
  { label: 'Peta Aktivitas', href: '/citizen/map', icon: MapPin },
  { label: 'Pantau Laporan', href: '/citizen/reports', icon: ClipboardList },
  { label: 'Poin & Gamafikasi', href: '/citizen/gamification', icon: Star },
  { label: 'Profil', href: '/citizen/profile', icon: User },
]

export const CITIZEN_POINTS = {
  label: 'Total Poin',
  value: 2450,
}

export const CITIZEN_STATISTICS = [
  {
    id: 'total-laporan',
    icon: FileText,
    iconBg: 'bg-[#D6E3FF]',
    iconColor: 'text-navy',
    label: 'Total Laporan Saya',
    value: 24,
  },
  {
    id: 'laporan-selesai',
    icon: CheckCircle2,
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    label: 'Laporan Selesai',
    value: 18,
  },
  {
    id: 'rank-warga',
    icon: Trophy,
    iconBg: 'bg-[#FFE17C]',
    iconColor: 'text-[#231B00]',
    label: 'Rank Warga',
    value: 'Emas',
  },
]

export const BADGE_PROGRESS = {
  title: 'Menuju Badge Pohon',
  description: 'Lakukan 2 laporan lagi untuk menanam 1 pohon atas namamu!',
  currentXp: 2450,
  targetXp: 3000,
  level: 12,
}

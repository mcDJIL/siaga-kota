const user = localStorage.getItem('user')
const profile = user ? JSON.parse(user) : null

export const OFFICER_PROFILE = {
  name: profile?.name || 'User',
  role: profile?.position || 'Koordinator Lapangan',
  avatar: profile?.avatar_path || 'https://api.builder.io/api/v1/image/assets/TEMP/67cb26c260d4e27b177a34859c876c367dbc32ab?width=76',
}

export const STATISTICS = [
  {
    id: 'total-sampah',
    icon: 'trash',
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    borderColor: 'border-l-brand-green',
    badgeText: '+12% minggu ini',
    badgeColor: 'text-brand-green',
    label: 'Total Laporan Sampah',
    value: 128,
  },
  {
    id: 'total-banjir',
    icon: 'flood',
    iconBg: 'bg-[#D3E4FE]',
    iconColor: 'text-navy',
    borderColor: 'border-l-navy',
    badgeText: '+5% minggu ini',
    badgeColor: 'text-navy',
    label: 'Total Laporan Banjir',
    value: 45,
  },
  {
    id: 'sedang-diproses',
    icon: 'pending',
    iconBg: 'bg-[#FFE17C]',
    iconColor: 'text-[#231B00]',
    borderColor: 'border-l-[#715C00]',
    badgeText: 'Perlu Tindakan',
    badgeColor: 'text-[#715C00]',
    label: 'Sedang Diproses',
    value: 32,
  },
  {
    id: 'selesai',
    icon: 'completed',
    iconBg: 'bg-brand-green-lighter',
    iconColor: 'text-[#002110]',
    borderColor: 'border-l-[#74DB9D]',
    badgeText: 'Tingkat 92%',
    badgeColor: 'text-[#74DB9D]',
    label: 'Selesai',
    value: 141,
  },
]

export const RECENT_REPORTS = [
  {
    id: '#W-902',
    category: 'sampah',
    title: 'Pembuangan Ilegal',
    location: 'Pasar Minggu',
    priority: 'high',
    status: 'processing',
    date: '24 Mei',
  },
  {
    id: '#F-451',
    category: 'banjir',
    title: 'Saluran Tersumbat',
    location: 'Kebayoran Baru',
    priority: 'medium',
    status: 'pending',
    date: '24 Mei',
  },
  {
    id: '#W-899',
    category: 'sampah',
    title: 'Tumpukan Sampah',
    location: 'Tebet Barat',
    priority: 'low',
    status: 'completed',
    date: '23 Mei',
  },
]

export const NOTIFICATIONS = [
  { id: 1, title: 'Laporan Baru', description: 'Laporan sampah baru masuk di Pasar Minggu.', time: '5 menit lalu' },
  { id: 2, title: 'Tugas Selesai', description: 'Petugas menyelesaikan tugas #W-899.', time: '1 jam lalu' },
  { id: 3, title: 'Peringatan Banjir', description: 'Status siaga naik di Kebayoran Baru.', time: '3 jam lalu' },
]

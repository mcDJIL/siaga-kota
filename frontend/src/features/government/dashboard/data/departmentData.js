export const DEPARTMENTS = [
  {
    id: 'dinas-kebersihan',
    name: 'Dinas Kebersihan',
    head: 'Ir. Bambang Sutrisno',
    completionRate: 94,
    avgResponseTime: '1.8 jam',
    monthlyTrend: [
      { month: 'Feb', value: 82 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 88 },
      { month: 'Mei', value: 91 },
      { month: 'Jun', value: 94 },
    ],
    recentTasks: [
      { id: '#RPT-088', title: 'Illegal Dumping - Taman Suropati Utara', status: 'Dalam Proses' },
      { id: '#RPT-082', title: 'Tumpukan Sampah - Pasar Minggu', status: 'Selesai' },
      { id: '#RPT-079', title: 'Kontainer Penuh - Kebayoran Baru', status: 'Selesai' },
    ],
  },
  {
    id: 'dinas-pu',
    name: 'Dinas PU (Tata Air)',
    head: 'Dra. Siti Rahayu, M.T.',
    completionRate: 88,
    avgResponseTime: '2.6 jam',
    monthlyTrend: [
      { month: 'Feb', value: 79 },
      { month: 'Mar', value: 81 },
      { month: 'Apr', value: 84 },
      { month: 'Mei', value: 86 },
      { month: 'Jun', value: 88 },
    ],
    recentTasks: [
      { id: '#RPT-089', title: 'Flood Warning - Jl. Sudirman Kav 21', status: 'Mendesak' },
      { id: '#RPT-087', title: 'Drainage Blocked - Pasar Baru Block B', status: 'Menunggu' },
      { id: '#RPT-075', title: 'Saluran Tersumbat - Kebayoran Baru', status: 'Selesai' },
    ],
  },
  {
    id: 'satpol-pp',
    name: 'Satpol PP',
    head: 'Kompol Agus Wijaya',
    completionRate: 76,
    avgResponseTime: '3.4 jam',
    monthlyTrend: [
      { month: 'Feb', value: 68 },
      { month: 'Mar', value: 70 },
      { month: 'Apr', value: 72 },
      { month: 'Mei', value: 74 },
      { month: 'Jun', value: 76 },
    ],
    recentTasks: [
      { id: '#RPT-071', title: 'Pelanggaran Tata Ruang - Tebet Barat', status: 'Dalam Proses' },
      { id: '#RPT-066', title: 'Penertiban PKL - Pasar Minggu', status: 'Selesai' },
    ],
  },
]

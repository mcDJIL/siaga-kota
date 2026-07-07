export const systemMetrics = [
  {
    icon: 'signal',
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    value: '42/45',
    label: 'Sensor Aktif & Optimal',
  },
  {
    icon: 'sync',
    iconBg: 'bg-navy-light/10',
    iconColor: 'text-navy',
    value: '60 Detik',
    label: 'Interval Sinkronisasi Data',
  },
  {
    icon: 'target',
    iconBg: 'bg-badge-gold/20',
    iconColor: 'text-[#715C00]',
    value: '98.2%',
    label: 'Akurasi Prediksi AI',
  },
]

export const historicalComparison = [
  { label: 'Sen', current: 30, average: 45 },
  { label: 'Sel', current: 40, average: 46 },
  { label: 'Rab', current: 45, average: 44 },
  { label: 'Kam', current: 60, average: 47 },
  { label: 'Jum', current: 75, average: 48 },
  { label: 'Sab', current: 55, average: 45 },
  { label: 'Min', current: 35, average: 43 },
]

export const infrastructureHealth = [
  {
    id: 'JK-001',
    name: 'Downtown District',
    lastUpdate: 'Terakhir online: 1m yang lalu',
    value: '99.8%',
    status: 'optimal',
  },
  {
    id: 'JK-005',
    name: 'Riverside South',
    lastUpdate: 'Terakhir online: 3m yang lalu',
    value: '94.2%',
    status: 'optimal',
  },
  {
    id: 'JK-012',
    name: 'East Gate Reservoir',
    lastUpdate: 'Pemeliharaan terjadwal',
    value: '72.1%',
    status: 'maintenance',
  },
]

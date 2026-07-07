export const OFFICER_PROFILE_DATA = {
  employeeId: '#44920',
  displayName: 'User',
  fullName: 'Ahmad Santoso',
  nip: '198204152008011004',
  email: 'ahmad.santoso@siagakota.go.id',
  phone: '+62 812-3456-7890',
  jabatan: 'Koordinator Lapangan',
  departemen: 'Dinas PUPR',
  avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/67cb26c260d4e27b177a34859c876c367dbc32ab?width=200',
}

export const NOTIFICATION_PREFERENCES = [
  {
    id: 'laporan-baru',
    icon: 'file',
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-[#007243]',
    title: 'Laporan Baru',
    description: 'Dapatkan pemberitahuan setiap ada laporan warga masuk.',
    enabled: true,
  },
  {
    id: 'peringatan-darurat',
    icon: 'alert',
    iconBg: 'bg-[#FFDAD6]',
    iconColor: 'text-[#93000A]',
    title: 'Peringatan Darurat',
    description: 'Notifikasi prioritas tinggi untuk banjir dan cuaca ekstrem.',
    enabled: true,
  },
  {
    id: 'update-sistem',
    icon: 'system',
    iconBg: 'bg-bg-blue-lighter',
    iconColor: 'text-navy',
    title: 'Update Sistem',
    description: 'Info terbaru mengenai fitur dan pemeliharaan platform.',
    enabled: false,
  },
]

export const DEPARTMENT_OPTIONS = ['BPBD', 'Dinas Kebersihan', 'Dinas PU', 'Satpol PP']

export const GOVERNMENT_PROFILE_DATA = {
  name: 'Budi Santoso',
  email: 'budi.santoso@siagakota.go.id',
  phone: '+62 812 3456 7890',
  department: 'Manajemen Krisis (BPBD)',
  role: 'Admin Kota',
  agencyBadge: 'BPBD',
  employeeId: 'SK-2023-084',
  institution: 'BPBD Pusat',
  region: 'Sektor Utara',
  avatar:
    'https://api.builder.io/api/v1/image/assets/TEMP/67cb26c260d4e27b177a34859c876c367dbc32ab?width=200',
}

export const NOTIFICATION_SETTINGS = [
  {
    id: 'flood-critical-alert',
    label: 'Peringatan Banjir Kritis',
    description: 'Terima SMS dan Email saat level air mencapai ambang batas bahaya.',
    checked: true,
  },
  {
    id: 'ai-anomaly-report',
    label: 'Laporan Anomali AI',
    description: 'Notifikasi sistem saat AI mendeteksi pola cuaca yang tidak biasa.',
    checked: true,
  },
  {
    id: 'weekly-system-update',
    label: 'Update Sistem Mingguan',
    description: 'Ringkasan performa sensor dan metrik sistem dikirim ke email.',
    checked: false,
  },
]

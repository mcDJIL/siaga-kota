export const TARGET_OPTIONS = ['Semua', 'Warga', 'Petugas', 'Pemerintah']
export const STATUS_OPTIONS = ['Aktif', 'Draft', 'Arsip']

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Peringatan Banjir Area Selatan',
    body: 'Warga di area selatan Jember diimbau waspada terhadap potensi banjir akibat curah hujan tinggi dalam 48 jam ke depan.',
    target: 'Semua',
    publishDate: '2023-10-12',
    status: 'Aktif',
  },
  {
    id: 'ann-2',
    title: 'Jadwal Pemeliharaan Server AI',
    body: 'Sistem prediksi AI akan mengalami pemeliharaan terjadwal. Petugas diharap memantau laporan secara manual selama proses berlangsung.',
    target: 'Petugas',
    publishDate: '2023-10-15',
    status: 'Draft',
  },
  {
    id: 'ann-3',
    title: 'Sosialisasi Pengelolaan Sampah',
    body: 'Dinas Kebersihan akan mengadakan sosialisasi pengelolaan sampah rumah tangga di setiap kecamatan mulai minggu depan.',
    target: 'Warga',
    publishDate: '2023-10-20',
    status: 'Aktif',
  },
  {
    id: 'ann-4',
    title: 'Evaluasi Kinerja Triwulan Instansi',
    body: 'Seluruh instansi terkait diminta menyerahkan laporan kinerja triwulan paling lambat akhir bulan ini.',
    target: 'Pemerintah',
    publishDate: '2023-09-28',
    status: 'Arsip',
  },
  {
    id: 'ann-5',
    title: 'Darurat: Luapan Sungai Bedadung',
    body: 'Status siaga darurat ditetapkan akibat luapan Sungai Bedadung. Warga di bantaran sungai diminta segera mengungsi ke titik evakuasi terdekat.',
    target: 'Semua',
    publishDate: '2023-11-02',
    status: 'Aktif',
  },
  {
    id: 'ann-6',
    title: 'Kampanye Kurangi Sampah Plastik',
    body: 'Ajakan kepada seluruh warga untuk mengurangi penggunaan kantong plastik sekali pakai mulai bulan depan.',
    target: 'Warga',
    publishDate: '2023-11-05',
    status: 'Draft',
  },
]

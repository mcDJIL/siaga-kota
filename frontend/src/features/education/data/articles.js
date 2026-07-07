export const EDUCATION_CATEGORIES = [
  {
    slug: 'sampah',
    label: 'Manajemen Sampah',
    iconBg: 'bg-brand-green-light',
    iconColor: 'text-brand-green-dark',
    accentColor: 'text-brand-green',
  },
  {
    slug: 'banjir',
    label: 'Mitigasi Banjir',
    iconBg: 'bg-bg-blue-lighter',
    iconColor: 'text-navy',
    accentColor: 'text-navy',
  },
]

export const ARTICLES = [
  {
    slug: 'cara-memilah-sampah-rumah-tangga',
    title: 'Cara Memilah Sampah Rumah Tangga',
    excerpt: 'Langkah praktis mengurangi jejak karbon dari dapur Anda.',
    category: 'sampah',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/1d8c46a6f4ab9fbf8dcf7c619fcf0fe7a9acce78?width=584',
    author: 'Tim Edukasi SiagaKota',
    publishDate: '2026-05-12',
    readingTime: '4 menit baca',
    content: [
      { type: 'paragraph', text: 'Memilah sampah rumah tangga adalah langkah pertama menuju pengelolaan limbah yang bertanggung jawab. Dengan memisahkan sampah organik, anorganik, dan B3 sejak dari rumah, proses daur ulang menjadi jauh lebih efektif.' },
      { type: 'heading', text: 'Mengapa Memilah Sampah Itu Penting' },
      { type: 'paragraph', text: 'Sampah yang tercampur akan sulit didaur ulang dan berakhir di tempat pembuangan akhir (TPA), memperparah pencemaran tanah dan air. Memilah sejak awal membantu mengurangi volume sampah yang harus diangkut.' },
      { type: 'image', src: 'https://api.builder.io/api/v1/image/assets/TEMP/1d8c46a6f4ab9fbf8dcf7c619fcf0fe7a9acce78?width=584', alt: 'Memilah sampah rumah tangga' },
      { type: 'heading', text: 'Langkah-Langkah Memilah Sampah' },
      { type: 'list', items: [
        'Siapkan minimal 3 wadah: organik, anorganik, dan B3.',
        'Bilas kemasan bekas makanan sebelum dibuang ke wadah anorganik.',
        'Pisahkan baterai, lampu, dan elektronik kecil ke wadah B3.',
        'Kumpulkan sampah organik untuk dijadikan kompos.',
      ] },
      { type: 'quote', text: 'Sampah bukan masalah jika kita tahu cara mengelolanya sejak dari sumbernya.' },
      { type: 'highlight', title: 'Fakta Menarik', text: 'Sekitar 60% sampah rumah tangga di Indonesia adalah sampah organik yang sebenarnya bisa diolah menjadi kompos.' },
      { type: 'tip', title: 'Tips Cepat', text: 'Gunakan kantong berwarna berbeda untuk tiap jenis sampah agar lebih mudah dikenali oleh seluruh anggota keluarga.' },
    ],
  },
  {
    slug: 'panduan-kompos-mandiri',
    title: 'Panduan Kompos Mandiri',
    excerpt: 'Ubah limbah organik menjadi pupuk nutrisi tinggi.',
    category: 'sampah',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/4f02fdb6ce054dec6036db6dc5767854ab058e92?width=584',
    author: 'Tim Edukasi SiagaKota',
    publishDate: '2026-04-28',
    readingTime: '5 menit baca',
    content: [
      { type: 'paragraph', text: 'Kompos mandiri adalah cara sederhana untuk mengubah sisa dapur menjadi pupuk yang bermanfaat bagi tanaman, sekaligus mengurangi sampah yang dikirim ke TPA.' },
      { type: 'heading', text: 'Bahan yang Dibutuhkan' },
      { type: 'list', items: [
        'Wadah komposter atau ember berlubang.',
        'Sisa sayur dan buah.',
        'Daun kering dan tanah sebagai starter.',
      ] },
      { type: 'image', src: 'https://api.builder.io/api/v1/image/assets/TEMP/4f02fdb6ce054dec6036db6dc5767854ab058e92?width=584', alt: 'Panduan kompos mandiri' },
      { type: 'heading', text: 'Proses Pembuatan' },
      { type: 'paragraph', text: 'Susun lapisan sampah organik dan daun kering secara bergantian, jaga kelembapan, dan aduk setiap beberapa hari sekali agar proses dekomposisi berjalan merata.' },
      { type: 'tip', title: 'Tips Cepat', text: 'Tambahkan sedikit tanah di setiap lapisan untuk mempercepat proses fermentasi kompos.' },
      { type: 'highlight', title: 'Manfaat', text: 'Kompos hasil olahan sendiri dapat menyuburkan tanaman rumah tanpa bahan kimia tambahan.' },
    ],
  },
  {
    slug: 'siapkan-tas-siaga-bencana',
    title: 'Siapkan Tas Siaga Bencana',
    excerpt: 'Daftar barang penting yang wajib ada di tas darurat Anda.',
    category: 'banjir',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/b412441d948f21feed88cff34746f29c5fb16bef?width=584',
    author: 'Tim Edukasi SiagaKota',
    publishDate: '2026-06-02',
    readingTime: '3 menit baca',
    content: [
      { type: 'paragraph', text: 'Tas siaga bencana adalah kebutuhan penting bagi setiap keluarga yang tinggal di wilayah rawan banjir. Siapkan tas ini jauh sebelum musim hujan tiba.' },
      { type: 'heading', text: 'Isi Wajib Tas Siaga' },
      { type: 'list', items: [
        'Dokumen penting dalam kantong kedap air.',
        'Obat-obatan pribadi dan P3K dasar.',
        'Senter, baterai cadangan, dan power bank.',
        'Air minum dan makanan siap saji minimal 3 hari.',
      ] },
      { type: 'image', src: 'https://api.builder.io/api/v1/image/assets/TEMP/b412441d948f21feed88cff34746f29c5fb16bef?width=584', alt: 'Tas siaga bencana' },
      { type: 'quote', text: 'Kesiapan adalah kunci keselamatan saat bencana datang tanpa peringatan.' },
      { type: 'highlight', title: 'Perlu Diketahui', text: 'Letakkan tas siaga di tempat yang mudah dijangkau, bukan di gudang atau tempat tersembunyi.' },
    ],
  },
  {
    slug: 'memahami-peringatan-dini',
    title: 'Memahami Peringatan Dini',
    excerpt: 'Cara membaca status ketinggian air dan sinyal peringatan.',
    category: 'banjir',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/7a64b3ba78c019ea29f79f0b1d97fc3fc5839c0f?width=584',
    author: 'Tim Edukasi SiagaKota',
    publishDate: '2026-05-20',
    readingTime: '4 menit baca',
    content: [
      { type: 'paragraph', text: 'Sistem peringatan dini banjir membantu warga mengambil tindakan lebih cepat sebelum air meninggi. Memahami status dan sinyalnya sangat penting untuk keselamatan.' },
      { type: 'heading', text: 'Level Status Ketinggian Air' },
      { type: 'list', items: [
        'Siaga 4 (Normal): aktivitas berjalan seperti biasa.',
        'Siaga 3 (Waspada): mulai pantau perkembangan cuaca.',
        'Siaga 2 (Siaga): siapkan tas darurat dan rencana evakuasi.',
        'Siaga 1 (Awas): segera evakuasi ke titik kumpul terdekat.',
      ] },
      { type: 'image', src: 'https://api.builder.io/api/v1/image/assets/TEMP/7a64b3ba78c019ea29f79f0b1d97fc3fc5839c0f?width=584', alt: 'Memahami peringatan dini' },
      { type: 'tip', title: 'Tips Cepat', text: 'Aktifkan notifikasi aplikasi SiagaKota agar mendapat peringatan status air secara real-time.' },
      { type: 'highlight', title: 'Penting', text: 'Jangan menunggu status Awas untuk mulai bersiap, lakukan persiapan sejak status Waspada.' },
    ],
  },
]

export function getArticleBySlug(slug) {
  return ARTICLES.find((article) => article.slug === slug)
}

export function getRelatedArticles(article, limit = 3) {
  return ARTICLES.filter((item) => item.category === article.category && item.slug !== article.slug).slice(0, limit)
}

export function getCategoryInfo(categorySlug) {
  return EDUCATION_CATEGORIES.find((category) => category.slug === categorySlug)
}

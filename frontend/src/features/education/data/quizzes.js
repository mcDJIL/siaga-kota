export const QUIZZES = [
  {
    id: 'master-pemilah-sampah',
    title: 'Master Pemilah Sampah',
    description: 'Buktikan bahwa kamu tahu cara memilah sampah dengan benar melalui simulasi interaktif ini.',
    points: 50,
    variant: 'featured',
    questions: [
      {
        id: 'q1',
        question: 'Sampah sisa sayur dan buah termasuk jenis sampah apa?',
        options: ['Organik', 'Anorganik', 'B3', 'Residu'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        question: 'Kemasan plastik bekas minuman sebaiknya dibuang ke wadah?',
        options: ['Organik', 'Anorganik', 'B3', 'Kompos'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Baterai bekas termasuk kategori sampah?',
        options: ['Organik', 'Anorganik', 'B3', 'Residu'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Apa manfaat utama memilah sampah sejak dari rumah?',
        options: [
          'Membuat rumah lebih sempit',
          'Mempermudah proses daur ulang',
          'Menambah jumlah sampah',
          'Tidak ada manfaatnya',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Sampah organik dapat diolah menjadi?',
        options: ['Kompos', 'Bahan bakar plastik', 'Logam', 'Kaca'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'siaga-banjir',
    title: 'Siaga Banjir',
    description: 'Seberapa siap kamu menghadapi musim hujan?',
    points: 30,
    variant: 'outline',
    questions: [
      {
        id: 'q1',
        question: 'Apa yang harus dilakukan saat status air berada di level Siaga 2?',
        options: [
          'Mengabaikan peringatan',
          'Menyiapkan tas darurat dan rencana evakuasi',
          'Pergi berlibur',
          'Menunggu status Awas',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Barang apa yang wajib ada di tas siaga bencana?',
        options: ['Dokumen penting dan P3K', 'Mainan anak', 'Perhiasan', 'Buku tebal'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        question: 'Di mana sebaiknya tas siaga bencana diletakkan?',
        options: ['Gudang tersembunyi', 'Tempat yang mudah dijangkau', 'Atap rumah', 'Dalam koper terkunci'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Apa fungsi sistem peringatan dini banjir?',
        options: [
          'Membantu warga bertindak lebih cepat sebelum air meninggi',
          'Menambah debit air',
          'Mengganti jadwal hujan',
          'Tidak memiliki fungsi khusus',
        ],
        correctIndex: 0,
      },
    ],
  },
]

export function getQuizById(id) {
  return QUIZZES.find((quiz) => quiz.id === id)
}

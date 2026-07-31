<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))
            ->first();

        if (!$adminUser) {
            return;
        }

        $announcements = [
            [
                'title' => 'Peringatan Banjir Area Selatan',
                'body' => 'Warga di area selatan Jember diimbau waspada terhadap potensi banjir akibat curah hujan tinggi dalam 48 jam ke depan.',
                'target' => 'Semua',
                'status' => 'Aktif',
                'created_by' => $adminUser->id,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Jadwal Pemeliharaan Server AI',
                'body' => 'Sistem prediksi AI akan mengalami pemeliharaan terjadwal. Petugas diharap memantau laporan secara manual selama proses berlangsung.',
                'target' => 'Petugas',
                'status' => 'Draft',
                'created_by' => $adminUser->id,
                'published_at' => null,
            ],
            [
                'title' => 'Sosialisasi Pengelolaan Sampah',
                'body' => 'Dinas Kebersihan akan mengadakan sosialisasi pengelolaan sampah rumah tangga di setiap kecamatan mulai minggu depan.',
                'target' => 'Warga',
                'status' => 'Aktif',
                'created_by' => $adminUser->id,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Evaluasi Kinerja Triwulan Instansi',
                'body' => 'Seluruh instansi terkait diminta menyerahkan laporan kinerja triwulan paling lambat akhir bulan ini.',
                'target' => 'Pemerintah',
                'status' => 'Arsip',
                'created_by' => $adminUser->id,
                'published_at' => now()->subMonths(2),
            ],
            [
                'title' => 'Darurat: Luapan Sungai Bedadung',
                'body' => 'Status siaga darurat ditetapkan akibat luapan Sungai Bedadung. Warga di bantaran sungai diminta segera mengungsi ke titik evakuasi terdekat.',
                'target' => 'Semua',
                'status' => 'Aktif',
                'created_by' => $adminUser->id,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'Kampanye Kurangi Sampah Plastik',
                'body' => 'Ajakan kepada seluruh warga untuk mengurangi penggunaan kantong plastik sekali pakai mulai bulan depan.',
                'target' => 'Warga',
                'status' => 'Draft',
                'created_by' => $adminUser->id,
                'published_at' => null,
            ],
        ];

        foreach ($announcements as $announcement) {
            Announcement::firstOrCreate(
                ['title' => $announcement['title']],
                $announcement
            );
        }
    }
}

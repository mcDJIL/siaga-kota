<?php

namespace Database\Seeders;

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\AnnouncementType;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'admin'))
            ->first();

        if (! $adminUser) {
            return;
        }

        $announcements = [
            [
                'title' => 'Peringatan Banjir Area Selatan',
                'body' => 'Warga di area selatan Jember diimbau waspada terhadap potensi banjir akibat curah hujan tinggi dalam 48 jam ke depan.',
                'type' => AnnouncementType::Warning->value,
                'audience' => AnnouncementAudience::All->value,
                'status' => AnnouncementStatus::Published->value,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Jadwal Pemeliharaan Server AI',
                'body' => 'Sistem prediksi AI akan mengalami pemeliharaan terjadwal. Petugas diharap memantau laporan secara manual selama proses berlangsung.',
                'type' => AnnouncementType::Info->value,
                'audience' => AnnouncementAudience::Petugas->value,
                'status' => AnnouncementStatus::Draft->value,
                'published_at' => null,
            ],
            [
                'title' => 'Sosialisasi Pengelolaan Sampah',
                'body' => 'Dinas Kebersihan akan mengadakan sosialisasi pengelolaan sampah rumah tangga di setiap kecamatan mulai minggu depan.',
                'type' => AnnouncementType::Info->value,
                'audience' => AnnouncementAudience::Warga->value,
                'status' => AnnouncementStatus::Published->value,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Evaluasi Kinerja Triwulan Instansi',
                'body' => 'Seluruh instansi terkait diminta menyerahkan laporan kinerja triwulan paling lambat akhir bulan ini.',
                'type' => AnnouncementType::Info->value,
                'audience' => AnnouncementAudience::Petugas->value,
                'status' => AnnouncementStatus::Archived->value,
                'published_at' => now()->subMonths(2),
            ],
            [
                'title' => 'Darurat: Luapan Sungai Bedadung',
                'body' => 'Status siaga darurat ditetapkan akibat luapan Sungai Bedadung. Warga di bantaran sungai diminta segera mengungsi ke titik evakuasi terdekat.',
                'type' => AnnouncementType::Warning->value,
                'audience' => AnnouncementAudience::All->value,
                'status' => AnnouncementStatus::Published->value,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'Kampanye Kurangi Sampah Plastik',
                'body' => 'Ajakan kepada seluruh warga untuk mengurangi penggunaan kantong plastik sekali pakai mulai bulan depan.',
                'type' => AnnouncementType::Info->value,
                'audience' => AnnouncementAudience::Warga->value,
                'status' => AnnouncementStatus::Draft->value,
                'published_at' => null,
            ],
            [
                'title' => 'Prakiraan Cuaca Sepekan',
                'body' => 'BMKG memprakirakan hujan sedang hingga lebat di wilayah Kabupaten Jember sepanjang pekan ini.',
                'type' => AnnouncementType::Weather->value,
                'audience' => AnnouncementAudience::All->value,
                'status' => AnnouncementStatus::Published->value,
                'published_at' => now()->subHours(6),
                'expires_at' => now()->addDays(7),
            ],
        ];

        foreach ($announcements as $announcement) {
            Announcement::query()->firstOrCreate(
                ['title' => $announcement['title']],
                [...$announcement, 'created_by' => $adminUser->id],
            );
        }
    }
}

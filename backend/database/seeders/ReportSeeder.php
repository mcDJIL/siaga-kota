<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;
use App\Enums\ReportStatus;
use App\Enums\WasteType;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $citizen = User::where('email', 'warga@example.com')->first();
        
        if (!$citizen) {
            return;
        }

        $wasteCategory = ReportCategory::where('slug', 'sampah')->first();
        $floodCategory = ReportCategory::where('slug', 'banjir')->first();

        // Sample district locations
        $locations = [
            ['name' => 'Kaliwates', 'lat' => -8.1795, 'lng' => 113.6947],
            ['name' => 'Sumbersari', 'lat' => -8.1668, 'lng' => 113.7157],
            ['name' => 'Patrang', 'lat' => -8.1523, 'lng' => 113.7024],
            ['name' => 'Ajung', 'lat' => -8.2117, 'lng' => 113.7082],
            ['name' => 'Mangli', 'lat' => -8.1611, 'lng' => 113.6723],
            ['name' => 'Tegal Besar', 'lat' => -8.1932, 'lng' => 113.7126],
        ];

        // Waste reports (sampah)
        $wasteReports = [
            ['title' => 'Timbunan Sampah di Jalan Sudirman', 'description' => 'Tumpukan sampah mencapai 2 meter di pinggir jalan', 'address' => 'Jl. Sudirman, Kaliwates', 'status' => 'diproses', 'water_level_cm' => null],
            ['title' => 'Sampah Plastik Membanjiri Saluran Air', 'description' => 'Plastik dan sampah organik menyumbat saluran air drainase', 'address' => 'Jl. Kartini, Sumbersari', 'status' => 'menunggu', 'water_level_cm' => null],
            ['title' => 'Tumpukan Limbah di Pasar Tradisional', 'description' => 'Limbah pasar tidak diangkut selama 3 hari', 'address' => 'Pasar Patrang, Patrang', 'status' => 'diproses', 'water_level_cm' => null],
            ['title' => 'Sampah Elektronik Tidak Terangkut', 'description' => 'Sampah elektronik bekas TV dan kulkas menumpuk', 'address' => 'Jl. Merdeka, Ajung', 'status' => 'selesai', 'water_level_cm' => null],
            ['title' => 'Tumpukan Sampah Area Industri', 'description' => 'Sampah industri menumpuk di area gudang lama', 'address' => 'Area Industri Mangli, Mangli', 'status' => 'menunggu', 'water_level_cm' => null],
            ['title' => 'Sampah Konstruksi di Pinggir Jalan', 'description' => 'Sampah bangunan dari renovasi rumah menumpuk', 'address' => 'Jl. Diponegoro, Tegal Besar', 'status' => 'diproses', 'water_level_cm' => null],
        ];

        // Flood reports (banjir)
        $floodReports = [
            ['title' => 'Banjir di Jl. Pendidikan', 'description' => 'Genangan air mencapai ketinggian 60 cm akibat hujan deras', 'address' => 'Jl. Pendidikan, Kaliwates', 'status' => 'diproses', 'water_level_cm' => 60],
            ['title' => 'Banjir Bandang Area Perumahan', 'description' => 'Air meluap dari kanal irigasi, rumah terendam hingga 1 meter', 'address' => 'Perumahan Graha Indah, Sumbersari', 'status' => 'menunggu', 'water_level_cm' => 100],
            ['title' => 'Genangan di Persimpangan Jl. Ahmad Yani', 'description' => 'Saluran tersumbat menyebabkan genangan air di jalan utama', 'address' => 'Persimpangan Jl. Ahmad Yani, Patrang', 'status' => 'diproses', 'water_level_cm' => 45],
            ['title' => 'Banjir Masuk Rumah Warga', 'description' => 'Air banjir masuk ke rumah warga mencapai 80 cm', 'address' => 'Jl. Gatot Subroto, Ajung', 'status' => 'selesai', 'water_level_cm' => 80],
            ['title' => 'Banjir di Area Komersial Mangli', 'description' => 'Genangan air menghambat aktivitas perdagangan di area pusat', 'address' => 'Area Komersial Mangli, Mangli', 'status' => 'menunggu', 'water_level_cm' => 55],
            ['title' => 'Banjir Masuk Sekolah Dasar', 'description' => 'Aula sekolah terendam akibat luapan air dari sungai', 'address' => 'SD Negeri 1, Tegal Besar', 'status' => 'diproses', 'water_level_cm' => 70],
        ];

        // Create waste reports
        foreach (array_chunk($wasteReports, count($locations)) as $chunk) {
            foreach ($chunk as $index => $reportData) {
                if ($index >= count($locations)) break;
                
                $location = $locations[$index];
                
                Report::create([
                    'code' => 'RPT-WASTE-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT),
                    'user_id' => $citizen->id,
                    'category_id' => $wasteCategory->id,
                    'waste_type' => WasteType::cases()[mt_rand(0, count(WasteType::cases()) - 1)],
                    'title' => $reportData['title'],
                    'description' => $reportData['description'],
                    'status' => $reportData['status'],
                    'address' => $reportData['address'],
                    'location' => "POINT({$location['lng']} {$location['lat']})",
                    'water_level_cm' => $reportData['water_level_cm'],
                    'is_emergency' => false,
                ]);
            }
        }

        // Create flood reports
        foreach (array_chunk($floodReports, count($locations)) as $chunk) {
            foreach ($chunk as $index => $reportData) {
                if ($index >= count($locations)) break;
                
                $location = $locations[$index];
                
                Report::create([
                    'code' => 'RPT-FLOOD-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT),
                    'user_id' => $citizen->id,
                    'category_id' => $floodCategory->id,
                    'title' => $reportData['title'],
                    'description' => $reportData['description'],
                    'status' => $reportData['status'],
                    'address' => $reportData['address'],
                    'location' => "POINT({$location['lng']} {$location['lat']})",
                    'water_level_cm' => $reportData['water_level_cm'],
                    'is_emergency' => $reportData['water_level_cm'] > 75,
                ]);
            }
        }
    }
}

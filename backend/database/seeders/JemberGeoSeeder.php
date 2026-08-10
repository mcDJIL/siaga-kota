<?php

namespace Database\Seeders;

use App\Models\EvacuationRoute;
use App\Models\FloodZone;
use App\Models\Tps;
use App\Models\WasteBank;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JemberGeoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $wasteBanks = [
            [
                'name' => 'Bank Sampah Mandiri Jember',
                'lat' => -8.1706,
                'lng' => 113.7004,
                'address' => 'Jl. Gajah Mada No. 234, Jember',
                'capacity' => 5000,
                'contact' => '0331-123456',
            ],
            [
                'name' => 'Bank Sampah Melati',
                'lat' => -8.1598,
                'lng' => 113.7129,
                'address' => 'Jl. PB Sudirman No. 89, Jember',
                'capacity' => 3000,
                'contact' => '0331-234567',
            ],
            [
                'name' => 'Bank Sampah Bersih Jember',
                'lat' => -8.1823,
                'lng' => 113.6891,
                'address' => 'Jl. Hayam Wuruk No. 45, Jember',
                'capacity' => 4000,
                'contact' => '0331-345678',
            ],
        ];

        foreach ($wasteBanks as $bank) {
            WasteBank::query()->create([
                'name' => $bank['name'],
                'location' => DB::raw("ST_GeomFromText('POINT({$bank['lng']} {$bank['lat']})', 4326)"),
                'address' => $bank['address'],
                'capacity' => $bank['capacity'],
                'contact' => $bank['contact'],
                'active' => true,
            ]);
        }

        $tpsLocations = [
            [
                'name' => 'TPS Sumbersari',
                'lat' => -8.1589,
                'lng' => 113.7234,
                'address' => 'Jl. Sumbersari Raya, Jember',
                'type' => 'TPS3R',
            ],
            [
                'name' => 'TPS Kaliwates',
                'lat' => -8.1745,
                'lng' => 113.6978,
                'address' => 'Jl. Kaliwates Indah, Jember',
                'type' => 'TPS Biasa',
            ],
            [
                'name' => 'TPS Patrang',
                'lat' => -8.1612,
                'lng' => 113.6845,
                'address' => 'Jl. Patrang Utara, Jember',
                'type' => 'TPS3R',
            ],
        ];

        foreach ($tpsLocations as $tps) {
            Tps::query()->create([
                'name' => $tps['name'],
                'location' => DB::raw("ST_GeomFromText('POINT({$tps['lng']} {$tps['lat']})', 4326)"),
                'address' => $tps['address'],
                'type' => $tps['type'],
                'active' => true,
            ]);
        }

        $routes = [
            [
                'name' => 'Jalur Evakuasi Sumbersari - GOR',
                'description' => 'Jalur evakuasi dari kelurahan Sumbersari menuju GOR Jember',
                'coordinates' => [
                    [113.7234, -8.1589],
                    [113.7198, -8.1634],
                    [113.7145, -8.1678],
                    [113.7098, -8.1701],
                ],
            ],
            [
                'name' => 'Jalur Evakuasi Kaliwates - Balai Desa',
                'description' => 'Jalur evakuasi dari area rawan banjir Kaliwates ke Balai Desa',
                'coordinates' => [
                    [113.6978, -8.1745],
                    [113.6945, -8.1712],
                    [113.6912, -8.1689],
                ],
            ],
        ];

        foreach ($routes as $route) {
            $lineString = 'LINESTRING('.implode(',', array_map(
                fn ($coord) => "{$coord[0]} {$coord[1]}",
                $route['coordinates']
            )).')';

            EvacuationRoute::query()->create([
                'name' => $route['name'],
                'path' => DB::raw("ST_GeomFromText('{$lineString}', 4326)"),
                'description' => $route['description'],
                'active' => true,
            ]);
        }

        $zones = [
            [
                'name' => 'Zona Rawan Banjir Sumbersari',
                'base_risk_level' => 'tinggi',
                'coordinates' => [
                    [113.7234, -8.1589],
                    [113.7289, -8.1589],
                    [113.7289, -8.1645],
                    [113.7234, -8.1645],
                    [113.7234, -8.1589], // close polygon
                ],
            ],
            [
                'name' => 'Zona Rawan Banjir Kaliwates',
                'base_risk_level' => 'sedang',
                'coordinates' => [
                    [113.6945, -8.1745],
                    [113.7012, -8.1745],
                    [113.7012, -8.1801],
                    [113.6945, -8.1801],
                    [113.6945, -8.1745],
                ],
            ],
        ];

        foreach ($zones as $zone) {
            $polygon = 'POLYGON(('.implode(',', array_map(
                fn ($coord) => "{$coord[0]} {$coord[1]}",
                $zone['coordinates']
            )).'))';

            FloodZone::query()->create([
                'name' => $zone['name'],
                'zone' => DB::raw("ST_GeomFromText('{$polygon}', 4326)"),
                'base_risk_level' => $zone['base_risk_level'],
                'active' => true,
            ]);
        }
    }
}

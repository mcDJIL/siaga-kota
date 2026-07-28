<?php

namespace Database\Seeders;

use App\Enums\ReportPriority;
use App\Models\ReportCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'sampah',
                'name' => 'Sampah',
                'icon' => 'trash-2',
                'default_priority' => ReportPriority::Sedang->value,
            ],
            [
                'slug' => 'banjir',
                'name' => 'Banjir',
                'icon' => 'waves',
                'default_priority' => ReportPriority::Tinggi->value,
            ],
            [
                'slug' => 'drainase',
                'name' => 'Drainase',
                'icon' => 'droplets',
                'default_priority' => ReportPriority::Tinggi->value,
            ],
            [
                'slug' => 'infrastruktur',
                'name' => 'Infrastruktur',
                'icon' => 'construction',
                'default_priority' => ReportPriority::Sedang->value,
            ],
            [
                'slug' => 'darurat',
                'name' => 'Darurat',
                'icon' => 'siren',
                'default_priority' => ReportPriority::Mendesak->value,
            ],
        ];

        foreach ($categories as $category) {
            ReportCategory::query()->updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'icon' => $category['icon'],
                    'default_priority' => $category['default_priority'],
                    'active' => true,
                ],
            );
        }
    }
}

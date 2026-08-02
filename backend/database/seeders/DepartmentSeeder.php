<?php

namespace Database\Seeders;

use App\Enums\DepartmentType;
use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Dinas Kebersihan',
                'slug' => 'dinas-kebersihan',
                'type' => DepartmentType::DinasKebersihan->value,
            ],
            [
                'name' => 'Dinas PU Tata Air',
                'slug' => 'dinas-pu-tata-air',
                'type' => DepartmentType::DinasPu->value,
            ],
            [
                'name' => 'Satpol PP',
                'slug' => 'satpol-pp',
                'type' => DepartmentType::SatpolPp->value,
            ],
            [
                'name' => 'BPBD',
                'slug' => 'bpbd',
                'type' => DepartmentType::Bpbd->value,
            ],
        ];

        foreach ($departments as $department) {
            Department::query()->updateOrCreate(
                ['slug' => $department['slug']],
                [
                    'name' => $department['name'],
                    'type' => $department['type'],
                    'active' => true,
                ],
            );
        }
    }
}

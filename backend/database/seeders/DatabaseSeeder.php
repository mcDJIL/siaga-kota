<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
            DepartmentSeeder::class,
            ReportCategorySeeder::class,
            DistrictSeeder::class,
            JemberGeoSeeder::class,
        ]);

        $cleaningDepartment = Department::query()
            ->where('slug', 'dinas-kebersihan')
            ->first();

        $bpbdDepartment = Department::query()
            ->where('slug', 'bpbd')
            ->first();

        $citizen = User::factory()->create([
            'name' => 'Warga Demo',
            'email' => 'warga@example.com',
            'phone' => '081234567890',
            'role' => 'warga',
        ]);

        $officer = User::factory()->create([
            'name' => 'Petugas Demo',
            'email' => 'petugas@example.com',
            'phone' => '081234567891',
            'role' => 'petugas',
            'employee_id' => 'SK-2026-001',
            'position' => 'Koordinator Lapangan',
            'department_id' => $cleaningDepartment?->id,
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin Demo',
            'email' => 'admin@example.com',
            'phone' => '081234567892',
            'role' => 'admin',
            'employee_id' => 'SK-2026-ADM',
            'position' => 'Administrator Pemerintah Daerah',
            'department_id' => $bpbdDepartment?->id,
        ]);

        $citizen->assignRole('warga');
        $officer->assignRole('petugas');
        $admin->assignRole('admin');

        // Seed sample reports
        $this->call([
            ReportSeeder::class,
        ]);
    }
}

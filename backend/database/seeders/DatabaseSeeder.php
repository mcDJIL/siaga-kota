<?php

namespace Database\Seeders;

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
        ]);

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
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin Demo',
            'email' => 'admin@example.com',
            'phone' => '081234567892',
            'role' => 'admin',
        ]);

        $citizen->assignRole('warga');
        $officer->assignRole('petugas');
        $admin->assignRole('admin');
    }
}

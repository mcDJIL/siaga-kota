<?php

namespace Tests\Feature\Government;

use App\Enums\DepartmentType;
use App\Enums\UserRole;
use App\Models\Department;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepartmentTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Admin->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Admin->value);

        return $user;
    }

    public function test_admin_can_list_departments(): void
    {
        $admin = $this->admin();

        Department::factory()->create([
            'name' => 'Dinas Kebersihan',
            'slug' => 'dinas-kebersihan',
            'type' => DepartmentType::DinasKebersihan->value,
            'active' => true,
        ]);

        $response = $this
            ->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/government/departments');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'slug', 'type', 'type_label', 'active', 'users_count'],
                ],
            ])
            ->assertJsonPath('data.0.name', 'Dinas Kebersihan')
            ->assertJsonPath('data.0.type_label', 'Dinas Kebersihan');
    }

    public function test_inactive_departments_are_hidden_by_default(): void
    {
        $admin = $this->admin();

        Department::factory()->create(['name' => 'Aktif', 'active' => true]);
        Department::factory()->create(['name' => 'Nonaktif', 'active' => false]);

        $response = $this
            ->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/government/departments');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Aktif');
    }

    public function test_inactive_departments_can_be_included(): void
    {
        $admin = $this->admin();

        Department::factory()->create(['active' => true]);
        Department::factory()->create(['active' => false]);

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/government/departments?only_active=0')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }

    public function test_officer_cannot_list_departments(): void
    {
        $this->seed(RoleSeeder::class);

        $officer = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);
        $officer->assignRole(UserRole::Petugas->value);

        $this->actingAs($officer, 'sanctum')
            ->getJson('/api/v1/government/departments')
            ->assertForbidden();
    }

    public function test_guest_cannot_list_departments(): void
    {
        $this->getJson('/api/v1/government/departments')->assertUnauthorized();
    }
}

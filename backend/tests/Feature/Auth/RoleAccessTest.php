<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_citizen_can_enter_public_group(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->getJson('/api/v1/public/reports');

        $response->assertOk();
    }

    public function test_citizen_cannot_enter_ops_group(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->getJson('/api/v1/ops/reports');

        $response->assertForbidden();
    }

    public function test_officer_cannot_enter_public_group(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Petugas->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->getJson('/api/v1/public/reports');

        $response->assertForbidden();
    }

    public function test_officer_can_enter_ops_group(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Petugas->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Petugas->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->getJson('/api/v1/ops/reports');

        $response->assertOk();
    }
}

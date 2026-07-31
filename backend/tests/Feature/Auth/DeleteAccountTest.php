<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\PushSubscription;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteAccountTest extends TestCase
{
    use RefreshDatabase;

    private function citizen(string $password = 'password123'): User
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'email' => 'warga.hapus@example.com',
            'phone' => '081200000001',
            'password' => $password,
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        return $user;
    }

    public function test_citizen_can_delete_own_account(): void
    {
        $user = $this->citizen();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', [
                'password' => 'password123',
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Akun Anda berhasil dihapus.');

        $this->assertSoftDeleted('users', ['id' => $user->id]);
    }

    public function test_delete_account_requires_correct_password(): void
    {
        $user = $this->citizen();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', [
                'password' => 'password-salah',
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password']);

        $this->assertNotSoftDeleted('users', ['id' => $user->id]);
    }

    public function test_delete_account_requires_password(): void
    {
        $user = $this->citizen();

        $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password']);
    }

    public function test_delete_account_revokes_tokens_and_push_subscriptions(): void
    {
        $user = $this->citizen();
        $user->createToken('extra-token');
        PushSubscription::factory()->count(2)->for($user)->create();

        $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', ['password' => 'password123'])
            ->assertOk();

        $this->assertSame(0, $user->tokens()->count());
        $this->assertSame(0, $user->pushSubscriptions()->count());
    }

    public function test_deleted_account_anonymises_unique_contact_fields(): void
    {
        $user = $this->citizen();

        $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', ['password' => 'password123'])
            ->assertOk();

        $deleted = User::withTrashed()->find($user->id);

        $this->assertNotSame('warga.hapus@example.com', $deleted->email);
        $this->assertStringContainsString('warga.hapus@example.com', $deleted->email);
        $this->assertFalse($deleted->active);
    }

    public function test_email_can_be_reused_after_account_deletion(): void
    {
        $user = $this->citizen();

        $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/me', ['password' => 'password123'])
            ->assertOk();

        $this->postJson('/api/v1/auth/register', [
            'name' => 'Warga Baru',
            'email' => 'warga.hapus@example.com',
            'phone' => '081200000002',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])->assertCreated();
    }

    public function test_guest_cannot_delete_account(): void
    {
        $this->deleteJson('/api/v1/auth/me', ['password' => 'password123'])
            ->assertUnauthorized();
    }
}

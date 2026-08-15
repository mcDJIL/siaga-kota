<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_as_citizen(): void
    {
        $this->seed(RoleSeeder::class);

        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Warga Test',
            'email' => 'warga.test@gmail.com',
            'phone' => '081234567899',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'rw' => '01',
            'rt' => '02',
            'village_id' => 'sumbersari',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.user.email', 'warga.test@gmail.com')
            ->assertJsonPath('data.user.role', UserRole::Warga->value)
            ->assertJsonStructure([
                'data' => [
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'phone',
                        'role',
                        'rw',
                        'rt',
                        'village_id',
                        'active',
                    ],
                    'token',
                ],
                'message',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'warga.test@gmail.com',
            'role' => UserRole::Warga->value,
        ]);

        $this->assertTrue(
            User::query()
                ->where('email', 'warga.test@gmail.com')
                ->firstOrFail()
                ->hasRole(UserRole::Warga->value),
        );
    }

    public function test_user_can_login_with_email_and_password(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'email' => 'warga.test@example.com',
            'password' => 'password123',
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'warga.test@example.com',
            'password' => 'password123',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.user.email', 'warga.test@example.com')
            ->assertJsonStructure([
                'data' => [
                    'user',
                    'token',
                ],
                'message',
            ]);

        $this->assertNotNull($user->fresh()->last_login_at);
    }

    public function test_login_fails_with_invalid_password(): void
    {
        $this->seed(RoleSeeder::class);

        User::factory()->create([
            'email' => 'warga.test@example.com',
            'password' => 'password123',
            'active' => true,
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'warga.test@example.com',
            'password' => 'wrong-password',
        ]);

        $response
            ->assertUnauthorized()
            ->assertJsonPath('message', 'Email atau password salah.');
    }

    public function test_login_fails_when_user_is_inactive(): void
    {
        $this->seed(RoleSeeder::class);

        User::factory()->create([
            'email' => 'warga.test@example.com',
            'password' => 'password123',
            'active' => false,
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'warga.test@example.com',
            'password' => 'password123',
        ]);

        $response
            ->assertForbidden()
            ->assertJsonPath('message', 'Akun Anda dinonaktifkan. Silakan hubungi admin.');
    }

    public function test_authenticated_user_can_fetch_profile(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->getJson('/api/v1/auth/me');

        $response
            ->assertOk()
            ->assertJsonPath('data.user.id', $user->id);
    }

    public function test_authenticated_user_can_upload_avatar(): void
    {
        Storage::fake('public');
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);
        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->post('/api/v1/auth/me/avatar', [
                'avatar_path' => UploadedFile::fake()->image('avatar'),
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.user.id', $user->id);

        $avatarPath = $user->fresh()->avatar_path;
        $this->assertNotNull($avatarPath);
        Storage::disk('public')->assertExists($avatarPath);
    }

    public function test_authenticated_user_can_update_password(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'email' => 'warga.test@example.com',
            'password' => 'password123',
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->patchJson('/api/v1/auth/me/password', [
                'current_password' => 'password123',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password123',
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Password berhasil diperbarui.')
            ->assertJsonPath('data.user.id', $user->id);

        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password));
    }

    public function test_authenticated_user_cannot_update_password_with_wrong_current_password(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'email' => 'warga.test@example.com',
            'password' => 'password123',
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->patchJson('/api/v1/auth/me/password', [
                'current_password' => 'wrong-password',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password123',
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['current_password']);
    }

    public function test_guest_cannot_fetch_profile(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response
            ->assertUnauthorized()
            ->assertJsonPath('message', 'Unauthenticated.');
    }

    public function test_authenticated_user_can_logout(): void
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/v1/auth/logout');

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Logout berhasil.');

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}

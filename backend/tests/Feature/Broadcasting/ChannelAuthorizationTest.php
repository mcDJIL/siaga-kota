<?php

namespace Tests\Feature\Broadcasting;

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class ChannelAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private function userWithRole(string $role, bool $active = true): User
    {
        $user = User::factory()->create([
            'role' => $role,
            'active' => $active,
        ]);

        $user->assignRole($role);

        return $user;
    }

    protected function setUp(): void
    {
        parent::setUp();

        // Driver `null`/`log` mengembalikan auth() kosong sehingga callback
        // otorisasi tidak pernah dievaluasi. Reverb kompatibel protokol Pusher,
        // jadi pakai driver pusher agar izin & penolakan benar-benar diuji.
        config([
            'broadcasting.default' => 'pusher',
            'broadcasting.connections.pusher.key' => 'test-key',
            'broadcasting.connections.pusher.secret' => 'test-secret',
            'broadcasting.connections.pusher.app_id' => 'test-app',
        ]);

        // Channel sudah terdaftar pada driver default saat boot (null), sehingga
        // driver pusher yang baru diresolve tidak memilikinya. Daftarkan ulang
        // dari sumber yang sama agar yang diuji tetap definisi produksi.
        require base_path('routes/channels.php');

        $this->seed(RoleSeeder::class);
    }

    /**
     * Panggil endpoint otorisasi broadcasting seperti yang dilakukan Laravel Echo.
     */
    private function authorizeChannel(User $user, string $channel): TestResponse
    {
        return $this->actingAs($user, 'sanctum')->postJson('/api/broadcasting/auth', [
            'socket_id' => '1234.5678',
            'channel_name' => $channel,
        ]);
    }

    public function test_user_can_authorize_own_private_channel(): void
    {
        $user = $this->userWithRole(UserRole::Warga->value);

        $this->authorizeChannel($user, "private-user.{$user->id}")->assertOk();
    }

    public function test_user_cannot_authorize_other_users_private_channel(): void
    {
        $user = $this->userWithRole(UserRole::Warga->value);
        $other = $this->userWithRole(UserRole::Warga->value);

        $this->authorizeChannel($user, "private-user.{$other->id}")->assertForbidden();
    }

    public function test_officer_can_authorize_city_reports_channel(): void
    {
        $officer = $this->userWithRole(UserRole::Petugas->value);

        $this->authorizeChannel($officer, 'private-city.reports')->assertOk();
    }

    public function test_admin_can_authorize_city_reports_channel(): void
    {
        $admin = $this->userWithRole(UserRole::Admin->value);

        $this->authorizeChannel($admin, 'private-city.reports')->assertOk();
    }

    public function test_citizen_cannot_authorize_city_reports_channel(): void
    {
        $citizen = $this->userWithRole(UserRole::Warga->value);

        $this->authorizeChannel($citizen, 'private-city.reports')->assertForbidden();
    }

    public function test_officer_can_authorize_own_assignment_channel(): void
    {
        $officer = $this->userWithRole(UserRole::Petugas->value);

        $this->authorizeChannel($officer, "private-ops.{$officer->id}.assignments")->assertOk();
    }

    public function test_officer_cannot_authorize_other_officers_assignment_channel(): void
    {
        $officer = $this->userWithRole(UserRole::Petugas->value);
        $other = $this->userWithRole(UserRole::Petugas->value);

        $this->authorizeChannel($officer, "private-ops.{$other->id}.assignments")
            ->assertForbidden();
    }

    public function test_citizen_cannot_authorize_assignment_channel(): void
    {
        $citizen = $this->userWithRole(UserRole::Warga->value);

        $this->authorizeChannel($citizen, "private-ops.{$citizen->id}.assignments")
            ->assertForbidden();
    }

    public function test_any_active_user_can_authorize_flood_channel(): void
    {
        $citizen = $this->userWithRole(UserRole::Warga->value);

        $this->authorizeChannel($citizen, 'private-city.flood')->assertOk();
    }

    public function test_guest_cannot_authorize_any_channel(): void
    {
        $this->postJson('/api/broadcasting/auth', [
            'socket_id' => '1234.5678',
            'channel_name' => 'private-city.flood',
        ])->assertUnauthorized();
    }
}

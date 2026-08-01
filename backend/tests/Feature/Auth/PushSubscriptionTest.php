<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\PushSubscription;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PushSubscriptionTest extends TestCase
{
    use RefreshDatabase;

    private function citizen(): User
    {
        $this->seed(RoleSeeder::class);

        $user = User::factory()->create([
            'role' => UserRole::Warga->value,
            'active' => true,
        ]);

        $user->assignRole(UserRole::Warga->value);

        return $user;
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(string $endpoint = 'https://fcm.googleapis.com/fcm/send/abc123'): array
    {
        return [
            'endpoint' => $endpoint,
            'keys' => [
                'p256dh' => 'BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM=',
                'auth' => 'tBHItJI5svbpez7KI4CCXg==',
            ],
        ];
    }

    public function test_user_can_subscribe_to_push_notifications(): void
    {
        $user = $this->citizen();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/push/subscribe', $this->payload());

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Langganan notifikasi berhasil didaftarkan.')
            ->assertJsonStructure(['data' => ['id', 'endpoint']]);

        $this->assertDatabaseHas('push_subscriptions', [
            'user_id' => $user->id,
            'endpoint' => 'https://fcm.googleapis.com/fcm/send/abc123',
            'payload_encoding' => 'aes128gcm',
        ]);
    }

    public function test_subscribing_twice_with_same_endpoint_does_not_duplicate(): void
    {
        $user = $this->citizen();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/push/subscribe', $this->payload())
            ->assertCreated();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/push/subscribe', $this->payload())
            ->assertCreated();

        $this->assertSame(1, PushSubscription::query()->count());
    }

    public function test_subscribe_validates_required_fields(): void
    {
        $user = $this->citizen();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/push/subscribe', []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['endpoint', 'keys']);
    }

    public function test_user_can_unsubscribe_specific_endpoint(): void
    {
        $user = $this->citizen();

        $kept = PushSubscription::factory()->for($user)->create();
        $removed = PushSubscription::factory()->for($user)->create();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/push/subscribe', [
                'endpoint' => $removed->endpoint,
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.deleted', 1);

        $this->assertDatabaseMissing('push_subscriptions', ['id' => $removed->id]);
        $this->assertDatabaseHas('push_subscriptions', ['id' => $kept->id]);
    }

    public function test_unsubscribe_without_endpoint_removes_all_user_subscriptions(): void
    {
        $user = $this->citizen();
        $other = User::factory()->create();

        PushSubscription::factory()->count(2)->for($user)->create();
        $otherSubscription = PushSubscription::factory()->for($other)->create();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson('/api/v1/auth/push/subscribe');

        $response
            ->assertOk()
            ->assertJsonPath('data.deleted', 2);

        $this->assertSame(0, $user->pushSubscriptions()->count());
        $this->assertDatabaseHas('push_subscriptions', ['id' => $otherSubscription->id]);
    }

    public function test_guest_cannot_subscribe(): void
    {
        $this->postJson('/api/v1/auth/push/subscribe', $this->payload())
            ->assertUnauthorized();
    }
}

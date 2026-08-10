<?php

namespace Tests\Feature\WebPush;

use App\Events\FloodRiskUpdated;
use App\Jobs\SendFloodPushNotifications;
use App\Listeners\SendFloodAlertPush;
use App\Models\PushSubscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class FloodPushDispatchTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<int, array<string, mixed>>  $zones
     */
    private function handleEvent(array $zones): void
    {
        (new SendFloodAlertPush)->handle(new FloodRiskUpdated($zones));
    }

    public function test_high_risk_zone_dispatches_push_job(): void
    {
        Queue::fake();

        $this->handleEvent([
            ['name' => 'Zona Sumbersari', 'risk_level' => 'tinggi', 'risk_index' => 88],
        ]);

        Queue::assertPushed(SendFloodPushNotifications::class, function ($job): bool {
            return $job->payload['tag'] === 'flood-alert'
                && str_contains($job->payload['body'], 'Zona Sumbersari');
        });
    }

    public function test_low_and_medium_risk_do_not_dispatch_push(): void
    {
        Queue::fake();

        $this->handleEvent([
            ['name' => 'Zona A', 'risk_level' => 'sedang', 'risk_index' => 50],
            ['name' => 'Zona B', 'risk_level' => 'rendah', 'risk_index' => 12],
        ]);

        Queue::assertNotPushed(SendFloodPushNotifications::class);
    }

    public function test_payload_uses_highest_risk_index_among_zones(): void
    {
        Queue::fake();

        $this->handleEvent([
            ['name' => 'Zona A', 'risk_level' => 'tinggi', 'risk_index' => 82],
            ['name' => 'Zona B', 'risk_level' => 'tinggi', 'risk_index' => 95],
        ]);

        Queue::assertPushed(
            SendFloodPushNotifications::class,
            fn ($job) => $job->payload['risk_index'] === 95,
        );
    }

    public function test_job_skips_when_vapid_is_not_configured(): void
    {
        config([
            'webpush.vapid.public_key' => null,
            'webpush.vapid.private_key' => null,
        ]);

        $user = User::factory()->create(['active' => true]);
        PushSubscription::factory()->for($user)->create();

        // Tidak boleh melempar exception meski VAPID belum diisi.
        (new SendFloodPushNotifications(['title' => 'x', 'body' => 'y']))
            ->handle(app(\App\Services\WebPushSender::class));

        $this->assertDatabaseCount('push_subscriptions', 1);
    }

    public function test_sender_reports_not_configured_without_vapid_keys(): void
    {
        config([
            'webpush.vapid.public_key' => null,
            'webpush.vapid.private_key' => null,
        ]);

        $this->assertFalse(app(\App\Services\WebPushSender::class)->isConfigured());
    }

    public function test_sender_reports_configured_with_vapid_keys(): void
    {
        config([
            'webpush.vapid.public_key' => 'BPMElpsjKhI4QwWhJzJRyLVn96ABG2smxJ4K7lVzaAbim8hNLm00ruxtWmDruA9BQEYzjdFVtqYYSI6WDFpIGwU',
            'webpush.vapid.private_key' => 'LoOI5ZcY73Tlf7y9lr9V_tKt-4vp_rUGnyphVm6SqFw',
        ]);

        $this->assertTrue(app(\App\Services\WebPushSender::class)->isConfigured());
    }

    public function test_sender_returns_zero_counts_for_empty_subscriptions(): void
    {
        config([
            'webpush.vapid.public_key' => 'BPMElpsjKhI4QwWhJzJRyLVn96ABG2smxJ4K7lVzaAbim8hNLm00ruxtWmDruA9BQEYzjdFVtqYYSI6WDFpIGwU',
            'webpush.vapid.private_key' => 'LoOI5ZcY73Tlf7y9lr9V_tKt-4vp_rUGnyphVm6SqFw',
        ]);

        $result = app(\App\Services\WebPushSender::class)->send(collect(), ['title' => 'x']);

        $this->assertSame(['sent' => 0, 'failed' => 0, 'expired' => 0], $result);
    }
}

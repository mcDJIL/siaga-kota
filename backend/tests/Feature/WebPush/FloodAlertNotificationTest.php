<?php

namespace Tests\Feature\WebPush;

use App\Models\PushSubscription;
use App\Models\User;
use App\Notifications\Channels\WebPushChannel;
use App\Notifications\FloodAlertNotification;
use App\Services\WebPushSender;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
use Mockery\MockInterface;
use Tests\TestCase;

class FloodAlertNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'webpush.vapid.subject' => 'http://localhost',
            'webpush.vapid.public_key' => 'BPMElpsjKhI4QwWhJzJRyLVn96ABG2smxJ4K7lVzaAbim8hNLm00ruxtWmDruA9BQEYzjdFVtqYYSI6WDFpIGwU',
            'webpush.vapid.private_key' => 'LoOI5ZcY73Tlf7y9lr9V_tKt-4vp_rUGnyphVm6SqFw',
        ]);
    }

    public function test_notification_uses_web_push_channel(): void
    {
        $notification = new FloodAlertNotification('Zona Sumbersari', 'tinggi', 87);

        $this->assertSame([WebPushChannel::class], $notification->via(new User));
    }

    public function test_payload_contains_required_web_push_fields(): void
    {
        $payload = (new FloodAlertNotification('Zona Sumbersari', 'tinggi', 87))
            ->toWebPush(new User);

        $this->assertSame('Peringatan Banjir: Zona Sumbersari', $payload['title']);
        $this->assertStringContainsString('tinggi', $payload['body']);
        $this->assertStringContainsString('87%', $payload['body']);
        $this->assertSame('/warga/prediksi', $payload['url']);
        $this->assertSame('flood-alert', $payload['tag']);
    }

    public function test_payload_omits_risk_index_when_not_provided(): void
    {
        $payload = (new FloodAlertNotification('Zona Kaliwates', 'sedang'))
            ->toWebPush(new User);

        $this->assertStringNotContainsString('Indeks risiko', $payload['body']);
    }

    public function test_channel_sends_only_to_subscriptions_of_target_user(): void
    {
        $target = User::factory()->create();
        $other = User::factory()->create();

        PushSubscription::factory()->count(2)->for($target)->create();
        PushSubscription::factory()->for($other)->create();

        $sender = $this->mock(WebPushSender::class, function (MockInterface $mock) use ($target): void {
            $mock->shouldReceive('send')
                ->once()
                ->withArgs(function (Collection $subscriptions, array $payload) use ($target): bool {
                    return $subscriptions->count() === 2
                        && $subscriptions->every(fn ($s) => $s->user_id === $target->id)
                        && $payload['tag'] === 'flood-alert';
                })
                ->andReturn(['sent' => 2, 'failed' => 0, 'expired' => 0]);
        });

        (new WebPushChannel($sender))->send(
            $target,
            new FloodAlertNotification('Zona Sumbersari', 'tinggi', 90),
        );
    }

    public function test_channel_skips_notification_without_to_web_push_method(): void
    {
        $user = User::factory()->create();
        PushSubscription::factory()->for($user)->create();

        $sender = $this->mock(WebPushSender::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('send');
        });

        $notification = new class extends \Illuminate\Notifications\Notification
        {
            /**
             * @return array<int, string>
             */
            public function via(mixed $notifiable): array
            {
                return [WebPushChannel::class];
            }
        };

        (new WebPushChannel($sender))->send($user, $notification);
    }
}

<?php

namespace App\Services;

use App\Models\PushSubscription;
use Illuminate\Support\Facades\Log;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;
use Throwable;

/**
 * Pengirim Web Push (VAPID) sesuai PLAN §8.
 *
 * Langganan yang ditolak permanen oleh push service (410 Gone / 404) dihapus
 * otomatis agar tabel tidak menumpuk endpoint mati.
 */
class WebPushSender
{
    public function isConfigured(): bool
    {
        return filled(config('webpush.vapid.public_key'))
            && filled(config('webpush.vapid.private_key'));
    }

    /**
     * Kirim satu payload ke banyak langganan sekaligus.
     *
     * @param  \Illuminate\Support\Collection<int, PushSubscription>  $subscriptions
     * @param  array<string, mixed>  $payload
     * @return array{sent: int, failed: int, expired: int}
     */
    public function send($subscriptions, array $payload): array
    {
        if (! $this->isConfigured()) {
            Log::warning('Web Push dilewati: kunci VAPID belum dikonfigurasi.');

            return ['sent' => 0, 'failed' => 0, 'expired' => 0];
        }

        if ($subscriptions->isEmpty()) {
            return ['sent' => 0, 'failed' => 0, 'expired' => 0];
        }

        $webPush = $this->client();
        $encoded = json_encode($payload, JSON_UNESCAPED_UNICODE);

        /** @var array<string, string> $endpointToId */
        $endpointToId = [];

        foreach ($subscriptions as $subscription) {
            $endpointToId[$subscription->endpoint] = $subscription->id;

            try {
                $webPush->queueNotification(
                    $this->toSubscription($subscription),
                    $encoded,
                );
            } catch (Throwable $e) {
                Log::warning('Gagal menyiapkan notifikasi push.', [
                    'subscription_id' => $subscription->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $sent = 0;
        $failed = 0;
        $expiredIds = [];

        foreach ($webPush->flush(config('webpush.batch_size')) as $report) {
            if ($report->isSuccess()) {
                $sent++;

                continue;
            }

            $failed++;
            $endpoint = $report->getEndpoint();

            // 404/410 menandakan langganan sudah tidak valid secara permanen.
            if ($report->isSubscriptionExpired() && isset($endpointToId[$endpoint])) {
                $expiredIds[] = $endpointToId[$endpoint];

                continue;
            }

            Log::warning('Pengiriman push gagal.', [
                'endpoint' => $endpoint,
                'reason' => $report->getReason(),
            ]);
        }

        if ($expiredIds !== []) {
            PushSubscription::query()->whereIn('id', $expiredIds)->delete();
        }

        return [
            'sent' => $sent,
            'failed' => $failed,
            'expired' => count($expiredIds),
        ];
    }

    private function client(): WebPush
    {
        return new WebPush([
            'VAPID' => [
                'subject' => config('webpush.vapid.subject'),
                'publicKey' => config('webpush.vapid.public_key'),
                'privateKey' => config('webpush.vapid.private_key'),
            ],
        ], [
            'TTL' => config('webpush.ttl'),
            'urgency' => config('webpush.urgency'),
        ]);
    }

    private function toSubscription(PushSubscription $subscription): Subscription
    {
        return new Subscription(
            $subscription->endpoint,
            $subscription->keys_p256dh,
            $subscription->keys_auth,
            $subscription->payload_encoding,
        );
    }
}

<?php

namespace App\Jobs;

use App\Models\PushSubscription;
use App\Services\WebPushSender;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Kirim peringatan banjir via Web Push ke pengguna di zona berisiko.
 *
 * Sesuai PLAN §8: WebSocket hanya sampai saat aplikasi terbuka, sehingga
 * peringatan banjir wajib melalui Web Push agar tetap diterima meski aplikasi
 * sedang tertutup.
 */
class SendFloodPushNotifications implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 300;

    /**
     * @param  array<int, string>|null  $userIds  Batasi penerima; null berarti seluruh pelanggan.
     * @param  array<string, mixed>  $payload
     */
    public function __construct(
        public readonly array $payload,
        public readonly ?array $userIds = null,
    ) {}

    /**
     * @return array<int, int>
     */
    public function backoff(): array
    {
        return [10, 30, 60];
    }

    public function handle(WebPushSender $sender): void
    {
        if (! $sender->isConfigured()) {
            Log::warning('SendFloodPushNotifications dilewati: VAPID belum dikonfigurasi.');

            return;
        }

        $totals = ['sent' => 0, 'failed' => 0, 'expired' => 0];

        PushSubscription::query()
            ->when(
                $this->userIds !== null,
                fn ($q) => $q->whereIn('user_id', $this->userIds),
            )
            // Hormati preferensi notifikasi pengguna (PLAN §5.7).
            ->whereHas('user', function ($q): void {
                $q->where('active', true)
                    ->where(function ($inner): void {
                        $inner->whereNull('settings')
                            ->orWhereRaw("COALESCE(settings->'notif'->>'critical_flood', 'true') = 'true'");
                    });
            })
            ->chunkById(config('webpush.batch_size'), function ($subscriptions) use ($sender, &$totals): void {
                $result = $sender->send($subscriptions, $this->payload);

                $totals['sent'] += $result['sent'];
                $totals['failed'] += $result['failed'];
                $totals['expired'] += $result['expired'];
            });

        Log::info('Peringatan banjir dikirim via Web Push.', $totals);
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('SendFloodPushNotifications gagal.', [
            'error' => $exception?->getMessage(),
        ]);
    }
}

<?php

namespace App\Notifications;

use App\Enums\NotificationCategory;
use App\Notifications\Channels\WebPushChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

/**
 * Peringatan dini banjir. Dikirim lewat Web Push agar tetap diterima saat
 * aplikasi tertutup, sesuai PLAN §8.
 */
class FloodAlertNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $zoneName,
        public readonly string $riskLevel,
        public readonly ?int $riskIndex = null,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(mixed $notifiable): array
    {
        return [WebPushChannel::class];
    }

    /**
     * @return array<string, mixed>
     */
    public function toWebPush(mixed $notifiable): array
    {
        return [
            'title' => "Peringatan Banjir: {$this->zoneName}",
            'body' => $this->body(),
            'url' => '/warga/prediksi',
            // Tag sama membuat notifikasi baru menggantikan yang lama,
            // sehingga peringatan tidak menumpuk di perangkat.
            'tag' => 'flood-alert',
            'category' => NotificationCategory::Alert->value,
        ];
    }

    private function body(): string
    {
        $body = "Risiko banjir {$this->riskLevel} terdeteksi di area Anda.";

        if ($this->riskIndex !== null) {
            $body .= " Indeks risiko {$this->riskIndex}%.";
        }

        return $body.' Segera lakukan tindakan pencegahan.';
    }
}

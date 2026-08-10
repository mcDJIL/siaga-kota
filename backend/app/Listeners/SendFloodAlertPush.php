<?php

namespace App\Listeners;

use App\Events\FloodRiskUpdated;
use App\Jobs\SendFloodPushNotifications;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Kirim Web Push saat ada zona berisiko tinggi (PLAN §8).
 *
 * Broadcast lewat Reverb hanya sampai ke aplikasi yang sedang terbuka, sehingga
 * peringatan risiko tinggi perlu diteruskan sebagai Web Push.
 */
class SendFloodAlertPush implements ShouldQueue
{
    public function handle(FloodRiskUpdated $event): void
    {
        $highRiskZones = collect($event->zones)
            ->filter(fn (array $zone) => ($zone['risk_level'] ?? null) === 'tinggi');

        if ($highRiskZones->isEmpty()) {
            return;
        }

        $names = $highRiskZones
            ->pluck('name')
            ->filter()
            ->take(3)
            ->implode(', ');

        $maxIndex = (int) $highRiskZones->max('risk_index');

        SendFloodPushNotifications::dispatch([
            'title' => 'Peringatan Banjir: Risiko Tinggi',
            'body' => "Risiko banjir tinggi terdeteksi di {$names}. Segera lakukan tindakan pencegahan.",
            'url' => '/warga/prediksi',
            'tag' => 'flood-alert',
            'risk_index' => $maxIndex,
        ]);
    }
}

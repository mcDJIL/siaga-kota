<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Prediksi risiko banjir diperbarui oleh job ML. Disiarkan ke seluruh
 * pengguna agar peta & banner peringatan ikut ter-update (PLAN §8).
 *
 * Web Push untuk pengguna di zona berisiko dikirim terpisah pada M4
 * tahap Web Push, bukan lewat channel ini.
 */
class FloodRiskUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param  array<int, array<string, mixed>>  $zones
     */
    public function __construct(
        public readonly array $zones,
        public readonly ?string $generatedAt = null,
    ) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('city.flood'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'flood.risk-updated';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'zones' => $this->zones,
            'generated_at' => $this->generatedAt ?? now()->toIso8601String(),
        ];
    }
}

<?php

namespace App\Events;

use App\Models\Report;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Laporan baru dibuat warga. Disiarkan ke feed kota agar dashboard
 * petugas & admin ikut ter-update tanpa polling (PLAN §8).
 */
class ReportCreated implements ShouldBroadcast, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public readonly Report $report) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('city.reports'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'report.created';
    }

    /**
     * Payload ringkas; klien memuat detail lewat REST bila diperlukan.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        $this->report->loadMissing('category');

        return [
            'id' => $this->report->id,
            'code' => $this->report->code,
            'title' => $this->report->title,
            'status' => $this->report->status->value,
            'priority' => $this->report->priority->value,
            'category' => $this->report->category?->slug,
            'address' => $this->report->address,
            'is_emergency' => $this->report->is_emergency,
            'created_at' => $this->report->created_at?->toIso8601String(),
        ];
    }
}

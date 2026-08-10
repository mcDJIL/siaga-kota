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
 * Status laporan berubah. Disiarkan ke pelapor (agar tahu progres) dan
 * ke feed kota (agar tabel petugas/admin ikut ter-update) — PLAN §8.
 */
class ReportStatusChanged implements ShouldBroadcast, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public readonly Report $report,
        public readonly ?string $fromStatus,
        public readonly string $toStatus,
    ) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        $channels = [
            new PrivateChannel('city.reports'),
        ];

        if ($this->report->user_id) {
            $channels[] = new PrivateChannel("user.{$this->report->user_id}");
        }

        return $channels;
    }

    public function broadcastAs(): string
    {
        return 'report.status-changed';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->report->id,
            'code' => $this->report->code,
            'title' => $this->report->title,
            'from_status' => $this->fromStatus,
            'to_status' => $this->toStatus,
            'resolution_note' => $this->report->resolution_note,
            'updated_at' => $this->report->updated_at?->toIso8601String(),
        ];
    }
}

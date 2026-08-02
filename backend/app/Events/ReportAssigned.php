<?php

namespace App\Events;

use App\Models\Report;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Laporan ditugaskan ke petugas ("Kirim Petugas"). Disiarkan ke channel
 * penugasan milik petugas tersebut dan ke feed kota (PLAN §8).
 */
class ReportAssigned implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public readonly Report $report,
        public readonly string $operatorId,
    ) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("ops.{$this->operatorId}.assignments"),
            new PrivateChannel('city.reports'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'report.assigned';
    }

    /**
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
            'assigned_to' => $this->operatorId,
        ];
    }
}

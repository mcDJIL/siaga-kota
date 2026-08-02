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
 * Laporan ditandai darurat oleh petugas. Menaikkan prioritas dan
 * memunculkan badge Darurat di dashboard petugas/admin (PLAN §8).
 */
class ReportMarkedEmergency implements ShouldBroadcast
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
        return 'report.marked-emergency';
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
            'is_emergency' => $this->report->is_emergency,
            'priority' => $this->report->priority->value,
        ];
    }
}

<?php

namespace App\Events;

use App\Models\Announcement;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Pengumuman dipublikasikan. Disiarkan ringan ke seluruh pengguna aktif
 * agar banner/daftar pengumuman ikut ter-update (PLAN §8).
 *
 * Hanya di-dispatch saat status `published`; draft tidak pernah disiarkan.
 */
class AnnouncementPublished implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public readonly Announcement $announcement) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('city.announcements'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'announcement.published';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->announcement->id,
            'title' => $this->announcement->title,
            'type' => $this->announcement->type->value,
            'audience' => $this->announcement->audience->value,
            'audience_value' => $this->announcement->audience_value,
            'published_at' => $this->announcement->published_at?->toIso8601String(),
            'expires_at' => $this->announcement->expires_at?->toIso8601String(),
        ];
    }
}

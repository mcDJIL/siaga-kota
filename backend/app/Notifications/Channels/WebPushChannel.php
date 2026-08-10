<?php

namespace App\Notifications\Channels;

use App\Models\PushSubscription;
use App\Services\WebPushSender;
use Illuminate\Notifications\Notification;

/**
 * Channel notifikasi Web Push kustom (PLAN §2).
 *
 * Notifikasi yang memakai channel ini wajib menyediakan `toWebPush()` yang
 * mengembalikan payload array: title, body, url, tag.
 */
class WebPushChannel
{
    public function __construct(private readonly WebPushSender $sender) {}

    public function send(mixed $notifiable, Notification $notification): void
    {
        if (! method_exists($notification, 'toWebPush')) {
            return;
        }

        $payload = $notification->toWebPush($notifiable);

        if ($payload === [] || ! $notifiable instanceof \App\Models\User) {
            return;
        }

        $subscriptions = PushSubscription::query()
            ->where('user_id', $notifiable->id)
            ->get();

        $this->sender->send($subscriptions, $payload);
    }
}

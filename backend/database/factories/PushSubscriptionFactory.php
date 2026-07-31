<?php

namespace Database\Factories;

use App\Models\PushSubscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<PushSubscription>
 */
class PushSubscriptionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'endpoint' => 'https://fcm.googleapis.com/fcm/send/'.Str::random(32),
            'keys_p256dh' => base64_encode(Str::random(64)),
            'keys_auth' => base64_encode(Str::random(16)),
            'payload_encoding' => 'aes128gcm',
        ];
    }
}

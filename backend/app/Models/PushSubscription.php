<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Langganan Web Push (VAPID) milik pengguna, sesuai PLAN §5.1.
 */
#[Fillable([
    'user_id',
    'endpoint',
    'keys_p256dh',
    'keys_auth',
    'payload_encoding',
])]
class PushSubscription extends Model
{
    /** @use HasFactory<\Database\Factories\PushSubscriptionFactory> */
    use HasFactory, HasUlids;

    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

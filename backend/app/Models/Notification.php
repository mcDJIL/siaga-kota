<?php

namespace App\Models;

use App\Enums\NotificationCategory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'report_id',
    'type',
    'category',
    'title',
    'description',
    'priority',
    'status',
    'read_at',
    'confirmed_at',
])]
class Notification extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $table = 'notifications';

    protected function casts(): array
    {
        return [
            'category' => NotificationCategory::class,
            'read_at' => 'datetime',
            'confirmed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('status', 'unread');
    }

    public function scopeByCategory(Builder $query, ?string $category): Builder
    {
        if (! $category || $category === 'semua') {
            return $query;
        }

        return $query->where('category', $category);
    }

    public function scopeByStatus(Builder $query, ?string $status): Builder
    {
        if (! $status || $status === 'semua') {
            return $query->where('status', '!=', 'hidden');
        }

        return $query->where('status', $status);
    }

    public function scopeByPriority(Builder $query, ?string $priority): Builder
    {
        if (! $priority || $priority === 'semua') {
            return $query;
        }

        return $query->where('priority', $priority);
    }

    public function markAsRead(): void
    {
        $this->update([
            'status' => 'read',
            'read_at' => now(),
        ]);
    }

    public function markAsConfirmed(): void
    {
        $this->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);
    }

    public function hide(): void
    {
        $this->update(['status' => 'hidden']);
    }
}

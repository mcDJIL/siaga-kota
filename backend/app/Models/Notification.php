<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
class Notification extends Authenticatable
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $table = 'notifications';

    protected $casts = [
        'read_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * Scope to get only unread notifications
     */
    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    /**
     * Scope to filter by category
     */
    public function scopeByCategory($query, $category)
    {
        if ($category === 'semua') {
            return $query;
        }
        return $query->where('category', $category);
    }

    /**
     * Scope to filter by status
     */
    public function scopeByStatus($query, $status)
    {
        if ($status === 'semua') {
            return $query->whereNotIn('status', ['hidden']);
        }
        return $query->where('status', $status);
    }

    /**
     * Scope to filter by priority
     */
    public function scopeByPriority($query, $priority)
    {
        if ($priority === 'semua') {
            return $query;
        }
        return $query->where('priority', $priority);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead()
    {
        $this->update([
            'status' => 'read',
            'read_at' => now(),
        ]);
    }

    /**
     * Mark notification as confirmed
     */
    public function markAsConfirmed()
    {
        $this->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);
    }

    /**
     * Hide notification
     */
    public function hide()
    {
        $this->update(['status' => 'hidden']);
    }
}

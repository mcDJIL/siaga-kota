<?php

namespace App\Models;

use App\Enums\ReportPriority;
use App\Enums\ReportStatus;
use App\Enums\WasteType;
use App\Models\ReportAttachment;
use App\Models\ReportStatusHistory;
use App\Services\NotificationService;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'code',
    'user_id',
    'category_id',
    'waste_type',
    'title',
    'description',
    'status',
    'priority',
    'location',
    'address',
    'water_level_cm',
    'is_emergency',
    'photo_path',
    'assigned_to',
    'accepted_at',
    'processed_at',
    'resolved_at',
    'resolution_note',
])]
class Report extends Model
{
    /** @use HasFactory<\Database\Factories\ReportFactory> */
    use HasFactory, HasUlids, SoftDeletes;

    protected static function booted(): void
    {
        static::created(function (Report $report) {
            // Create notification for new report
            NotificationService::createNewReportNotification($report);
            
            // Create flood alert if applicable
            if ($report->category?->slug === 'banjir' && $report->water_level_cm) {
                NotificationService::createFloodAlertNotification($report);
            }
        });

        static::updating(function (Report $report) {
            // Check if status changed
            if ($report->isDirty('status')) {
                $oldStatus = $report->getOriginal('status');
                $newStatus = $report->getAttribute('status');
                
                // Create status update notification
                NotificationService::createStatusUpdateNotification($report, $oldStatus, $newStatus);
                
                // Create completion notification if completed
                if ($newStatus === 'selesai') {
                    NotificationService::createCompletionNotification($report);
                }
            }
        });
    }

    protected function casts(): array
    {
        return [
            'status' => ReportStatus::class,
            'priority' => ReportPriority::class,
            'waste_type' => WasteType::class,
            'is_emergency' => 'boolean',
            'water_level_cm' => 'integer',
            'accepted_at' => 'datetime',
            'processed_at' => 'datetime',
            'resolved_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ReportCategory::class, 'category_id');
    }

    public function assignedOperator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(ReportStatusHistory::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ReportAttachment::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Get latitude from PostGIS Point.
     */
    public function getLatitudeAttribute(): ?float
    {
        $location = $this->attributes['location'] ?? null;

        if (! $location || $location instanceof \Illuminate\Database\Query\Expression) {
            return null;
        }

        // Parse "POINT(lng lat)" format dari PostGIS
        if (preg_match('/POINT\(([^ ]+) ([^ ]+)\)/', $location, $matches)) {
            return (float) $matches[2];
        }

        return null;
    }

    /**
     * Get longitude from PostGIS Point.
     */
    public function getLongitudeAttribute(): ?float
    {
        $location = $this->attributes['location'] ?? null;

        if (! $location || $location instanceof \Illuminate\Database\Query\Expression) {
            return null;
        }

        if (preg_match('/POINT\(([^ ]+) ([^ ]+)\)/', $location, $matches)) {
            return (float) $matches[1];
        }

        return null;
    }
}

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
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
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
            'location' => 'string',
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

    public function assignedDepartment(): HasOneThrough
    {
        return $this->hasOneThrough(
            Department::class,
            User::class,
            'id',           // Foreign key on users table
            'id',           // Foreign key on departments table
            'assigned_to',  // Local key on reports table
            'department_id' // Local key on users table
        );
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
     * Extract coordinates from PostGIS Point string.
     * Format: POINT(longitude latitude) or SRID=4326;POINT(longitude latitude)
     */
    private function parsePointCoordinates(): ?array
    {
        $location = $this->attributes['location'] ?? null;

        if (! $location) {
            return null;
        }

        $location = trim((string) $location);

        // Handle SRID prefix: SRID=4326;POINT(...)
        if (strpos($location, 'SRID') !== false) {
            $location = preg_replace('/^SRID=\d+;/', '', $location);
            $location = trim($location);
        }

        // Match POINT(lng lat) or POINT(lat lng)
        if (preg_match('/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/', $location, $matches)) {
            return [
                'longitude' => (float) $matches[1],
                'latitude' => (float) $matches[2],
            ];
        }

        return null;
    }

    /**
     * Get latitude from PostGIS Point.
     */
    public function getLatitudeAttribute(): ?float
    {
        $coords = $this->parsePointCoordinates();
        return $coords['latitude'] ?? null;
    }

    /**
     * Get longitude from PostGIS Point.
     */
    public function getLongitudeAttribute(): ?float
    {
        $coords = $this->parsePointCoordinates();
        return $coords['longitude'] ?? null;
    }

    public function getPosition(): ?array
    {
        $latitude = $this->latitude;
        $longitude = $this->longitude;

        if ($latitude === null || $longitude === null) {
            return null;
        }

        return [$latitude, $longitude];
    }
}

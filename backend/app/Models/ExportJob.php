<?php

namespace App\Models;

use App\Enums\ExportDataType;
use App\Enums\ExportFormat;
use App\Enums\ExportStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'data_type',
    'format',
    'date_from',
    'date_to',
    'filters',
    'status',
    'file_path',
    'filename',
    'row_count',
    'error',
    'expires_at',
])]
class ExportJob extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'export_jobs';

    protected function casts(): array
    {
        return [
            'data_type' => ExportDataType::class,
            'format' => ExportFormat::class,
            'status' => ExportStatus::class,
            'date_from' => 'date',
            'date_to' => 'date',
            'filters' => 'array',
            'row_count' => 'integer',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', ExportStatus::Completed->value);
    }

    /**
     * Berkas hasil ekspor sudah tersedia dan belum kedaluwarsa.
     */
    public function isDownloadable(): bool
    {
        if ($this->status !== ExportStatus::Completed) {
            return false;
        }

        if (! $this->file_path) {
            return false;
        }

        return ! $this->expires_at || $this->expires_at->isFuture();
    }

    public function markAsCompleted(string $filePath, string $filename, int $rowCount): void
    {
        $this->update([
            'status' => ExportStatus::Completed->value,
            'file_path' => $filePath,
            'filename' => $filename,
            'row_count' => $rowCount,
            'expires_at' => now()->addDays(7),
        ]);
    }

    public function markAsFailed(string $error): void
    {
        $this->update([
            'status' => ExportStatus::Failed->value,
            'error' => $error,
        ]);
    }
}

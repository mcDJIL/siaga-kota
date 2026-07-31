<?php

namespace App\Models;

use App\Enums\AnnouncementAudience;
use App\Enums\AnnouncementStatus;
use App\Enums\AnnouncementType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'title',
    'body',
    'type',
    'audience',
    'audience_value',
    'status',
    'created_by',
    'published_at',
    'expires_at',
])]
class Announcement extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected function casts(): array
    {
        return [
            'type' => AnnouncementType::class,
            'audience' => AnnouncementAudience::class,
            'status' => AnnouncementStatus::class,
            'published_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Pengumuman yang sudah dipublikasikan dan belum kedaluwarsa.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', AnnouncementStatus::Published->value)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->where(function (Builder $inner): void {
                $inner->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    /**
     * Filter berdasarkan audiens. Pengumuman `all` selalu disertakan.
     */
    public function scopeForAudience(Builder $query, ?string $audience): Builder
    {
        if (! $audience || $audience === AnnouncementAudience::All->value) {
            return $query;
        }

        return $query->whereIn('audience', [
            AnnouncementAudience::All->value,
            $audience,
        ]);
    }

    /**
     * Audiens yang relevan untuk satu pengguna, berdasarkan perannya.
     */
    public function scopeVisibleTo(Builder $query, User $user): Builder
    {
        $audiences = [AnnouncementAudience::All->value];

        if ($user->hasRole('warga')) {
            $audiences[] = AnnouncementAudience::Warga->value;
        }

        if ($user->hasRole('petugas') || $user->hasRole('admin')) {
            $audiences[] = AnnouncementAudience::Petugas->value;
        }

        return $query->where(function (Builder $inner) use ($audiences, $user): void {
            $inner->whereIn('audience', $audiences);

            if ($user->rw) {
                $inner->orWhere(function (Builder $rw) use ($user): void {
                    $rw->where('audience', AnnouncementAudience::Rw->value)
                        ->where('audience_value', $user->rw);
                });
            }
        });
    }
}

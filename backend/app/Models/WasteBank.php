<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'location',
    'address',
    'capacity',
    'contact',
    'active',
])]
class WasteBank extends Model
{
    /** @use HasFactory<\Database\Factories\WasteBankFactory> */
    use HasFactory, HasUlids;

    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'active' => 'boolean',
        ];
    }

    public function getLatitudeAttribute(): ?float
    {
        $location = $this->attributes['location'] ?? null;

        if (! $location || $location instanceof \Illuminate\Database\Query\Expression) {
            return null;
        }

        if (preg_match('/POINT\(([^ ]+) ([^ ]+)\)/', $location, $matches)) {
            return (float) $matches[2];
        }

        return null;
    }

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

<?php

namespace App\Models;

use Database\Factories\WasteBankFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Expression;

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
    /** @use HasFactory<WasteBankFactory> */
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

        if (! $location || $location instanceof Expression) {
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

        if (! $location || $location instanceof Expression) {
            return null;
        }

        if (preg_match('/POINT\(([^ ]+) ([^ ]+)\)/', $location, $matches)) {
            return (float) $matches[1];
        }

        return null;
    }
}

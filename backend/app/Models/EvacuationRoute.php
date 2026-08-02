<?php

namespace App\Models;

use Database\Factories\EvacuationRouteFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Expression;

#[Fillable([
    'name',
    'path',
    'description',
    'active',
])]
class EvacuationRoute extends Model
{
    /** @use HasFactory<EvacuationRouteFactory> */
    use HasFactory, HasUlids;

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    /**
     * Parse LineString WKT to array of [lng, lat] coordinates.
     * Example: "LINESTRING(113.1 -8.1, 113.2 -8.2)" -> [[113.1, -8.1], [113.2, -8.2]]
     */
    public function getCoordinatesAttribute(): ?array
    {
        $path = $this->attributes['path'] ?? null;

        if (! $path || $path instanceof Expression) {
            return null;
        }

        if (preg_match('/LINESTRING\(([^)]+)\)/', $path, $matches)) {
            $coords = explode(',', $matches[1]);

            return array_map(function ($coord) {
                [$lng, $lat] = explode(' ', trim($coord));

                return [(float) $lng, (float) $lat];
            }, $coords);
        }

        return null;
    }
}

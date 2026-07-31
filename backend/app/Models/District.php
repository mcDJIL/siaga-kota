<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
    'slug',
    'latitude',
    'longitude',
    'elevation',
    'river_distance',
    'population_density',
    'drainage_score',
    'waste_reports_count',
    'flood_reports_count',
    'ai_predictions_count',
    'risk_score',
    'status',
    'action_required',
])]
class District extends Model
{
    use HasFactory, HasUlids;

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function getPositionAttribute(): array
    {
        return [(float) $this->latitude, (float) $this->longitude];
    }
}

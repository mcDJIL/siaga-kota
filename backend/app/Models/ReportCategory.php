<?php

namespace App\Models;

use App\Enums\ReportPriority;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'slug',
    'name',
    'icon',
    'default_priority',
    'active',
])]
class ReportCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ReportCategoryFactory> */
    use HasFactory, HasUlids;
    
    protected function casts(): array
    {
        return [
            'default_priority' => ReportPriority::class,
            'active' => 'boolean',
        ];
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'category_id');
    }
}

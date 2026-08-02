<?php

namespace App\Models;

use App\Enums\DepartmentType;
use Database\Factories\DepartmentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

#[Fillable([
    'name',
    'slug',
    'type',
    'active',
])]
class Department extends Model
{
    /** @use HasFactory<DepartmentFactory> */
    use HasFactory, HasUlids;

    protected function casts(): array
    {
        return [
            'type' => DepartmentType::class,
            'active' => 'boolean',
        ];
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function assignedReports(): HasManyThrough
    {
        return $this->hasManyThrough(
            Report::class,
            User::class,
            'department_id',
            'assigned_to',
            'id',
            'id'
        );
    }
}

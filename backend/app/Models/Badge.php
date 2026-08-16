<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $table = 'badges';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'slug', 'name', 'icon', 'description', 'tier', 'criteria', 'active'];

    protected $casts = [
        'criteria' => 'array',
        'active' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_badges')->withPivot('earned_at');
    }
}

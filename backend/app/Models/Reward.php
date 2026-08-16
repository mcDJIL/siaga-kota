<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    use HasFactory;

    protected $table = 'rewards';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'description', 'cost_points', 'stock', 'image_path', 'active'];

    protected $casts = [
        'active' => 'boolean',
    ];
}

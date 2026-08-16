<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBadge extends Model
{
    use HasFactory;

    protected $table = 'user_badges';
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'user_id', 'badge_id', 'earned_at'];

    public function badge()
    {
        return $this->belongsTo(Badge::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

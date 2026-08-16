<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImpactPointLedger extends Model
{
    use HasFactory;

    public $table = 'impact_point_ledger';
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'user_id', 'points', 'source', 'source_id', 'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

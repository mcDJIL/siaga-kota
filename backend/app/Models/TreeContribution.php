<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreeContribution extends Model
{
    use HasFactory;

    protected $table = 'tree_contributions';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'user_id', 'trigger_count', 'status', 'note'];
}

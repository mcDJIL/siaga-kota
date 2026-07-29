<?php

namespace App\Enums;

enum ReportPriority: string
{
    case Rendah = 'rendah';
    case Sedang = 'sedang';
    case Tinggi = 'tinggi';
    case Mendesak = 'mendesak';
}

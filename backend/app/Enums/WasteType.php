<?php

namespace App\Enums;

enum WasteType: string
{
    case Organik = 'organik';
    case Plastik = 'plastik';
    case B3 = 'b3';
    case Lainnya = 'lainnya';
}

<?php

namespace App\Enums;

enum DepartmentType: string
{
    case DinasKebersihan = 'dinas_kebersihan';
    case DinasPu = 'dinas_pu';
    case SatpolPp = 'satpol_pp';
    case Bpbd = 'bpbd';
    case Lainnya = 'lainnya';
}

<?php

namespace App\Enums;

/**
 * Jenis instansi/dinas sesuai PLAN §5.1.
 */
enum DepartmentType: string
{
    case DinasKebersihan = 'dinas_kebersihan';
    case DinasPu = 'dinas_pu';
    case SatpolPp = 'satpol_pp';
    case Bpbd = 'bpbd';
    case Lainnya = 'lainnya';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::DinasKebersihan => 'Dinas Kebersihan',
            self::DinasPu => 'Dinas PU / Tata Air',
            self::SatpolPp => 'Satpol PP',
            self::Bpbd => 'BPBD',
            self::Lainnya => 'Lainnya',
        };
    }
}

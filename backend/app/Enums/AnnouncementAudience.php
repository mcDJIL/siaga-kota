<?php

namespace App\Enums;

/**
 * Audiens pengumuman sesuai PLAN §5.5 dan §6.6.
 */
enum AnnouncementAudience: string
{
    case All = 'all';
    case Warga = 'warga';
    case Petugas = 'petugas';
    case Rw = 'rw';
    case Zone = 'zone';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::All => 'Semua',
            self::Warga => 'Warga',
            self::Petugas => 'Staf',
            self::Rw => 'RW',
            self::Zone => 'Zona',
        };
    }
}

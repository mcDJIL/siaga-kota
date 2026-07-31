<?php

namespace App\Enums;

/**
 * Kategori notifikasi in-app sesuai PLAN §5.5 dan §6.6.
 */
enum NotificationCategory: string
{
    case Alert = 'alert';
    case LaporanBaru = 'laporan_baru';
    case Sistem = 'sistem';
    case Maintenance = 'maintenance';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Alert => 'Peringatan Banjir',
            self::LaporanBaru => 'Laporan Baru',
            self::Sistem => 'Sistem',
            self::Maintenance => 'Maintenance',
        };
    }
}

<?php

namespace App\Enums;

/**
 * Tipe pengumuman sesuai PLAN §5.5 dan §6.6.
 */
enum AnnouncementType: string
{
    case Info = 'info';
    case Warning = 'warning';
    case Weather = 'weather';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Info => 'Info',
            self::Warning => 'Warning',
            self::Weather => 'Cuaca',
        };
    }
}

<?php

namespace App\Enums;

/**
 * Status pengumuman sesuai PLAN §5.5 dan §6.6.
 */
enum AnnouncementStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::Published => 'Aktif',
            self::Archived => 'Arsip',
        };
    }
}

<?php

namespace App\Enums;

/**
 * Status job ekspor asinkron sesuai PLAN §5.8.
 */
enum ExportStatus: string
{
    case Processing = 'processing';
    case Completed = 'completed';
    case Failed = 'failed';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Processing => 'Memproses',
            self::Completed => 'Selesai',
            self::Failed => 'Gagal',
        };
    }
}

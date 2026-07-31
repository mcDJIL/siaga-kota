<?php

namespace App\Enums;

/**
 * Jenis data yang bisa diekspor sesuai PLAN §5.8.
 */
enum ExportDataType: string
{
    case All = 'all';
    case Waste = 'waste';
    case Flood = 'flood';
    case Analytics = 'analytics';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::All => 'Semua Sektor',
            self::Waste => 'Analitik Sampah',
            self::Flood => 'Analitik Banjir',
            self::Analytics => 'Analitik Umum',
        };
    }
}

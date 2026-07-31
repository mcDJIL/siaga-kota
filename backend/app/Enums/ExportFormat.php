<?php

namespace App\Enums;

/**
 * Format berkas ekspor sesuai PLAN §5.8.
 */
enum ExportFormat: string
{
    case Pdf = 'pdf';
    case Excel = 'excel';
    case Csv = 'csv';

    /**
     * Label yang ditampilkan di UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Pdf => 'PDF',
            self::Excel => 'Excel',
            self::Csv => 'CSV',
        };
    }

    /**
     * Ekstensi berkas hasil ekspor.
     */
    public function extension(): string
    {
        return match ($this) {
            self::Pdf => 'pdf',
            self::Excel => 'xls',
            self::Csv => 'csv',
        };
    }
}

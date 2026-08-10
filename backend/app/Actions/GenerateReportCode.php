<?php

namespace App\Actions;

use App\Models\Report;
use App\Models\ReportCategory;

class GenerateReportCode
{
    /**
     * Generate unique human-friendly report code.
     * Format: PREFIX-NNNN
     * Example: SK-2023-891, FLD-8923, W-902
     */
    public function execute(ReportCategory $category): string
    {
        $prefix = $this->getPrefixForCategory($category->slug);

        // Ambil nomor terakhir untuk prefix ini di tahun berjalan
        $year = now()->year;
        $lastCode = Report::query()
            ->where('code', 'like', "{$prefix}-{$year}-%")
            ->orderByDesc('code')
            ->value('code');

        if ($lastCode) {
            // Parse nomor dari kode terakhir
            $parts = explode('-', $lastCode);
            $lastNumber = (int) end($parts);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return sprintf('%s-%s-%03d', $prefix, $year, $nextNumber);
    }

    private function getPrefixForCategory(string $slug): string
    {
        return match ($slug) {
            'sampah' => 'SK',       // Sampah/Kebersihan
            'banjir' => 'FLD',      // Flood
            'drainase' => 'DRN',    // Drainage
            'infrastruktur' => 'INF',
            'darurat' => 'EMG',     // Emergency
            default => 'RPT',        // Report generic
        };
    }
}

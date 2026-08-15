<?php

namespace App\Actions;

use App\Events\ReportAssigned;
use App\Models\Report;
use App\Models\User;

class AssignReport
{
    /**
     * Tugaskan laporan ke petugas.
     *
     * Perubahan status ditangani oleh controller agar tercatat dalam histori.
     */
    public function execute(Report $report, User $operator): Report
    {
        $report->update([
            'assigned_to' => $operator->id,
        ]);

        $report = $report->fresh()->load(['assignedOperator']);

        ReportAssigned::dispatch($report, $operator->id);

        return $report;
    }
}

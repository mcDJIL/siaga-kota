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
     * Sesuai PLAN Resolved Decision #5, penugasan hanya mengisi `assigned_to`
     * tanpa mengubah status laporan.
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

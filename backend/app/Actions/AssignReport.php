<?php

namespace App\Actions;

use App\Models\Report;
use App\Models\User;

class AssignReport
{
    public function execute(Report $report, User $operator): Report
    {
        $report->update([
            'assigned_to' => $operator->id,
        ]);

        return $report->fresh()->load(['assignedOperator']);
    }
}
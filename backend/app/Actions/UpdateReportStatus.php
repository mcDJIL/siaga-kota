<?php

namespace App\Actions;

use App\Enums\ReportStatus;
use App\Events\ReportStatusChanged;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateReportStatus
{
    public function execute(Report $report, string $newStatus, User $actor, ?string $note = null): Report
    {
        return DB::transaction(function () use ($report, $newStatus, $actor, $note): Report {
            $oldStatus = $report->status->value;

            $report->update([
                'status' => $newStatus,
            ]);

            // Update timestamp sesuai status
            match ($newStatus) {
                ReportStatus::Diverifikasi->value => $report->update(['accepted_at' => now()]),
                ReportStatus::Diproses->value => $report->update(['processed_at' => now()]),
                ReportStatus::Selesai->value => $report->update(['resolved_at' => now()]),
                default => null,
            };

            // Catat histori
            ReportStatusHistory::query()->create([
                'report_id' => $report->id,
                'from_status' => $oldStatus,
                'to_status' => $newStatus,
                'actor_id' => $actor->id,
                'note' => $note,
                'created_at' => now(),
            ]);

            $report = $report->fresh()->load(['category', 'user', 'assignedOperator', 'statusHistories.actor']);

            ReportStatusChanged::dispatch($report, $oldStatus, $newStatus);

            return $report;
        });
    }
}

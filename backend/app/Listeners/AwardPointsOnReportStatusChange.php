<?php

namespace App\Listeners;

use App\Events\ReportStatusChanged;
use App\Enums\ReportStatus;
use App\Models\ImpactPointLedger;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Support\Str;

class AwardPointsOnReportStatusChange
{
    /**
     * Handle the event.
     */
    public function handle(ReportStatusChanged $event): void
    {
        $report = $event->report;
        $userId = $report->user_id;

        if (! $userId) {
            return;
        }

        // Only award when status becomes 'diproses'
        if ($event->toStatus !== ReportStatus::Diproses->value) {
            return;
        }

        // Award points (configurable value). Use +50 per PLAN.
        $points = 50;

        ImpactPointLedger::create([
            'id' => (string) Str::ulid(),
            'user_id' => $userId,
            'points' => $points,
            'source' => 'report_processed',
            'source_id' => (string) $report->id,
            'created_at' => now(),
        ]);

        // Simple badge evaluation: look for badges with criteria.reports_processed
        $badges = Badge::where('active', true)
            ->whereNotNull('criteria')
            ->get();

        foreach ($badges as $badge) {
            $criteria = $badge->criteria ?? [];

            if (! isset($criteria['reports_processed'])) {
                continue;
            }

            $threshold = (int) $criteria['reports_processed'];

            // Skip if already earned
            $exists = UserBadge::query()
                ->where('user_id', $userId)
                ->where('badge_id', $badge->id)
                ->exists();

            if ($exists) {
                continue;
            }

            $count = ImpactPointLedger::query()
                ->where('user_id', $userId)
                ->where('source', 'report_processed')
                ->count();

            if ($count >= $threshold) {
                UserBadge::create([
                    'id' => (string) Str::ulid(),
                    'user_id' => $userId,
                    'badge_id' => $badge->id,
                    'earned_at' => now(),
                ]);
            }
        }
    }
}

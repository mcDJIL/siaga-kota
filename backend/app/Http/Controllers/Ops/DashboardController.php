<?php

namespace App\Http\Controllers\Ops;

use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Ringkasan wilayah kerja petugas sesuai PLAN §6.3.
     *
     * @group Ops - Dashboard
     *
     * @authenticated
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'summary' => $this->summary(),
                'by_category' => $this->countByCategory(),
                'weekly_performance' => $this->weeklyPerformance(),
                'recent_reports' => ReportResource::collection($this->recentReports())->resolve(),
            ],
        ]);
    }

    /**
     * Hitungan laporan per status dalam satu query agregat.
     *
     * @return array<string, int>
     */
    private function summary(): array
    {
        $counts = Report::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $get = fn (ReportStatus $status): int => (int) ($counts[$status->value] ?? 0);

        return [
            'total' => (int) $counts->sum(),
            'menunggu' => $get(ReportStatus::Menunggu),
            'diverifikasi' => $get(ReportStatus::Diverifikasi),
            'diproses' => $get(ReportStatus::Diproses),
            'selesai' => $get(ReportStatus::Selesai),
            'ditolak' => $get(ReportStatus::Ditolak),
            'darurat' => Report::query()->where('is_emergency', true)->count(),
        ];
    }

    /**
     * Jumlah laporan per slug kategori.
     *
     * @return array<string, int>
     */
    private function countByCategory(): array
    {
        return Report::query()
            ->join('report_categories', 'reports.category_id', '=', 'report_categories.id')
            ->groupBy('report_categories.slug')
            ->selectRaw('report_categories.slug as slug, count(*) as total')
            ->pluck('total', 'slug')
            ->map(fn ($total) => (int) $total)
            ->all();
    }

    /**
     * Performa 7 hari terakhir: laporan masuk vs diselesaikan per hari.
     *
     * @return array<int, array<string, mixed>>
     */
    private function weeklyPerformance(): array
    {
        $since = now()->subDays(6)->startOfDay();

        $created = Report::query()
            ->where('created_at', '>=', $since)
            ->groupBy(DB::raw('date(created_at)'))
            ->selectRaw('date(created_at) as day, count(*) as total')
            ->pluck('total', 'day');

        $resolved = Report::query()
            ->whereNotNull('resolved_at')
            ->where('resolved_at', '>=', $since)
            ->groupBy(DB::raw('date(resolved_at)'))
            ->selectRaw('date(resolved_at) as day, count(*) as total')
            ->pluck('total', 'day');

        return collect(range(6, 0))
            ->map(function (int $daysAgo) use ($created, $resolved): array {
                $date = now()->subDays($daysAgo)->toDateString();

                return [
                    'date' => $date,
                    'created' => (int) ($created[$date] ?? 0),
                    'resolved' => (int) ($resolved[$date] ?? 0),
                ];
            })
            ->all();
    }

    /**
     * @return Collection<int, Report>
     */
    private function recentReports(): Collection
    {
        return Report::query()
            ->with(['category', 'user', 'assignedOperator'])
            ->latest('created_at')
            ->limit(5)
            ->get();
    }
}

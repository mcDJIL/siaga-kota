<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class WasteReportController extends Controller
{
    public function getWasteReportStats(): JsonResponse
    {
        $cacheKey = 'waste_report_stats';
        $cacheMinutes = 10;

        return response()->json([
            'data' => [
                'stats' => Cache::remember($cacheKey, $cacheMinutes * 60, function () {
                    $currentPeriodStart = Carbon::now()->startOfMonth();
                    $currentPeriodEnd = Carbon::now()->endOfMonth();
                    $previousPeriodStart = Carbon::now()->subMonth()->startOfMonth();
                    $previousPeriodEnd = Carbon::now()->subMonth()->endOfMonth();

                    $stats = DB::table('reports')
                        ->join('report_categories', 'reports.category_id', '=', 'report_categories.id')
                        ->where('report_categories.slug', 'sampah')
                        ->where('reports.deleted_at', null)
                        ->selectRaw('
                            COUNT(CASE WHEN 1=1 THEN 1 END) as total_all,
                            COUNT(CASE WHEN reports.status = ? THEN 1 END) as completed_all,
                            COUNT(CASE WHEN reports.created_at BETWEEN ? AND ? THEN 1 END) as total_current,
                            COUNT(CASE WHEN reports.created_at BETWEEN ? AND ? AND reports.status = ? THEN 1 END) as completed_current,
                            COUNT(CASE WHEN reports.created_at BETWEEN ? AND ? THEN 1 END) as total_previous,
                            COUNT(CASE WHEN reports.created_at BETWEEN ? AND ? AND reports.status = ? THEN 1 END) as completed_previous,
                            AVG(CASE WHEN reports.accepted_at IS NOT NULL THEN EXTRACT(EPOCH FROM (reports.accepted_at - reports.created_at))/3600 END) as avg_response_all,
                            AVG(CASE WHEN reports.created_at BETWEEN ? AND ? AND reports.accepted_at IS NOT NULL THEN EXTRACT(EPOCH FROM (reports.accepted_at - reports.created_at))/3600 END) as avg_response_previous
                        ',
                            ['selesai', $currentPeriodStart, $currentPeriodEnd, $currentPeriodStart, $currentPeriodEnd, 'selesai', $previousPeriodStart, $previousPeriodEnd, $previousPeriodStart, $previousPeriodEnd, 'selesai', $previousPeriodStart, $previousPeriodEnd]
                        )
                        ->first();

                    $totalReports = (int) $stats->total_all;
                    $completedReports = (int) $stats->completed_all;
                    $currentPeriodTotal = (int) $stats->total_current;
                    $currentPeriodCompleted = (int) $stats->completed_current;
                    $previousPeriodTotal = (int) $stats->total_previous;
                    $previousPeriodCompleted = (int) $stats->completed_previous;
                    $averageResponseTime = $stats->avg_response_all ? round($stats->avg_response_all) : 0;
                    $previousAvgResponseTime = $stats->avg_response_previous ? round($stats->avg_response_previous) : $averageResponseTime;

                    // Total trend
                    $totalTrend = $previousPeriodTotal > 0
                        ? round((($currentPeriodTotal - $previousPeriodTotal) / $previousPeriodTotal) * 100)
                        : ($currentPeriodTotal > 0 ? 100 : 0);
                    $totalTrendClassName = $totalTrend >= 0
                        ? 'bg-brand-green-light/50 text-brand-green'
                        : 'bg-[#FFDAD6]/50 text-[#BA1A1A]';
                    $totalTrendValue = ($totalTrend >= 0 ? '+' : '').$totalTrend.'%';

                    // Completed trend
                    $completedTrend = $previousPeriodCompleted > 0
                        ? round((($currentPeriodCompleted - $previousPeriodCompleted) / $previousPeriodCompleted) * 100)
                        : ($currentPeriodCompleted > 0 ? 100 : 0);
                    $completedTrendClassName = $completedTrend >= 0
                        ? 'bg-brand-green-light/50 text-brand-green'
                        : 'bg-[#FFDAD6]/50 text-[#BA1A1A]';
                    $completedTrendValue = ($completedTrend >= 0 ? '+' : '').$completedTrend.'%';

                    // Response time trend
                    $responseTrendHours = $previousAvgResponseTime - $averageResponseTime;
                    $responseTrendValue = ($responseTrendHours >= 0 ? '+' : '').$responseTrendHours.'h';
                    $responseTrendClassName = $responseTrendHours <= 0
                        ? 'bg-brand-green-light/50 text-brand-green'
                        : 'bg-[#FFDAD6]/50 text-[#BA1A1A]';

                    // Completion rate
                    $completionRate = $totalReports > 0 ? round(($completedReports / $totalReports) * 100) : 0;
                    $currentCompletionRate = $currentPeriodTotal > 0
                        ? round(($currentPeriodCompleted / $currentPeriodTotal) * 100)
                        : 0;
                    $previousCompletionRate = $previousPeriodTotal > 0
                        ? round(($previousPeriodCompleted / $previousPeriodTotal) * 100)
                        : 0;

                    // Completion rate trend
                    $completionRateTrend = $currentCompletionRate - $previousCompletionRate;
                    $completionRateTrendValue = ($completionRateTrend >= 0 ? '+' : '').$completionRateTrend.'%';
                    $completionRateTrendClassName = $completionRateTrend >= 0
                        ? 'bg-brand-green-light/50 text-brand-green'
                        : 'bg-[#FFDAD6]/50 text-[#BA1A1A]';

                    return [
                        [
                            'id' => 'total-laporan',
                            'label' => 'Total Laporan Sampah',
                            'value' => $totalReports,
                            'icon' => 'Trash2',
                            'iconBg' => 'bg-brand-green-light/30',
                            'iconColor' => 'text-brand-green',
                            'trend' => ['value' => $totalTrendValue, 'className' => $totalTrendClassName],
                        ],
                        [
                            'id' => 'laporan-diselesaikan',
                            'label' => 'Laporan Diselesaikan',
                            'value' => $completedReports,
                            'total' => $totalReports,
                            'icon' => 'CheckCircle2',
                            'iconBg' => 'bg-brand-green-light/30',
                            'iconColor' => 'text-brand-green',
                            'trend' => ['value' => $completedTrendValue, 'className' => $completedTrendClassName],
                            'showProgress' => true,
                        ],
                        [
                            'id' => 'rata-rata-respon',
                            'label' => 'Rata-rata Waktu Respon',
                            'value' => $averageResponseTime,
                            'unit' => 'jam',
                            'icon' => 'Clock',
                            'iconBg' => 'bg-badge-gold/20',
                            'iconColor' => 'text-[#715C00]',
                            'trend' => ['value' => $responseTrendValue, 'className' => $responseTrendClassName],
                        ],
                        [
                            'id' => 'tingkat-penyelesaian',
                            'label' => 'Tingkat Penyelesaian',
                            'value' => $completionRate,
                            'unit' => '%',
                            'icon' => 'TrendingUp',
                            'iconBg' => 'bg-navy/10',
                            'iconColor' => 'text-navy',
                            'trend' => ['value' => $completionRateTrendValue, 'className' => $completionRateTrendClassName],
                        ],
                    ];
                }),
            ],
        ]);
    }

    public function getWasteCategoryDistribution(): JsonResponse
    {
        $categories = Report::selectRaw('category_id, COUNT(*) as count')
            ->whereHas('category', fn ($q) => $q->where('slug', 'sampah'))
            ->groupBy('category_id')
            ->with('category')
            ->get()
            ->map(function ($item) {
                $colors = [
                    'Organik' => '#38A169',
                    'Plastik' => '#74DB9D',
                    'B3' => '#002045',
                    'Lainnya' => '#DCE9FF',
                ];
                $total = Report::whereHas('category', fn ($q) => $q->where('slug', 'sampah'))->count();

                return [
                    'name' => $item->category?->name ?? 'Unknown',
                    'value' => $total > 0 ? round(($item->count / $total) * 100) : 0,
                    'color' => $colors[$item->category?->name] ?? '#999999',
                ];
            })
            ->values()
            ->toArray();

        return response()->json([
            'data' => [
                'categories' => $categories,
            ],
        ]);
    }

    public function getDistrictReportStats(): JsonResponse
    {
        $districtData = Report::selectRaw('address as district, COUNT(*) as reports')
            ->whereHas('category', fn ($q) => $q->where('slug', 'sampah'))
            ->whereNotNull('address')
            ->groupBy('address')
            ->orderByDesc('reports')
            ->limit(5)
            ->get()
            ->map(fn ($d) => ['district' => $d->district, 'reports' => (int) $d->reports])
            ->toArray();

        return response()->json([
            'data' => [
                'districts' => $districtData,
            ],
        ]);
    }

    public function getRecentWasteReports(Request $request): JsonResponse
    {
        $district = $request->query('district', null);
        $perPage = $request->query('per_page', 10);

        $query = Report::selectRaw('*, ST_AsText(location) as location_text')
            ->whereHas('category', fn ($q) => $q->where('slug', 'sampah'))
            ->with(['category', 'user'])
            ->latest('created_at');

        if ($district && $district !== 'Semua Kecamatan') {
            $query->where('address', 'like', "%{$district}%");
        }

        $reports = $query->limit($perPage)->get()->map(function ($report) {
            $locationText = $report->address ?? $this->parseGeometryPoint($report->location_text);

            return [
                'id' => '#WST-'.substr($report->id, -4),
                'location' => $locationText,
                'category' => $report->category?->name ?? 'Unknown',
                'status' => $report->status ?? 'menunggu',
                'time' => $report->created_at->format('d M, H:i'),
                'reporter' => $report->user?->name ?? 'Unknown',
                'description' => substr($report->description ?? '', 0, 100),
                'photos' => $report->photos_count ?? 0,
                'assignedOfficer' => 'Not assigned',
            ];
        });

        return response()->json([
            'data' => [
                'reports' => $reports,
                'total' => Report::whereHas('category', fn ($q) => $q->where('slug', 'sampah'))->count(),
                'completed' => Report::whereHas('category', fn ($q) => $q->where('slug', 'sampah'))
                    ->where('status', 'selesai')
                    ->count(),
            ],
        ]);
    }

    private function parseGeometryPoint(string $pointText): string
    {
        if (preg_match('/POINT\(([\d.-]+)\s+([\d.-]+)\)/', $pointText, $matches)) {
            $longitude = $matches[1];
            $latitude = $matches[2];

            return "Koordinat: {$latitude}, {$longitude}";
        }

        return 'Lokasi tidak tersedia';
    }
}

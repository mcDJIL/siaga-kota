<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FloodReportController extends Controller
{
    public function getFloodReportStats(): JsonResponse
    {
        // Current month data
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        // Last month data
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        // Total reports this month
        $totalReports = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $totalReportsLastMonth = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $totalTrend = $totalReportsLastMonth > 0
            ? round((($totalReports - $totalReportsLastMonth) / $totalReportsLastMonth) * 100)
            : 0;

        // Completed reports this month
        $completedReports = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $completedReportsLastMonth = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $completedTrend = $completedReportsLastMonth > 0
            ? round((($completedReports - $completedReportsLastMonth) / $completedReportsLastMonth) * 100)
            : 0;

        // Calculate average response time (minutes from created to selesai status)
        $avgResponseTime = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/60) as avg_minutes')
            ->first()?->avg_minutes;

        $avgResponseTime = round($avgResponseTime ?? 0);

        $avgResponseTimeLastMonth = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/60) as avg_minutes')
            ->first()?->avg_minutes;

        $avgResponseTimeLastMonth = round($avgResponseTimeLastMonth ?? 0);
        $responseTrend = $avgResponseTimeLastMonth > 0
            ? round(($avgResponseTime - $avgResponseTimeLastMonth) / $avgResponseTimeLastMonth * 100)
            : 0;

        // Prevented incidents = reports with high water level that were handled quickly
        $preventedIncidents = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('water_level_cm', '>', 70)
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $preventedIncidentsLastMonth = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('water_level_cm', '>', 70)
            ->where('status', 'selesai')
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $preventedTrend = $preventedIncidentsLastMonth > 0
            ? round((($preventedIncidents - $preventedIncidentsLastMonth) / $preventedIncidentsLastMonth) * 100)
            : 0;

        $completionRate = $totalReports > 0 ? round(($completedReports / $totalReports) * 100) : 0;

        return response()->json([
            'data' => [
                'stats' => [
                    [
                        'id' => 'total-laporan',
                        'label' => 'Total Laporan Banjir',
                        'value' => $totalReports,
                        'icon' => 'Droplet',
                        'iconBg' => 'bg-navy/10',
                        'iconColor' => 'text-navy',
                        'trend' => [
                            'value' => ($totalTrend >= 0 ? '+' : '').$totalTrend.'%',
                            'className' => $totalTrend >= 0 ? 'bg-[#FFDAD6]/50 text-[#BA1A1A]' : 'bg-brand-green-light/50 text-brand-green',
                        ],
                    ],
                    [
                        'id' => 'laporan-terselesaikan',
                        'label' => 'Laporan Terselesaikan',
                        'value' => $completedReports,
                        'total' => $totalReports,
                        'icon' => 'CheckCircle2',
                        'iconBg' => 'bg-brand-green-light/30',
                        'iconColor' => 'text-brand-green',
                        'trend' => [
                            'value' => ($completedTrend >= 0 ? '+' : '').$completedTrend.'%',
                            'className' => 'bg-brand-green-light/50 text-brand-green',
                        ],
                        'showProgress' => true,
                    ],
                    [
                        'id' => 'rata-rata-respon',
                        'label' => 'Rata-rata Waktu Respon',
                        'value' => $avgResponseTime,
                        'unit' => 'mnt',
                        'icon' => 'Clock',
                        'iconBg' => 'bg-badge-gold/20',
                        'iconColor' => 'text-[#715C00]',
                        'trend' => [
                            'value' => ($responseTrend <= 0 ? '' : '+').$responseTrend.'m',
                            'className' => $responseTrend <= 0 ? 'bg-brand-green-light/50 text-brand-green' : 'bg-[#FFDAD6]/50 text-[#BA1A1A]',
                        ],
                    ],
                    [
                        'id' => 'insiden-tercegah',
                        'label' => 'Insiden Tercegah (AI)',
                        'value' => $preventedIncidents,
                        'icon' => 'ShieldCheck',
                        'iconBg' => 'bg-navy/10',
                        'iconColor' => 'text-navy',
                        'trend' => [
                            'value' => ($preventedTrend >= 0 ? '+' : '').$preventedTrend.'%',
                            'className' => 'bg-brand-green-light/50 text-brand-green',
                        ],
                        'footnote' => 'Laporan tinggi yang terselesaikan',
                    ],
                ],
            ],
        ]);
    }

    public function getDistrictFloodDistribution(): JsonResponse
    {
        $districts = Report::selectRaw('address as district, COUNT(*) as reports')
            ->whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->whereNotNull('address')
            ->groupBy('address')
            ->orderByDesc('reports')
            ->limit(7)
            ->get()
            ->map(fn ($d) => ['district' => $d->district, 'reports' => (int) $d->reports])
            ->toArray();

        return response()->json([
            'data' => [
                'districts' => $districts,
            ],
        ]);
    }

    public function getFloodSeverityDistribution(Request $request): JsonResponse
    {
        $district = $request->query('district', null);

        $query = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'));

        if ($district && $district !== 'Semua District') {
            $query->where('address', 'like', "%{$district}%");
        }

        $highCount = (clone $query)->where('water_level_cm', '>', 70)->count();
        $mediumCount = (clone $query)->where('water_level_cm', '>', 30)->where('water_level_cm', '<=', 70)->count();
        $lowCount = (clone $query)->where('water_level_cm', '<=', 30)->count();

        $total = $highCount + $mediumCount + $lowCount;

        $severityData = [
            ['name' => 'Tinggi', 'value' => $total > 0 ? round(($highCount / $total) * 100) : 0, 'color' => '#BA1A1A'],
            ['name' => 'Sedang', 'value' => $total > 0 ? round(($mediumCount / $total) * 100) : 0, 'color' => '#F9A825'],
            ['name' => 'Rendah', 'value' => $total > 0 ? round(($lowCount / $total) * 100) : 0, 'color' => '#38A169'],
        ];

        return response()->json([
            'data' => [
                'severity' => $severityData,
            ],
        ]);
    }

    public function getRecentFloodReports(Request $request): JsonResponse
    {
        $district = $request->query('district', 'Semua District');
        $status = $request->query('status', null);
        $perPage = $request->query('per_page', 10);

        $query = Report::selectRaw('*, ST_AsText(location) as location_text')
            ->whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->with(['category', 'user'])
            ->latest('created_at');

        if ($district && $district !== 'Semua District') {
            $query->where('address', 'like', "%{$district}%");
        }

        if ($status) {
            $query->where('status', $status);
        }

        $reports = $query->limit($perPage)->get()->map(function ($report) {
            $locationText = $report->address ?? $this->parseGeometryPoint($report->location_text);

            return [
                'id' => '#FLD-'.substr($report->id, -4),
                'location' => $locationText,
                'waterLevel' => (int) ($report->water_level_cm ?? 0),
                'severity' => $this->determineSeverity($report->water_level_cm ?? 0),
                'status' => $report->status ?? 'menunggu',
                'time' => $report->created_at->format('d M, H:i'),
                'reporter' => $report->user?->name ?? 'Unknown',
                'description' => substr($report->description ?? '', 0, 100),
                'photos' => $report->photos_count ?? 0,
                'assignedDepartment' => 'Dinas PU (Tata Air)',
                'aiPrediction' => 'Prediksi dari AI',
            ];
        });

        return response()->json([
            'data' => [
                'reports' => $reports,
                'total' => Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))->count(),
                'completed' => Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
                    ->where('status', 'selesai')
                    ->count(),
            ],
        ]);
    }

    private function determineSeverity(int $waterLevel): string
    {
        if ($waterLevel > 70) {
            return 'Tinggi';
        }
        if ($waterLevel > 30) {
            return 'Sedang';
        }

        return 'Rendah';
    }

    public function verifyReport(string $id): JsonResponse
    {
        try {
            $report = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
                ->findOrFail($id);

            if ($report->status !== 'menunggu') {
                return response()->json([
                    'success' => false,
                    'message' => 'Laporan tidak dalam status menunggu verifikasi',
                ], 400);
            }

            $report->update([
                'status' => 'terverifikasi',
                'verified_at' => Carbon::now(),
                'verified_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Laporan berhasil diverifikasi',
                'data' => [
                    'id' => $report->id,
                    'status' => $report->status,
                    'verified_at' => $report->verified_at?->format('d M, H:i'),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memverifikasi laporan: '.$e->getMessage(),
            ], 500);
        }
    }

    public function updateReportStatus(Request $request, string $id): JsonResponse
    {
        try {
            $request->validate([
                'status' => 'required|in:menunggu,terverifikasi,diproses,selesai',
            ]);

            $report = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
                ->findOrFail($id);

            $oldStatus = $report->status;
            $report->update(['status' => $request->status]);

            return response()->json([
                'success' => true,
                'message' => 'Status laporan berhasil diubah dari '.$oldStatus.' menjadi '.$request->status,
                'data' => [
                    'id' => $report->id,
                    'status' => $report->status,
                    'updated_at' => $report->updated_at?->format('d M, H:i'),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah status laporan: '.$e->getMessage(),
            ], 500);
        }
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

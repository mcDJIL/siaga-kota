<?php

namespace App\Http\Controllers\Government;

use App\Actions\UpdateReportStatus;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

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

        // Waktu respon dihitung dari created_at ke resolved_at. Memakai updated_at
        // tidak akurat karena kolom itu berubah pada setiap penyuntingan laporan.
        $avgResponseTime = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', ReportStatus::Selesai->value)
            ->whereNotNull('resolved_at')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/60) as avg_minutes')
            ->first()?->avg_minutes;

        $avgResponseTime = round($avgResponseTime ?? 0);

        $avgResponseTimeLastMonth = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->where('status', ReportStatus::Selesai->value)
            ->whereNotNull('resolved_at')
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/60) as avg_minutes')
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
        // Tabel reports belum punya kolom district_id, sehingga kecamatan
        // dicocokkan dari alamat laporan terhadap daftar kecamatan terdaftar.
        $districts = District::query()
            ->orderBy('name')
            ->pluck('name')
            ->map(fn (string $name) => [
                'district' => $name,
                'reports' => Report::query()
                    ->whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
                    ->where('address', 'ilike', "%{$name}%")
                    ->count(),
            ])
            ->sortByDesc('reports')
            ->take(7)
            ->values()
            ->all();

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
            ->with(['category', 'user', 'assignedOperator.department'])
            ->withCount('attachments')
            ->latest('created_at');

        if ($district && $district !== 'Semua District') {
            $query->where('address', 'ilike', "%{$district}%");
        }

        if ($status) {
            $query->where('status', $status);
        }

        $reports = $query->limit($perPage)->get()->map(function (Report $report) {
            $locationText = $report->address ?: $this->parseGeometryPoint($report->location_text ?? '');

            return [
                // Kode laporan human-friendly sesuai PLAN §5.2, bukan potongan ULID.
                'id' => $report->code,
                'location' => $locationText,
                'waterLevel' => (int) ($report->water_level_cm ?? 0),
                'severity' => $this->determineSeverity($report->water_level_cm ?? 0),
                'status' => $report->status->value,
                'time' => $report->created_at?->format('d M, H:i'),
                'reporter' => $report->user?->name ?? 'Tidak diketahui',
                'description' => Str::limit($report->description ?? '', 100),
                'photos' => $report->attachments_count,
                'assignedDepartment' => $report->assignedOperator?->department?->name ?? 'Belum ditugaskan',
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

    /**
     * Verifikasi laporan banjir: menunggu -> diverifikasi.
     *
     * @group Admin - Flood Reports
     *
     * @authenticated
     */
    public function verifyReport(Request $request, UpdateReportStatus $updateStatus, string $id): JsonResponse
    {
        $report = Report::query()
            ->whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->findOrFail($id);

        if ($report->status !== ReportStatus::Menunggu) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak dalam status menunggu verifikasi.',
            ], 422);
        }

        $report = $updateStatus->execute(
            $report,
            ReportStatus::Diverifikasi->value,
            $request->user(),
            'Laporan diverifikasi oleh admin.',
        );

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil diverifikasi.',
            'data' => [
                'id' => $report->id,
                'status' => $report->status->value,
                'verified_at' => $report->accepted_at?->format('d M, H:i'),
            ],
        ]);
    }

    /**
     * Ubah status laporan banjir beserta catatan penanganannya.
     *
     * @group Admin - Flood Reports
     *
     * @authenticated
     */
    public function updateReportStatus(
        Request $request,
        UpdateReportStatus $updateStatus,
        string $id
    ): JsonResponse {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(ReportStatus::class)],
            'note' => ['nullable', 'string', 'max:1000'],
        ], [
            'status.required' => 'Status wajib dipilih.',
        ]);

        $report = Report::query()
            ->whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->findOrFail($id);

        $oldStatus = $report->status->value;

        $report = $updateStatus->execute(
            $report,
            $validated['status'],
            $request->user(),
            $validated['note'] ?? null,
        );

        return response()->json([
            'success' => true,
            'message' => "Status laporan berhasil diubah dari {$oldStatus} menjadi {$report->status->value}.",
            'data' => [
                'id' => $report->id,
                'status' => $report->status->value,
                'updated_at' => $report->updated_at?->format('d M, H:i'),
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

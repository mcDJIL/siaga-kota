<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Models\Announcement;
use App\Models\Department;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function getDashboardStats(): JsonResponse
    {
        $totalReports = Report::count();
        $wasteReports = Report::whereHas('category', fn ($q) => $q->where('slug', 'sampah'))->count();
        $floodReports = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))->count();

        $completedReports = Report::where('status', 'selesai')->count();

        $completionRate = $totalReports > 0 ? round(($completedReports / $totalReports) * 100) : 0;

        // Calculate trend percentages
        $lastMonthTotal = Report::whereMonth('created_at', Carbon::now()->subMonth()->month)
            ->whereYear('created_at', Carbon::now()->subMonth()->year)
            ->count();
        $totalTrend = $lastMonthTotal > 0 ? round((($totalReports - $lastMonthTotal) / $lastMonthTotal) * 100) : 0;

        $lastMonthFlood = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
            ->whereMonth('created_at', Carbon::now()->subMonth()->month)
            ->whereYear('created_at', Carbon::now()->subMonth()->year)
            ->count();
        $floodTrend = $lastMonthFlood > 0 ? round((($floodReports - $lastMonthFlood) / $lastMonthFlood) * 100) : 0;

        return response()->json([
            'data' => [
                'stats' => [
                    [
                        'id' => 'total-laporan',
                        'label' => 'Total Laporan',
                        'value' => $totalReports,
                        'icon' => 'FileText',
                        'iconBg' => 'bg-bg-blue-lighter',
                        'iconColor' => 'text-navy',
                        'trend' => [
                            'direction' => $totalTrend >= 0 ? 'up' : 'down',
                            'color' => 'success',
                            'text' => ($totalTrend >= 0 ? '+' : '').$totalTrend.'% dari bulan lalu',
                        ],
                    ],
                    [
                        'id' => 'laporan-sampah',
                        'label' => 'Laporan Sampah',
                        'value' => $wasteReports,
                        'icon' => 'Trash2',
                        'iconBg' => 'bg-brand-green-light',
                        'iconColor' => 'text-brand-green-dark',
                        'description' => $totalReports > 0 ? round(($wasteReports / $totalReports) * 100).'% dari total laporan' : '0% dari total laporan',
                    ],
                    [
                        'id' => 'laporan-banjir',
                        'label' => 'Laporan Banjir',
                        'value' => $floodReports,
                        'icon' => 'Waves',
                        'iconBg' => 'bg-navy-light',
                        'iconColor' => 'text-navy-lighter',
                        'trend' => [
                            'direction' => $floodTrend >= 0 ? 'up' : 'down',
                            'color' => 'danger',
                            'text' => ($floodTrend >= 0 ? '+' : '').$floodTrend.'% dari bulan lalu',
                        ],
                    ],
                ],
                'completion' => [
                    'label' => 'Tingkat Penyelesaian',
                    'value' => $completionRate,
                    'description' => $completedReports.' dari '.$totalReports.' laporan terselesaikan',
                ],
            ],
        ]);
    }

    public function getMonthlyTrend(): JsonResponse
    {
        $year = request()->query('year', Carbon::now()->year);

        $monthlyData = [];
        for ($month = 1; $month <= 12; $month++) {
            $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
            $endDate = Carbon::createFromDate($year, $month, 1)->endOfMonth();

            $wasteCount = Report::whereHas('category', fn ($q) => $q->where('slug', 'sampah'))
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count();

            $floodCount = Report::whereHas('category', fn ($q) => $q->where('slug', 'banjir'))
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count();

            $monthlyData[] = [
                'month' => Carbon::createFromDate($year, $month, 1)->format('M'),
                'waste' => $wasteCount,
                'flood' => $floodCount,
            ];
        }

        return response()->json([
            'data' => [
                'trend' => $monthlyData,
                'year' => $year,
            ],
        ]);
    }

    public function getReportDetail(string $id): JsonResponse
    {
        $report = Report::query()
            ->withLocationText()
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])
            ->findOrFail($id);

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }

    public function getRecentReports(): JsonResponse
    {
        $reports = Report::selectRaw('*, ST_AsText(location) as location_text')
            ->with(['category', 'assignedOperator.department', 'user'])
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(function ($report) {
                return [
                    'id' => '#RPT-'.substr($report->id, -4),
                    'ulid' => $report->id,
                    'type' => $report->category?->slug ?? 'unknown',
                    'typeLabel' => $report->category?->name ?? 'Unknown',
                    'location' => $report->address ?? $this->parseGeometryPoint($report->location_text),
                    'status' => $report->status ?? 'menunggu',
                    'time' => $report->created_at->diffForHumans(),
                    'reporter' => $report->user?->name ?? 'Unknown',
                    'category' => $report->category?->name ?? 'Unknown',
                    'description' => substr($report->description ?? '', 0, 100),
                    'assignedDepartment' => $report->assignedOperator?->department?->name ?? 'Not assigned',
                    'photos' => $report->photos_count ?? 0,
                ];
            });

        return response()->json([
            'data' => [
                'reports' => $reports,
            ],
        ]);
    }

    public function getDepartmentPerformance(): JsonResponse
    {
        $departments = Department::with(['assignedReports'])
            ->get()
            ->map(function ($dept) {
                $totalAssigned = $dept->assignedReports()->count();
                $completed = $dept->assignedReports()
                    ->where('status', 'selesai')
                    ->count();

                return [
                    'id' => $dept->id,
                    'name' => $dept->name,
                    'value' => $totalAssigned > 0 ? round(($completed / $totalAssigned) * 100) : 0,
                    'description' => $completed.'/'.$totalAssigned.' laporan selesai',
                ];
            })
            ->sortByDesc('value')
            ->filter(fn ($dept) => $dept['value'] > 0)
            ->take(5)
            ->values();

        return response()->json([
            'data' => [
                'departments' => $departments,
            ],
        ]);
    }

    public function getAnnouncements(): JsonResponse
    {
        $announcements = Announcement::query()
            ->published()
            ->with('creator:id,name')
            ->latest('published_at')
            ->limit(5)
            ->get()
            ->map(fn (Announcement $announcement) => [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'description' => Str::limit($announcement->body, 80),
                'fullContent' => $announcement->body,
                'author' => $announcement->creator?->name ?? 'Administrator',
                'publishDate' => $announcement->published_at?->diffForHumans(),
                'type' => $announcement->type->value,
                'typeLabel' => $announcement->type->label(),
                'audience' => $announcement->audience->value,
            ])
            ->all();

        return response()->json([
            'data' => [
                'announcements' => $announcements,
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

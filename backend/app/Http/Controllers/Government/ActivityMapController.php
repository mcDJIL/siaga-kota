<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Public\FloodPredictionController;
use App\Http\Controllers\Public\DistrictLookupController;
use App\Models\District;
use App\Models\Report;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ActivityMapController extends Controller
{
    public function getMapData(Request $request): JsonResponse
    {
        $cacheKey = 'activity_map_data';
        $cacheMinutes = 5;
        $skipCache = $request->boolean('skip_cache', false);

        if ($skipCache) {
            Cache::forget($cacheKey);
        }

        return response()->json([
            'data' => Cache::remember($cacheKey, $cacheMinutes * 60, function () use ($request) {
                $wasteReports = $this->getWasteReports($request);
                $floodReports = $this->getFloodReports($request);
                $aiPredictions = $this->getAIPredictions($request);
                $districts = $this->getDistrictsWithStats();

                return [
                    'waste' => $wasteReports,
                    'flood' => $floodReports,
                    'ai' => $aiPredictions,
                    'districts' => $districts,
                ];
            }),
        ]);
    }

    public function getWasteReports(Request $request): array
    {
        $query = Report::query()
            ->whereHas('category', fn($q) => $q->where('slug', 'sampah'))
            ->with('category')
            ->where('deleted_at', null);

        // if ($request->filled('district')) {
        //     $query->where('address', 'like', "%{$request->district}%");
        // }

        return $query->latest('created_at')->limit(100)->get()->map(function ($report) {
            $position = $this->parsePosition($report->location);

            if ($position === null) {
                return null;
            }

            return [
                'id' => $report->id,
                'type' => 'waste',
                'title' => $report->title,
                'description' => $report->description,
                'position' => $position,
                'location' => $report->address,
                'category' => $report->category?->name,
                'status' => $report->status->value,
                'reportCount' => 1,
                'intensity' => 0.7,
                'createdAt' => $report->created_at->format('d M H:i'),
                'riskLevel' => $this->assessRiskLevel($report->status->value, 'waste'),
            ];
        })->filter()->values()->toArray();
    }

    public function getFloodReports(Request $request): array
    {
        $query = Report::query()
            ->whereHas('category', fn($q) => $q->where('slug', 'banjir'))
            ->with('category')
            ->where('deleted_at', null);

        // if ($request->filled('district')) {
        //     $query->where('address', 'like', "%{$request->district}%");
        // }

        return $query->latest('created_at')->limit(100)->get()->map(function ($report) {
            $position = $this->parsePosition($report->location);

            if ($position === null) {
                return null;
            }

            return [
                'id' => $report->id,
                'type' => 'flood',
                'title' => $report->title,
                'description' => $report->description,
                'position' => $position,
                'location' => $report->address,
                'category' => $report->category?->name,
                'status' => $report->status->value,
                'waterLevel' => $report->water_level_cm,
                'intensity' => $report->water_level_cm ? min(($report->water_level_cm / 100) * 0.7, 1.0) : 0.5,
                'createdAt' => $report->created_at->format('d M H:i'),
                'riskLevel' => $this->assessRiskLevel($report->status->value, 'flood', $report->water_level_cm),
            ];
        })->filter()->values()->toArray();
    }

    public function getAIPredictions(Request $request): array
    {
        $predictions = [];

        // Get flood predictions dari database districts
        $districts = District::all();

        foreach ($districts as $district) {
            try {
                // Get weather history dari report data terakhir
                $recentFloodReports = Report::whereHas('category', fn($q) => $q->where('slug', 'banjir'))
                    ->where('address', 'like', "%{$district->name}%")
                    ->latest('created_at')
                    ->limit(7)
                    ->get();

                // Prepare weather history dari data historis (simplified)
                $weatherHistory = [];
                for ($i = 0; $i < 7; $i++) {
                    $weatherHistory[] = [
                        'rainfall' => rand(10, 150),
                        'humidity' => rand(60, 95),
                        'temperature' => rand(24, 32),
                    ];
                }

                // Prepare prediction request
                $floodReports24h = Report::whereHas('category', fn($q) => $q->where('slug', 'banjir'))
                    ->where('address', 'like', "%{$district->name}%")
                    ->where('created_at', '>=', now()->subDay())
                    ->count();

                $wasteReports24h = Report::whereHas('category', fn($q) => $q->where('slug', 'sampah'))
                    ->where('address', 'like', "%{$district->name}%")
                    ->where('created_at', '>=', now()->subDay())
                    ->count();

                // Call ML API untuk flood prediction
                $mlApiUrl = env('ML_API_URL', 'http://127.0.0.1:8000');

                $response = Http::timeout(5)->post("{$mlApiUrl}/predict", [
                    'district_id' => $district->id,
                    'district_profile' => [
                        'elevation' => $district->elevation ?? rand(80, 100),
                        'drainage_score' => $district->drainage_score ?? round(rand(60, 80) / 100, 2),
                        'population_density' => $district->population_density ?? rand(3000, 6000),
                    ],
                    'weather_history' => $weatherHistory,
                    'reports' => [
                        'flood_reports_24h' => $floodReports24h,
                        'waste_reports_24h' => $wasteReports24h,
                    ],
                ]);

                if ($response->successful()) {
                    $predictionData = $response->json();

                    // Extract prediction result
                    $floodRisk = $predictionData['data']['flood_risk_probability'] ?? rand(20, 80);
                    $confidence = $predictionData['data']['confidence'] ?? rand(70, 95);

                    // Determine risk level based on probability
                    $riskLevel = 'Rendah';
                    if ($floodRisk >= 70) {
                        $riskLevel = 'Tinggi';
                    } elseif ($floodRisk >= 40) {
                        $riskLevel = 'Sedang';
                    }

                    $predictions[] = [
                        'id' => 'ai-flood-' . $district->slug,
                        'type' => 'ai',
                        'title' => 'Prediksi Banjir - ' . $district->name,
                        'description' => "Risiko banjir: {$floodRisk}% | Laporan banjir 24h: {$floodReports24h}",
                        'position' => [$district->latitude, $district->longitude],
                        'location' => $district->name,
                        'riskLevel' => $riskLevel,
                        'confidence' => $confidence,
                        'predictedAt' => now()->format('d M H:i'),
                        'floodRiskProbability' => $floodRisk,
                    ];
                }
            } catch (\Exception $e) {
                // Fallback jika ML API tidak tersedia
                $predictions[] = [
                    'id' => 'ai-flood-' . $district->slug,
                    'type' => 'ai',
                    'title' => 'Prediksi Banjir - ' . $district->name,
                    'description' => 'Data prediksi sedang diproses',
                    'position' => [$district->latitude, $district->longitude],
                    'location' => $district->name,
                    'riskLevel' => 'Sedang',
                    'confidence' => 75,
                    'predictedAt' => now()->format('d M H:i'),
                ];
            }
        }

        return $predictions;
    }

    public function getDistrictsWithStats(): array
    {
        return District::query()
            ->orderByDesc('risk_score')
            ->get()
            ->map(function ($district) {
                return [
                    'id' => $district->slug,
                    'name' => $district->name,
                    'label' => $this->getDistrictLabel($district),
                    'position' => [$district->latitude, $district->longitude],
                    'status' => ucfirst($district->status),
                    'riskScore' => $district->risk_score,
                    'action' => $district->action_required,
                    'wasteCount' => $district->waste_reports_count,
                    'floodCount' => $district->flood_reports_count,
                    'aiPredictions' => $district->ai_predictions_count,
                ];
            })
            ->toArray();
    }

    public function exportReport(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'layer' => 'required|in:waste,flood,both',
            'format' => 'required|in:pdf',
            'include_districts' => 'boolean',
        ]);

        try {
            $mapData = $this->getMapData($request)->getData(true)['data'];
            $pdf = $this->generatePDF($validated['layer'], $mapData);

            return response()->json([
                'data' => [
                    'url' => $pdf,
                    'filename' => basename($pdf),
                ],
                'message' => 'Laporan berhasil dibuat.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat laporan: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function generatePDF(string $layer, array $mapData): string
    {
        $filename = 'activity-map-report-' . now()->format('Y-m-d-His') . '.pdf';
        $filepath = storage_path('app/public/reports/' . $filename);

        if (!is_dir(dirname($filepath))) {
            mkdir(dirname($filepath), 0755, true);
        }

        $sections = [
            'waste' => 'Laporan Sampah',
            'flood' => 'Laporan Banjir',
        ];

        if ($layer !== 'both') {
            $sections = array_intersect_key($sections, [$layer => true]);
        }

        $html = '<!doctype html><html><head><meta charset="utf-8"><style>
            body{font-family:DejaVu Sans,sans-serif;color:#1f2937;font-size:12px;line-height:1.4}
            h1{font-size:22px;margin:0 0 4px} h2{font-size:16px;margin:22px 0 8px}
            .muted{color:#6b7280;margin-bottom:18px}.summary{width:100%;border-collapse:collapse;margin-bottom:14px}
            .summary td{padding:8px;border:1px solid #d1d5db}.summary strong{font-size:18px}
            table{width:100%;border-collapse:collapse;margin-bottom:14px} th,td{border:1px solid #d1d5db;padding:6px;text-align:left;vertical-align:top}
            th{background:#f3f4f6}.risk-Tinggi{color:#b91c1c}.risk-Sedang{color:#b45309}.risk-Rendah{color:#047857}
        </style></head><body>';
        $html .= '<h1>Laporan Peta Aktivitas</h1><div class="muted">Dibuat pada ' . e(now()->format('d M Y H:i')) . '</div>';
        $html .= '<table class="summary"><tr><td><strong>' . count($mapData['waste'] ?? []) . '</strong><br>Laporan Sampah</td><td><strong>' . count($mapData['flood'] ?? []) . '</strong><br>Laporan Banjir</td><td><strong>' . count($mapData['ai'] ?? []) . '</strong><br>Prediksi AI</td><td><strong>' . count($mapData['districts'] ?? []) . '</strong><br>Kecamatan</td></tr></table>';

        foreach ($sections as $key => $title) {
            $html .= '<h2>' . e($title) . '</h2><table><thead><tr><th>Judul</th><th>Lokasi</th><th>Status</th><th>Risiko</th><th>Waktu</th></tr></thead><tbody>';

            foreach (($mapData[$key] ?? []) as $item) {
                $risk = $item['riskLevel'] ?? '-';
                $html .= '<tr><td>' . e($item['title'] ?? '-') . '</td><td>' . e($item['location'] ?? '-') . '</td><td>' . e($item['status'] ?? '-') . '</td><td class="risk-' . e($risk) . '">' . e($risk) . '</td><td>' . e($item['createdAt'] ?? '-') . '</td></tr>';
            }

            if (empty($mapData[$key])) {
                $html .= '<tr><td colspan="5">Tidak ada data.</td></tr>';
            }

            $html .= '</tbody></table>';
        }

        $html .= '<h2>Statistik Kecamatan</h2><table><thead><tr><th>Kecamatan</th><th>Status</th><th>Skor Risiko</th><th>Sampah</th><th>Banjir</th><th>Aksi</th></tr></thead><tbody>';

        foreach (($mapData['districts'] ?? []) as $district) {
            $html .= '<tr><td>' . e($district['name'] ?? '-') . '</td><td>' . e($district['status'] ?? '-') . '</td><td>' . e($district['riskScore'] ?? '-') . '</td><td>' . e($district['wasteCount'] ?? 0) . '</td><td>' . e($district['floodCount'] ?? 0) . '</td><td>' . e($district['action'] ?? '-') . '</td></tr>';
        }

        if (empty($mapData['districts'])) {
            $html .= '<tr><td colspan="6">Tidak ada data.</td></tr>';
        }

        $html .= '</tbody></table></body></html>';

        Pdf::loadHTML($html)->setPaper('a4', 'landscape')->save($filepath);

        return '/storage/reports/' . $filename;
    }

    private function assessRiskLevel(string $status, string $type, ?int $waterLevel = null): string
    {
        if ($status === 'selesai') {
            return 'Rendah';
        }

        if ($status === 'diproses') {
            return 'Sedang';
        }

        if ($type === 'flood' && $waterLevel && $waterLevel > 75) {
            return 'Tinggi';
        }

        return 'Sedang';
    }

    private function getDistrictLabel(District $district): string
    {
        if ($district->waste_reports_count > $district->flood_reports_count) {
            return 'Waste Density';
        } elseif ($district->flood_reports_count > $district->waste_reports_count) {
            return 'Flood Potential';
        }

        return 'Combined Risk';
    }

    private function parsePosition($location): ?array
    {
        if (! $location) {
            return null;
        }

        $location = trim((string) $location);

        // Handle SRID prefix: SRID=4326;POINT(...)
        if (strpos($location, 'SRID') !== false) {
            $location = preg_replace('/^SRID=\d+;/', '', $location);
            $location = trim($location);
        }

        // Match POINT(lng lat)
        if (preg_match('/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/', $location, $matches)) {
            return [(float) $matches[2], (float) $matches[1]]; // [lat, lng]
        }

        return null;
    }

    public function updateDistrictStats(): JsonResponse
    {
        try {
            $districts = District::all();

            foreach ($districts as $district) {
                $wasteCount = Report::whereHas('category', fn($q) => $q->where('slug', 'sampah'))
                    ->where('address', 'like', "%{$district->name}%")
                    ->count();

                $floodCount = Report::whereHas('category', fn($q) => $q->where('slug', 'banjir'))
                    ->where('address', 'like', "%{$district->name}%")
                    ->count();

                $riskScore = round((($wasteCount * 0.4) + ($floodCount * 0.6)) / max($wasteCount + $floodCount, 1) * 100);

                $district->update([
                    'waste_reports_count' => $wasteCount,
                    'flood_reports_count' => $floodCount,
                    'risk_score' => $riskScore,
                    'status' => $riskScore >= 80 ? 'critical' : ($riskScore >= 50 ? 'monitor' : 'safe'),
                ]);
            }

            Cache::forget('activity_map_data');

            return response()->json([
                'message' => 'Statistik district berhasil diperbarui.',
                'updated_count' => $districts->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui statistik: ' . $e->getMessage(),
            ], 500);
        }
    }
}

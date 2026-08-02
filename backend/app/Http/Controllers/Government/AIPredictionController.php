<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class AIPredictionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'district_id' => 'nullable|string',
        ]);

        $districts = District::query()
            ->when($validated['district_id'] ?? null, fn ($query, $districtId) => $query->where('slug', $districtId))
            ->orderBy('name')
            ->get();

        if ($districts->isEmpty()) {
            return response()->json(['message' => 'Kecamatan tidak ditemukan.'], 404);
        }

        $predictions = $districts->map(fn (District $district) => $this->predictDistrict($district))->values();
        $averageRisk = round($predictions->avg('riskScore') ?? 0);
        $areaAtRisk = $predictions->whereIn('riskLevel', ['high', 'medium'])->count();

        return response()->json([
            'data' => [
                'predictions' => $predictions,
                'statistics' => [
                    'areaAtRisk' => [
                        'value' => $areaAtRisk,
                        'trend' => ['direction' => 'up', 'text' => '+'.$predictions->where('riskLevel', 'high')->count()],
                    ],
                    'averageRisk' => [
                        'value' => $averageRisk,
                        'label' => $this->riskLabel($averageRisk),
                    ],
                ],
                'period' => '7 Hari Terakhir',
                'source' => [
                    'weather' => 'Open-Meteo',
                    'reports' => 'Database laporan 24 jam',
                    'model' => env('ML_API_URL', 'http://127.0.0.1:8000'),
                ],
            ],
            'message' => 'Prediksi banjir berhasil dimuat.',
        ]);
    }

    private function predictDistrict(District $district): array
    {
        $weatherHistory = $this->weatherHistory($district);
        $reports = $this->reportCounts($district);
        $features = $this->buildFeatures($district, $weatherHistory, $reports);

        $mlPayload = [
            'district_id' => $district->slug,
            'district_profile' => [
                'elevation' => (float) $district->elevation,
                'river_distance' => (float) $district->river_distance,
                'population_density' => (float) $district->population_density,
                'drainage_score' => (float) $district->drainage_score,
            ],
            'weather_history' => $weatherHistory,
            'reports' => $reports,
        ];

        $prediction = $this->callModel($mlPayload, $features);
        $riskScore = (float) ($prediction['risk_score'] ?? $this->fallbackRiskScore($features));
        $riskLevel = $this->normalizeRiskLevel($prediction['risk_level'] ?? $this->riskLabel($riskScore));
        $recommendations = $prediction['recommendations'] ?? [$this->recommendationFor($riskLevel)];

        return [
            'id' => $district->slug,
            'districtId' => $district->slug,
            'district' => 'Kecamatan '.$district->name,
            'riskLevel' => $riskLevel,
            'riskScore' => round($riskScore, 2),
            'confidence' => round((float) ($prediction['confidence'] ?? min(0.95, max(0.55, $riskScore / 100))), 2),
            'priorityScore' => round((float) ($prediction['priority_score'] ?? $riskScore), 2),
            'recommendations' => $recommendations,
            'recommendedAction' => $recommendations[0] ?? $this->recommendationFor($riskLevel),
            'expectedRainfall' => round($features['rainfall_last_7_days']).' mm',
            'floodHeight' => $this->floodHeight($riskScore),
            'affectedPopulation' => round(((float) $district->population_density) * ($riskScore / 100)),
            'center' => [(float) $district->latitude, (float) $district->longitude],
            'lastUpdated' => now()->diffForHumans(),
            'features' => $features,
            'explanation' => $prediction['explanation'] ?? null,
        ];
    }

    private function weatherHistory(District $district): array
    {
        return Cache::remember("weather-history:{$district->slug}", now()->addMinutes(30), function () use ($district) {
            $response = Http::timeout(15)->get('https://api.open-meteo.com/v1/forecast', [
                'latitude' => $district->latitude,
                'longitude' => $district->longitude,
                'past_days' => 7,
                'forecast_days' => 1,
                'daily' => 'precipitation_sum',
                'hourly' => 'temperature_2m,relative_humidity_2m',
                'timezone' => 'Asia/Jakarta',
            ]);

            if (! $response->successful()) {
                return $this->fallbackWeatherHistory();
            }

            $payload = $response->json();
            $dates = array_slice($payload['daily']['time'] ?? [], -7);
            $rainfall = array_slice($payload['daily']['precipitation_sum'] ?? [], -7);
            $hourlyTimes = $payload['hourly']['time'] ?? [];
            $hourlyTemps = $payload['hourly']['temperature_2m'] ?? [];
            $hourlyHumidity = $payload['hourly']['relative_humidity_2m'] ?? [];

            return collect($dates)->map(function ($date, $index) use ($rainfall, $hourlyTimes, $hourlyTemps, $hourlyHumidity) {
                $hourIndexes = collect($hourlyTimes)
                    ->keys()
                    ->filter(fn ($key) => str_starts_with($hourlyTimes[$key], $date))
                    ->values();

                $temps = $hourIndexes->map(fn ($key) => $hourlyTemps[$key] ?? null)->filter();
                $humidity = $hourIndexes->map(fn ($key) => $hourlyHumidity[$key] ?? null)->filter();

                return [
                    'date' => $date,
                    'rainfall' => (float) ($rainfall[$index] ?? 0),
                    'humidity' => round((float) ($humidity->avg() ?? 80), 2),
                    'temperature' => round((float) ($temps->avg() ?? 27), 2),
                ];
            })->values()->toArray();
        });
    }

    private function reportCounts(District $district): array
    {
        $since = now()->subDay();

        return [
            'flood_reports_24h' => Report::query()
                ->whereHas('category', fn ($query) => $query->where('slug', 'banjir'))
                ->where('address', 'like', "%{$district->name}%")
                ->where('created_at', '>=', $since)
                ->count(),
            'waste_reports_24h' => Report::query()
                ->whereHas('category', fn ($query) => $query->where('slug', 'sampah'))
                ->where('address', 'like', "%{$district->name}%")
                ->where('created_at', '>=', $since)
                ->count(),
        ];
    }

    private function buildFeatures(District $district, array $weatherHistory, array $reports): array
    {
        $rainfall = collect($weatherHistory)->pluck('rainfall')->map(fn ($value) => (float) $value)->values();
        $humidity = collect($weatherHistory)->pluck('humidity')->map(fn ($value) => (float) $value)->filter();
        $temperature = collect($weatherHistory)->pluck('temperature')->map(fn ($value) => (float) $value)->filter();

        return [
            'rainfall_today' => round((float) ($rainfall->last() ?? 0), 2),
            'rainfall_last_3_days' => round((float) $rainfall->slice(-3)->sum(), 2),
            'rainfall_last_7_days' => round((float) $rainfall->slice(-7)->sum(), 2),
            'humidity' => round((float) ($humidity->avg() ?? 80), 2),
            'temperature' => round((float) ($temperature->avg() ?? 27), 2),
            'elevation' => (float) $district->elevation,
            'river_distance' => (float) $district->river_distance,
            'population_density' => (float) $district->population_density,
            'drainage_score' => (float) $district->drainage_score,
            'flood_reports_24h' => $reports['flood_reports_24h'],
            'waste_reports_24h' => $reports['waste_reports_24h'],
        ];
    }

    private function callModel(array $payload, array $features): array
    {
        $baseUrl = rtrim(env('ML_API_URL', 'http://127.0.0.1:8000'), '/');

        try {
            $response = Http::timeout(30)->post("{$baseUrl}/predict", $payload);

            if ($response->successful()) {
                return $response->json();
            }
        } catch (\Throwable) {
            //
        }

        return [
            'risk_score' => $this->fallbackRiskScore($features),
            'risk_level' => $this->riskLabel($this->fallbackRiskScore($features)),
            'confidence' => 0.62,
            'recommendations' => [$this->recommendationFor($this->normalizeRiskLevel($this->riskLabel($this->fallbackRiskScore($features))))],
            'priority_score' => $this->fallbackRiskScore($features),
        ];
    }

    private function fallbackRiskScore(array $features): float
    {
        $rain = min(45, $features['rainfall_last_7_days'] / 8);
        $drainage = (1 - min(1, $features['drainage_score'])) * 25;
        $reports = min(20, ($features['flood_reports_24h'] * 2) + ($features['waste_reports_24h'] * 0.75));
        $river = max(0, (700 - $features['river_distance']) / 700) * 10;

        return round(min(100, max(0, $rain + $drainage + $reports + $river)), 2);
    }

    private function fallbackWeatherHistory(): array
    {
        return collect(range(6, 0))->map(fn ($daysAgo) => [
            'date' => now()->subDays($daysAgo)->toDateString(),
            'rainfall' => 0,
            'humidity' => 80,
            'temperature' => 27,
        ])->values()->toArray();
    }

    private function riskLabel(float $score): string
    {
        return $score >= 70 ? 'high' : ($score >= 40 ? 'medium' : 'low');
    }

    private function normalizeRiskLevel(string $riskLevel): string
    {
        return match (strtolower($riskLevel)) {
            'tinggi', 'high' => 'high',
            'sedang', 'medium' => 'medium',
            default => 'low',
        };
    }

    private function recommendationFor(string $riskLevel): string
    {
        return match ($riskLevel) {
            'high' => 'Siapkan pompa mobile, bersihkan drainase utama, dan aktifkan pemantauan lapangan.',
            'medium' => 'Lakukan inspeksi drainase, pembersihan titik sampah, dan siagakan petugas.',
            default => 'Lakukan pemantauan rutin dan edukasi warga di titik rawan.',
        };
    }

    private function floodHeight(float $riskScore): string
    {
        return $riskScore >= 70 ? '40-60 cm' : ($riskScore >= 40 ? '15-30 cm' : '<10 cm');
    }
}

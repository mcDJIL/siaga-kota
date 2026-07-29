<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FloodPredictionController extends Controller
{
    public function predict(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'district_id' => 'required|string',
            'district_profile' => 'nullable|array',
            'district_profile.elevation' => 'nullable|numeric',
            'district_profile.drainage_score' => 'nullable|numeric',
            'district_profile.population_density' => 'nullable|numeric',
            'weather_history' => 'required|array',
            'weather_history.*.rainfall' => 'nullable|numeric',
            'weather_history.*.humidity' => 'nullable|numeric',
            'weather_history.*.temperature' => 'nullable|numeric',
            'reports' => 'nullable|array',
            'reports.flood_reports_24h' => 'nullable|integer',
            'reports.waste_reports_24h' => 'nullable|integer',
        ]);

        $districtProfile = $validated['district_profile'] ?? [];
        $districtLookup = collect([
            ['id' => 'patrang', 'name' => 'PATRANG', 'elevation' => 84, 'drainage_score' => 0.72, 'population_density' => 4200],
            ['id' => 'sumbersari', 'name' => 'SUMBERSARI', 'elevation' => 92, 'drainage_score' => 0.68, 'population_density' => 5100],
            ['id' => 'jember', 'name' => 'JEMBER', 'elevation' => 88, 'drainage_score' => 0.70, 'population_density' => 4700],
            ['id' => 'ambulu', 'name' => 'AMBULU', 'elevation' => 95, 'drainage_score' => 0.65, 'population_density' => 3900],
        ])->first(fn ($district) => $district['id'] === $validated['district_id']);

        if ($districtLookup) {
            $districtProfile['elevation'] = $districtProfile['elevation'] ?? $districtLookup['elevation'];
            $districtProfile['drainage_score'] = $districtProfile['drainage_score'] ?? $districtLookup['drainage_score'];
            $districtProfile['population_density'] = $districtProfile['population_density'] ?? $districtLookup['population_density'];
        }

        $payloadToMl = [
            'district_id' => $validated['district_id'],
            'district_profile' => $districtProfile,
            'weather_history' => $validated['weather_history'],
            'reports' => $validated['reports'] ?? [],
        ];

        $baseUrl = env('ML_API_URL', 'http://127.0.0.1:8000');

        $response = Http::timeout(30)->post("{$baseUrl}/predict", $payloadToMl);

        if (! $response->successful()) {
            return response()->json([
                'message' => 'Gagal memanggil service ML.',
                'details' => $response->json(),
            ], 502);
        }

        return response()->json([
            'data' => $response->json(),
            'message' => 'Prediksi banjir berhasil dihasilkan.',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DistrictLookupController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $districtId = $request->query('district_id');
        if ($districtId) {
            $district = District::query()->where('slug', $districtId)->first();
            if ($district) {
                return response()->json(['data' => $this->formatDistrict($district)]);
            }

            return response()->json(['message' => 'District not found'], 404);
        }

        return response()->json([
            'data' => District::query()
                ->orderBy('name')
                ->get()
                ->map(fn(District $district) => $this->formatDistrict($district)),
        ]);
    }

    private function formatDistrict(District $district): array
    {
        return [
            'id' => $district->slug,
            'name' => strtoupper($district->name),
            'latitude' => (float) $district->latitude,
            'longitude' => (float) $district->longitude,
            'elevation' => (float) $district->elevation,
            'river_distance' => (float) $district->river_distance,
            'drainage_score' => (float) $district->drainage_score,
            'population_density' => (float) $district->population_density,
        ];
    }
}

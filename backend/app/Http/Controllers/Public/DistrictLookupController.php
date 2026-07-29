<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DistrictLookupController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $districts = [
            [
                'id' => 'patrang',
                'name' => 'PATRANG',
                'elevation' => 84,
                'drainage_score' => 0.72,
                'population_density' => 4200,
            ],
            [
                'id' => 'sumbersari',
                'name' => 'SUMBERSARI',
                'elevation' => 92,
                'drainage_score' => 0.68,
                'population_density' => 5100,
            ],
            [
                'id' => 'jember',
                'name' => 'JEMBER',
                'elevation' => 88,
                'drainage_score' => 0.70,
                'population_density' => 4700,
            ],
            [
                'id' => 'ambulu',
                'name' => 'AMBULU',
                'elevation' => 95,
                'drainage_score' => 0.65,
                'population_density' => 3900,
            ],
        ];

        $districtId = $request->query('district_id');
        if ($districtId) {
            $match = collect($districts)->first(fn ($district) => $district['id'] === $districtId);
            if ($match) {
                return response()->json(['data' => $match]);
            }

            return response()->json(['message' => 'District not found'], 404);
        }

        return response()->json(['data' => $districts]);
    }
}

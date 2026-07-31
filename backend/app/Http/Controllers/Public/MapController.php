<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapPointResource;
use App\Http\Resources\MapRouteResource;
use App\Http\Resources\MapZoneResource;
use App\Models\EvacuationRoute;
use App\Models\FloodZone;
use App\Models\Report;
use App\Models\Tps;
use App\Models\WasteBank;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MapController extends Controller
{
    /**
     * @group Public - Map
     * @authenticated
     */
    public function points(Request $request): JsonResponse
    {
        $layers = $request->input('layer', []);
        if (! is_array($layers)) {
            $layers = [$layers];
        }

        $features = collect();

        // Waste Banks
        if (empty($layers) || in_array('waste_banks', $layers)) {
            $wasteBanks = WasteBank::query()
                ->where('active', true)
                ->get();
            $features = $features->merge($wasteBanks);
        }

        // TPS
        if (empty($layers) || in_array('tps', $layers)) {
            $tps = Tps::query()
                ->where('active', true)
                ->get();
            $features = $features->merge($tps);
        }

        // Reports (laporan warga)
        if (empty($layers) || in_array('reports', $layers)) {
            $reports = Report::query()
                ->with('category')
                ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
                ->when($request->filled('category'), fn($q) => $q->where('category_id', $request->category))
                ->when($request->filled('since'), function ($q) use ($request) {
                    $hours = (int) str_replace('h', '', $request->since);
                    $q->where('created_at', '>=', now()->subHours($hours));
                })
                ->get();
            $features = $features->merge($reports);
        }

        // Evacuation Routes
        $routes = collect();
        if (empty($layers) || in_array('evacuation_routes', $layers)) {
            $routes = EvacuationRoute::query()
                ->where('active', true)
                ->get();
        }

        // Flood Zones
        $zones = collect();
        if (empty($layers) || in_array('flood_zones', $layers)) {
            $zones = FloodZone::query()
                ->where('active', true)
                ->get();
        }

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => array_merge(
                MapPointResource::collection($features)->resolve(),
                MapRouteResource::collection($routes)->resolve(),
                MapZoneResource::collection($zones)->resolve(),
            ),
        ]);
    }

    /**
     * @group Public - Map
     * @authenticated
     */
    public function heatmap(Request $request): JsonResponse
    {
        // Ambil laporan dalam 30 hari terakhir untuk heatmap
        $reports = Report::query()
            ->selectRaw('ST_AsText(location) as location_wkt, COUNT(*) as intensity')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('location')
            ->get();

        $heatmapData = $reports->map(function ($report) {
            if (preg_match('/POINT\(([^ ]+) ([^ ]+)\)/', $report->location_wkt, $matches)) {
                return [
                    'lat' => (float) $matches[2],
                    'lng' => (float) $matches[1],
                    'intensity' => $report->intensity,
                ];
            }
            return null;
        })->filter();

        return response()->json([
            'data' => $heatmapData->values(),
        ]);
    }
}

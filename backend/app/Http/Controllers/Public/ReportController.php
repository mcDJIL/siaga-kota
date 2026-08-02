<?php

namespace App\Http\Controllers\Public;

use App\Actions\CreateReport;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportController extends Controller
{
    /**
     * @group Public - Reports
     *
     * @authenticated
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $reports = Report::query()
            ->where('user_id', $request->user()->id)
            ->with(['category', 'user'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('category'), fn ($q) => $q->where('category_id', $request->category))
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($request->input('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * @group Public - Reports
     *
     * @authenticated
     */
    public function store(StoreReportRequest $request, CreateReport $createReport): JsonResponse
    {
        $data = $request->validated();
        $photos = $request->file('photos', []);

        $report = $createReport->execute($data, $request->user(), $photos);

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Laporan berhasil dibuat.',
        ], 201);
    }

    /**
     * @group Public - Reports
     *
     * @authenticated
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $report = Report::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])
            ->firstOrFail();

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }
}

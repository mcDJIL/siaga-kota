<?php

namespace App\Http\Controllers\Ops;

use App\Actions\AssignReport;
use App\Actions\UpdateReportStatus;
use App\Enums\ReportAttachmentType;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Http\Requests\UploadHandlingPhotosRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Models\ReportAttachment;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportController extends Controller
{
    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        // Petugas lihat laporan di wilayah kerja (simplified: semua laporan)
        // TODO: filter berdasarkan operator_regions
        $reports = Report::query()
            ->with(['category', 'user', 'assignedOperator'])
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->when($request->filled('category'), fn($q) => $q->where('category_id', $request->category))
            ->when($request->filled('emergency'), fn($q) => $q->where('is_emergency', true))
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('priority')
            ->orderByDesc('created_at')
            ->paginate($request->input('per_page', 20));

        return ReportResource::collection($reports);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function show(string $id): JsonResponse
    {
        $report = Report::query()
            ->with(['category', 'user', 'assignedOperator', 'statusHistories.actor', 'attachments.uploader'])
            ->findOrFail($id);

        return response()->json([
            'data' => new ReportResource($report),
        ]);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function updateStatus(
        UpdateReportStatusRequest $request,
        UpdateReportStatus $updateStatus,
        string $id
    ): JsonResponse {
        $report = Report::query()->findOrFail($id);

        $data = $request->validated();

        $report = $updateStatus->execute(
            $report,
            $data['status'],
            $request->user(),
            $data['note'] ?? null
        );

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Status laporan berhasil diperbarui.',
        ]);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function uploadHandlingPhotos(
        UploadHandlingPhotosRequest $request,
        string $id
    ): JsonResponse {
        $report = Report::query()->findOrFail($id);

        $photos = $request->file('photos');

        foreach ($photos as $photo) {
            $path = $photo->store("reports/{$report->id}/handling", 'public');

            ReportAttachment::query()->create([
                'report_id' => $report->id,
                'path' => $path,
                'type' => ReportAttachmentType::Handling->value,
                'uploaded_by' => $request->user()->id,
            ]);
        }

        return response()->json([
            'message' => 'Foto bukti penanganan berhasil diunggah.',
            'data' => [
                'count' => count($photos),
            ],
        ]);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function markEmergency(Request $request, string $id): JsonResponse
    {
        $report = Report::query()->findOrFail($id);

        $report->update([
            'is_emergency' => true,
            'priority' => 'mendesak',
        ]);

        return response()->json([
            'data' => new ReportResource($report->fresh()),
            'message' => 'Laporan berhasil ditandai sebagai darurat.',
        ]);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function assign(Request $request, AssignReport $assignReport, string $id): JsonResponse
    {
        $request->validate([
            'operator_id' => ['required', 'string', 'exists:users,id'],
        ]);

        $report = Report::query()->findOrFail($id);
        $operator = User::query()->findOrFail($request->operator_id);

        $report = $assignReport->execute($report, $operator);

        return response()->json([
            'data' => new ReportResource($report),
            'message' => 'Laporan berhasil ditugaskan.',
        ]);
    }

    /**
     * @group Ops - Reports
     * @authenticated
     */
    public function operators(Request $request): JsonResponse
    {
        $operators = User::query()
            ->whereHas('roles', fn($q) => $q->where('name', 'petugas'))
            ->where('active', true)
            ->with('department')
            ->select(['id', 'name', 'employee_id', 'position', 'department_id'])
            ->get();

        return response()->json([
            'data' => $operators->map(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'employee_id' => $user->employee_id,
                'position' => $user->position,
                'department' => $user->department ? [
                    'id' => $user->department->id,
                    'name' => $user->department->name,
                ] : null,
            ]),
        ]);
    }
}
